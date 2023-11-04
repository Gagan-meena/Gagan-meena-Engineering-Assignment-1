const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

async function readBankData(bankName) {
  const results = [];
  const filePath = path.join(__dirname, `../data/${bankName}.csv`);

  try {
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(csv()).on("data", (data) => results.push(data));

    await new Promise((resolve, reject) => {
      fileStream.on("end", resolve);
      fileStream.on("error", reject);
    });
  } catch (error) {
    return error;
  }
  return results;
}

module.exports = readBankData;
