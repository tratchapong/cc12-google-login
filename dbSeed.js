const { User } = require("./models");
const bcrypt = require("bcryptjs");

const userSeed = async () => {
  const hashedPassword = await bcrypt.hash("1234", 12);

  const userData = [
    { email: "andy@ggmail.com", phone: "1111111", password: hashedPassword },
    { email: "bobby@ggmail.com", phone: "2222222", password: hashedPassword },
    { email: "cathy@ggmail.com", phone: "3333333", password: hashedPassword },
    { email: "danny@ggmail.com", phone: "4444444", password: hashedPassword },
    { email: "eddy@ggmail.com", phone: "5555555", password: hashedPassword },
    { email: "franky@ggmail.com", phone: "6666666", password: hashedPassword },
    { email: "goofy@ggmail.com", phone: "7777777", password: hashedPassword },
    { email: "honey@ggmail.com", phone: "8888888", password: hashedPassword },
  ];
  let res = await User.bulkCreate(userData);
  console.log(res);
  process.exit(0);
};
userSeed();
