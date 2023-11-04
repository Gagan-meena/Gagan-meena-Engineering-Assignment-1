const express = require("express");
require("dotenv").config();
const cors = require("cors");
const router = require("./routers/bankRouter");

const app = express();
const port = process.env.PORT || 3001;

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

app.use("/api", router);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
