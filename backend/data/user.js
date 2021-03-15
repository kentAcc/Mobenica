import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example",
    password: bcrypt.hashSync("132456", 10),
    isadmin: true,
  },
  {
    name: "Steve green",
    email: "steve@example",
    password: bcrypt.hashSync("132456", 10),
    isadmin: false,
  },
  {
    name: "Rabbit lopez",
    email: "rabbit@example",
    password: bcrypt.hashSync("132456", 10),
    isadmin: true,
  },
];

export default users;
