const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");

router.post("/login", adminController.login);

router.post(
  "/register-organizer",
  auth,
  role("ADMIN"),
  adminController.registerOrganizer
);
router.get(
  "/organizers",
  auth,
  role("ADMIN"),
  adminController.getOrganizers
);
router.get(
  "/attenders",
  auth,
  role("ADMIN"),
  adminController.getAttenders
);
router.delete(
  "/organizer/:id",
  auth,
  role("ADMIN"),
  adminController.deleteOrganizer
);
router.delete(
  "/attender/:id",
  auth,
  role("ADMIN"),
  adminController.deleteAttender
);




module.exports = router;
