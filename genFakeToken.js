// Try to generate fake google oauth token
const jwt = require('jsonwebtoken');

const payload = {
  iss: "https://accounts.google.com",
  nbf: 1677162623,
  aud: "119443015095-ltl0957ugi8cfvh4tji98dubno4b7c1a.apps.googleusercontent.com",
  sub: "109455800346713004332",
  email: "tratchapong@gmail.com",
  email_verified: "true",
  azp: "119443015095-ltl0957ugi8cfvh4tji98dubno4b7c1a.apps.googleusercontent.com",
  name: "Ratchapong Tantipantarak",
  picture: "https://lh3.googleusercontent.com/a/AGNmyxZquT0Ql3JoZeFui8XZVvxoXxyucLdSVdNhkaUs=s96-c",
  given_name: "Ratchapong",
  family_name: "Tantipantarak",
  iat: 1677162923,
  exp: 1677166523,
  jti: "7b656e659a844b8853e68338783033a2d1ac9fa2",
  alg: "RS256",
  kid: "d25f8dbcf97dc7ec401f0171fb6e6bda9ed9e792",
  typ: "JWT"
}

const genToken = payload =>
  jwt.sign(payload, process.env.JWT_SECRET_KEY || 'private_key');

let token = genToken(payload)

console.log(token)