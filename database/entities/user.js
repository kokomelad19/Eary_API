const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userStatus, userTypes } = require("../../types/enums/users");

class User {
  constructor({ name, email, password, phone, status, type, id }) {
    this.id = id ?? undefined;
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.status = status ?? userStatus["INACTIVE"];
    this.type = type ?? userTypes["USER"];
  }

  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePasswords(password) {
    return await bcrypt.compare(password, this.password);
  }

  generateToken() {
    if (!this.id) throw new Error("invalid id in JWT generator");

    return jwt.sign(
      {
        id: this.id,
      },
      process.env.TOKEN_SECRET
    );
  }
}

module.exports = User;
