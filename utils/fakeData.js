var faker = require("faker");

function createFakeUsers(num) {
  let users = [];
  for (let i = 0; i < num; i++) {
    user = {
      username: faker.fake("{{internet.userName}}"),
      email: faker.fake("{{internet.email}}"),
      password: faker.fake("{{internet.password}}")
    };

    users.push(user);
  }
  return users;
}

function createRegisterData(username, email, password) {
  return {
    username,
    email,
    password
  };
}

module.exports = {
  createFakeUsers,
  createRegisterData
};
