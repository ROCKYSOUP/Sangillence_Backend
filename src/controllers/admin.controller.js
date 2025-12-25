const bcrypt = require("bcrypt");
const prisma = require("../prisma/client");
const { generateToken } = require("../utils/jwt");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const admin = await prisma.user.findUnique({ where: { email } });

  if (!admin || admin.role !== "ADMIN") {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const match = await bcrypt.compare(password, admin.password);
  if (!match) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken({
    userId: admin.id,
    role: admin.role,
  });

  res.json({ token });
};


exports.registerOrganizer = async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const organizer = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: "ORGANIZER",
    },
  });

  res.status(201).json(organizer);
};
exports.getOrganizers = async (req, res) => {
  const organizers = await prisma.user.findMany({
    where: { role: "ORGANIZER" },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  res.json(organizers);
};
exports.getAttenders = async (req, res) => {
  const attenders = await prisma.user.findMany({
    where: { role: "ATTENDER" },
    select: {
      id: true,
      name: true,
      email: true,
      organizerId: true,
      createdAt: true,
    },
  });

  res.json(attenders);
};
exports.deleteOrganizer = async (req, res) => {
  const { id } = req.params;

  // delete attenders
  await prisma.user.deleteMany({
    where: { organizerId: id },
  });

  // delete events
  await prisma.event.deleteMany({
    where: { organizerId: id },
  });

  // delete organizer
  await prisma.user.delete({
    where: { id },
  });

  res.json({ message: "Organizer deleted successfully" });
};
exports.deleteAttender = async (req, res) => {
  const { id } = req.params;

  await prisma.user.delete({
    where: { id },
  });

  res.json({ message: "Attender deleted successfully" });
};




