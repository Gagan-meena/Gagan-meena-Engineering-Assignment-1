const readBankData = require("../utils/readBankData.js");

const sendBankData = async (req, res) => {
  const bank = req.params.bank;

  try {
    let bankData = await readBankData(bank);

    if (bankData.errno) {
      return res
        .status(500)
        .json({ success: false, error: "Error reading bank data" });
    }

    function changeDateFormat(inputDate) {
      const dateParts = inputDate.split("/");

      if (dateParts.length === 3) {
        const newDateFormat = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;

        return newDateFormat;
      }
    }

    const { category, search, startDate, endDate } = req.query;

    console.log(startDate);

    if (startDate) {
      bankData = bankData.filter((transaction) => {
        const date = changeDateFormat(transaction.Date);

        if (startDate <= date) {
          return true;
        }
      });
    }
    if (endDate) {
      bankData = bankData.filter((transaction) => {
        const date = changeDateFormat(transaction.Date);

        if (date <= endDate) {
          return true;
        }
      });
    }

    if (search && search.length > 0) {
      bankData = bankData.filter((transaction) => {
        return transaction.Description.replaceAll(" ", "")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
    }

    const filters = category ? category.split(",") : [];

    bankData = bankData.filter((transaction) => {
      if (filters.length === 0 || filters.length === 4) {
        return true;
      }

      if (filters.includes("credit") && filters.includes("debit")) {
        return true;
      }

      if (filters.includes("credit") && parseFloat(transaction.Credit) > 0) {
        return true;
      }

      if (filters.includes("debit") && parseFloat(transaction.Debit) > 0) {
        return true;
      }

      if (
        filters.includes("Salary") &&
        transaction.Description.includes("Salary")
      ) {
        return true;
      }

      if (filters.includes("NEFT") && transaction.Description === "NEFT") {
        return true;
      }

      if (
        filters.includes("bill") &&
        transaction.Description !== "Salary" &&
        transaction.Description !== "NEFT" &&
        parseFloat(transaction.Debit) > 0
      ) {
        return true;
      }

      return false;
    });

    return res.json({ success: true, bankData: bankData });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

module.exports = sendBankData;
