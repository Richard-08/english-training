const User = require("../data-access/User");

class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  getUserById(id) {
    return this.userModel.findUserById(id);
  }

  deleteUserByEmail(email) {
    return this.userModel.deleteUserByEmail(email);
  }
}

module.exports = new UserService(User);
