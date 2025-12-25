const express = require("express");
const router = express.Router();

const organizerController = require("../controllers/organizer.controller");
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");

router.post("/login", organizerController.login);

router.post(
  "/register-attender",
  auth,
  role("ORGANIZER"),
  organizerController.registerAttender
);
router.post(
  "/event",
  auth,
  role("ORGANIZER"),
  organizerController.createEvent
);
router.get(
  "/attenders",
  auth,
  role("ORGANIZER"),
  organizerController.getMyAttenders
);

module.exports = router;
