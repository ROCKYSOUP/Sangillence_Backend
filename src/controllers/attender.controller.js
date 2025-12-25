const prisma = require("../prisma/client");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwt");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const attender = await prisma.user.findUnique({
    where: { email },
  });

  if (!attender || attender.role !== "ATTENDER") {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const match = await bcrypt.compare(password, attender.password);
  if (!match) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken({
    userId: attender.id,
    role: attender.role,
  });

  res.json({ token });
};

exports.getEvents = async (req, res) => {
  const attender = await prisma.user.findUnique({
    where: { id: req.user.userId },
    select: { organizerId: true },
  });

  const events = await prisma.event.findMany({
    where: { organizerId: attender.organizerId },
    orderBy: { createdAt: "desc" },
  });

  res.json(events);
};
