const bcrypt = require("bcrypt");
const { userStatus, userTypes } = require("../../enums/users");

export class User {
  constructor(id, name, email, password, phone, status, type) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.status = status ?? userStatus["INACTIVE"];
    this.type = type ?? userTypes["USER"];
  }

  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  async comparePasswords(password) {
    return await bcrypt.compare(password, this.password);
  }
}
