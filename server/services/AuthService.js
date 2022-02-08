const config = require("../config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Logger = require("../loaders/logger");
const User = require("../data-access/User");

class AuthService {
  constructor(User, Logger) {
    this.userModel = User;
    this.logger = Logger;
  }

  async signUp(username, email, password) {
    try {
      const emailExists = await this.userModel.findUserByEmail(email);
      if (emailExists) {
        throw new Error("The user with the given email already exists");
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = {
        username,
        email,
        password: hashedPassword,
      };

      const userRecord = await this.userModel.create(newUser);

      if (userRecord) {
        const user = await this.userModel.findUserByEmail(email);
        const token = this.#generateToken(userRecord.id);

        return { user, token };
      } else {
        throw userRecord;
      }
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }

  async signIn(email, password) {
    try {
      const user = await this.userModel.findUserByEmail(email);

      if (!user) {
        throw new Error("User with this email does not exist");
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        throw new Error("Invalid password");
      }

      const token = this.#generateToken(user.id);
      return { user, token };
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }

  #generateToken(user_id) {
    return jwt.sign(
      {
        id: user_id,
        exp: Math.floor(Date.now() / 1000) + 60 * 10,
      },
      config.TOKEN_SECRET
    );
  }
}

module.exports = new AuthService(User, Logger);