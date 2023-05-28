const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');
const axios = require('axios');
const { User } = require('../models');
const AppError = require('../utils/appError');

const genToken = payload =>
  jwt.sign(payload, process.env.JWT_SECRET_KEY || 'private_key', {
    expiresIn: process.env.JWT_EXPIRES || '30d'
  });

const verifyToken = async (token) => {
    console.log('Verify Token...')
    let res = await axios.get('https://oauth2.googleapis.com/tokeninfo?id_token=' + token,{
      validateStatus : function (status) { return status < 500} 
    })
    return !!(res.data.iss)
  }

exports.glogin = async (req,res,next) => {
  try {
    const {credential} = req.body
    let token_ok = await verifyToken(credential)
    if(!token_ok)
      throw new AppError('Invalid Google-Token...', 401)
    let g_user = jwtDecode(credential)
    const user = await User.findOne({
      where: {
         email: g_user.email 
      }
    });
    let newuser
    if(!user) {
      newuser = await User.create({
        email : g_user.email,
        phone: g_user.exp,
        password: ''
      });
    } 
    const token = user ? genToken({ id: user.id }) : genToken({ id: newuser.id});
    res.status(200).json({ token });
  } catch (err) {
    next(err)
  }
}

exports.register = async (req, res, next) => {
  try {
    const { email, phone, password, confirmPassword } =
      req.body;

    if (!email) {
      throw new AppError('email address is required', 400);
    }

    if (!password) {
      throw new AppError('password is required', 400);
    }

    if (password !== confirmPassword) {
      throw new AppError('password and confirm password did not match', 400);
    }

    const isEmail = validator.isEmail(email + '');


    if (!isEmail ) {
      throw new AppError('email address is invalid format', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      email: isEmail ? email : null,
      phone: phone,
      password: hashedPassword
    });

    const token = genToken({ id: user.id });
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (typeof email !== 'string' || typeof password !== 'string') {
      throw new AppError('email address or phone or password is invalid 1', 400);
    }

    const user = await User.findOne({
      where: { email: email }
    });

    if (!user) {
      throw new AppError('email address or phone or password is invalid 2', 400);
    }

    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect) {
      throw new AppError('email address or phone or password is invalid 3', 400);
    }

    const token = genToken({ id: user.id });
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.getMe = (req, res) => {
  res.status(200).json({ user: req.user });
};
