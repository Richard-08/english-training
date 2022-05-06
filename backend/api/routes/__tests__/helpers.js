const bcrypt = require("bcrypt");
const { USER } = require("./constants");
const User = require("../../../data-access/User");
const AuthService = require("../../../services/AuthService");

async function createUser() {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(USER.password, salt);
  return User.create({
    ...USER,
    password: hashedPassword,
  });
}

function loginUser() {
  return AuthService.signIn(USER.email, USER.password);
}

module.exports = {
  createUser,
  loginUser,
};
