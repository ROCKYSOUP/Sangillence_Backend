const prisma = require("../prisma/client");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwt");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const organizer = await prisma.user.findUnique({ where: { email } });

  if (!organizer || organizer.role !== "ORGANIZER") {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const match = await bcrypt.compare(password, organizer.password);
  if (!match) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken({
    userId: organizer.id,
    role: organizer.role,
  });

  res.json({ token });
};

exports.registerAttender = async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const attender = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: "ATTENDER",
      organizerId: req.user.userId,
    },
  });

  res.status(201).json(attender);
};
exports.createEvent = async (req, res) => {
  const { title, description } = req.body;

  const event = await prisma.event.create({
    data: {
      title,
      description,
      organizerId: req.user.userId, // organizer who creates event
    },
  });

  res.status(201).json(event);
};
exports.getMyAttenders = async (req, res) => {
  const attenders = await prisma.user.findMany({
    where: {
      role: "ATTENDER",
      organizerId: req.user.userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  res.json(attenders);
};

