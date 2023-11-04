import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategory,
  setBank,
  setStartDate,
  setEndDate,
} from "../reducer/bankSlice.js";
const Modal = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { bank, category, startDate, endDate } = useSelector(
    (state) => state.bank
  );
  const [selectedBank, setSelectedBank] = useState(bank);
  const [selectedCategories, setSelectedCategories] = useState(category);
  const [selectedStartDate, setSelectedStartDate] = useState(startDate);
  const [selectedEndDate, setSelectedEndDate] = useState(endDate);

  const handleCategories = (field) => {
    if (selectedCategories.includes(field)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== field)
      );
    } else {
      setSelectedCategories([...selectedCategories, field]);
    }
  };

  const handleBankSelect = (bank) => {
    setSelectedBank(bank);
  };

  const handleApply = () => {
    // dispatch(setFilterOptions(selectedBank, selectedCategories));
    dispatch(setCategory(selectedCategories));
    dispatch(setBank(selectedBank));
    dispatch(setStartDate(selectedStartDate));
    dispatch(setEndDate(selectedEndDate));

    closeModal();
  };
  const handleClearFilter = () => {
    // dispatch(setFilterOptions(selectedBank, selectedCategories));
    dispatch(setCategory([]));
    dispatch(setBank("axis"));
    dispatch(setStartDate(""));
    dispatch(setEndDate(""));

    closeModal();
  };

  return (
    <div className="h-screen w-screen bg-slate-400 bg-opacity-50 fixed flex justify-center items-center">
      <div className="w-[500px] h-[600px] rounded-xl bg-white shadow-sm flex flex-col p-5">
        <button
          className="ml-[95%] text-xl bg-gray-300 w-7 items-center flex justify-center rounded-full"
          onClick={closeModal}
        >
          X
        </button>
        <div className="">
          <h1 className="text-center text-lg font-semibold">Bank</h1>
          <div className="flex flex-row justify-evenly mt-3">
            <button
              type="button"
              className={`bg-slate-200 px-3 py-1 rounded-3xl ${
                selectedBank === "axis"
                  ? "bg-slate-400"
                  : "  selection:bg-slate-400"
              }`}
              onClick={() => handleBankSelect("axis")}
            >
              Axis Bank
            </button>
            <button
              type="button"
              className={`bg-slate-200 px-3 py-1 rounded-3xl ${
                selectedBank === "hdfc"
                  ? "bg-slate-400"
                  : "selection:bg-slate-400"
              }`}
              onClick={() => handleBankSelect("hdfc")}
            >
              HDFC Bank
            </button>
            <button
              type="button"
              className={`bg-slate-200 px-3 py-1 rounded-3xl ${
                selectedBank === "icici"
                  ? "bg-slate-400"
                  : "selection:bg-slate-400"
              }`}
              onClick={() => handleBankSelect("icici")}
            >
              ICICI Bank
            </button>
          </div>
          <h1 className="text-center text-lg font-semibold mt-6">Categories</h1>
          <div className="flex flex-wrap gap-2 gap-y-2 flex-row justify-evenly mt-3">
            <button
              type="button"
              className={`bg-slate-200 px-3 py-1 rounded-3xl ${
                selectedCategories.includes("Salary")
                  ? "bg-slate-400"
                  : "  selection:bg-slate-400"
              }`}
              onClick={() => handleCategories("Salary")}
            >
              Salary
            </button>
            <button
              type="button"
              className={`bg-slate-200 px-3 py-1 rounded-3xl ${
                selectedCategories.includes("bill")
                  ? "bg-slate-400"
                  : "  selection:bg-slate-400"
              }`}
              onClick={() => handleCategories("bill")}
            >
              Bill Payment
            </button>
            <button
              type="button"
              className={`bg-slate-200 px-3 py-1 rounded-3xl ${
                selectedCategories.includes("NEFT")
                  ? "bg-slate-400"
                  : "  selection:bg-slate-400"
              }`}
              onClick={() => handleCategories("NEFT")}
            >
              NEFT
            </button>

            <button
              type="button"
              className={`bg-slate-200 px-3 py-1 rounded-3xl ${
                selectedCategories.includes("credit")
                  ? "bg-slate-400"
                  : "  selection:bg-slate-400"
              }`}
              onClick={() => handleCategories("credit")}
            >
              Money Received
            </button>

            <button
              type="button"
              className={`bg-slate-200 px-3 py-1 rounded-3xl ${
                selectedCategories.includes("debit")
                  ? "bg-slate-400"
                  : "  selection:bg-slate-400"
              }`}
              onClick={() => handleCategories("debit")}
            >
              Money Sent
            </button>
          </div>

          <h1 className="text-center text-lg font-semibold">Time period</h1>
          <div className="mt-4">
            <label
              htmlFor="startDate"
              className="text-lg font-semibold text-blue-600"
            >
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={selectedStartDate}
              onChange={(e) => setSelectedStartDate(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
              className="p-2 rounded-lg w-full bg-blue-100 bg-opacity-25"
            />
            <label
              htmlFor="endDate"
              className="text-lg font-semibold text-blue-600"
            >
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              max={new Date().toISOString().split("T")[0]}
              value={selectedEndDate}
              onChange={(e) => setSelectedEndDate(e.target.value)}
              className="p-2 rounded-lg w-full bg-blue-100 bg-opacity-25"
            />
          </div>
        </div>

        <div className="flex justify-evenly items-center mt-10">
          <button
            className="bg-slate-400 px-3 py-1 rounded-2xl"
            onClick={handleClearFilter}
          >
            Clear
          </button>
          <button
            className="bg-slate-400 px-3 py-1 rounded-2xl"
            onClick={handleApply}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
