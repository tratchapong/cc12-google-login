const {User} = require('./models')
const bcrypt = require('bcryptjs');


const userSeed = async () => {

const hashedPassword = await bcrypt.hash('1234', 12);

const userData = [
  { email: 'andy@ggmail.com', mobile: '1111111', password: hashedPassword },
  { email: 'bobby@ggmail.com', mobile: '1111111', password: hashedPassword },
  { email: 'cathy@ggmail.com', mobile: '1111111', password: hashedPassword },
  { email: 'danny@ggmail.com', mobile: '1111111', password: hashedPassword },
  { email: 'eddy@ggmail.com', mobile: '1111111', password: hashedPassword },
  { email: 'franky@ggmail.com', mobile: '1111111', password: hashedPassword },
  { email: 'goofy@ggmail.com', mobile: '1111111', password: hashedPassword },
  { email: 'honey@ggmail.com', mobile: '1111111', password: hashedPassword },

]
let res = await User.bulkCreate(userData)
console.log(res)
}

userSeed()
