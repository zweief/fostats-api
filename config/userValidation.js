module.exports = {
  username: {
    notEmpty: {
      args: true,
      msg: "Please enter a username."
    }
  },
  email: {
    isEmail: {
      args: true,
      msg: "Looks like an invalid email adress."
    },
    notEmpty: {
      args: true,
      msg: "Please enter an email adress."
    }
  },
  password: {
    is: {
      args: /^[a-zA-Z0-9?\-_@*#]+$/,
      msg: "Password can only contain (capital) letters, numerics and ?-_@*#."
    },
    len: {
      args: [8, 32],
      msg:
        "Looks like an invalid password. Password must have a minimum of 8 characters and can not be longer then 32 characters."
    },
    notEmpty: {
      args: true,
      msg: "Please enter a password."
    }
  }
};
