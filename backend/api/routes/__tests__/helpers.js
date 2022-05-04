const bcrypt = require("bcrypt");
const startServer = require("../../../index");
const { USER } = require("./constants");
const User = require("../../../data-access/User");
const AuthService = require("../../../services/AuthService");

async function createAndLoginUser() {
  try {
    const server = await startServer;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(USER.password, salt);
    let user = await User.create({
      ...USER,
      password: hashedPassword,
    });

    let auth = await AuthService.signIn(USER.email, USER.password);

    return {
      user,
      auth,
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  createAndLoginUser,
};
