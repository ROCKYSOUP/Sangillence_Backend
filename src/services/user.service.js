const prisma = require("../prisma/client");
const bcrypt = require("bcrypt");

exports.findUserByEmail = (email) => {
  return prisma.user.findUnique({ where: { email } });
};

exports.createUser = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  return prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });
};
