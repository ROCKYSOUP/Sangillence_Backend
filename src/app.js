const express = require("express");
const cors = require("cors");

const adminRoutes = require("./routes/admin.routes");
const organizerRoutes = require("./routes/organizer.routes");

const app = express();

app.use(cors());
app.use(express.json()); 

app.use("/admin", adminRoutes);
app.use("/organizer", organizerRoutes);

app.get("/", (req, res) => {
  res.send("Sangillence Backend Running");
});

const attenderRoutes = require("./routes/attender.routes");

app.use("/attender", attenderRoutes);


module.exports = app;
