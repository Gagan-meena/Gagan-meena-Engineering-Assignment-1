const express = require("express");
const sendBankData = require("../controllers/bankController");

const router = express.Router();

router.get("/:bank", sendBankData);

module.exports = router;
