import Modal from "./components/Modal";
import { useEffect, useState } from "react";
import Table from "./components/Table";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "./reducer/bankSlice.js";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const { isLoading, data, isError, bank, category, startDate, endDate } =
    useSelector((state) => state.bank);

  

  useEffect(() => {
 
    dispatch(fetchData({ bank, search, category, startDate, endDate }));
  }, [dispatch, search, bank, category, startDate, endDate]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const searchHandler = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  return (
    <>
      <div className="relative h-screen   ">
        {isOpen && <Modal closeModal={closeModal} />}
        <div className="w-full flex justify-center items-center my-4  bg-white">
          <input
            type="text"
            className="w-[50%] h-10 border-2 border-slate-700 rounded-full shadow-lg pl-4   "
            placeholder="Search"
            value={search}
            onChange={(e) => searchHandler(e)}
          />
        </div>
        <div className="flex w-full h-16 fixed top-[85%] left-[92%]">
          <button className="p-2 bg-slate-300 m-2  " onClick={openModal}>
            Filter
          </button>
        </div>
        {isLoading ? (
          <div className="h-screen flex justify-center items-center">
            Loading...
          </div>
        ) : (
          <div className="flex justify-center items-center flex-col  ">
            <table className="w-[50%] ">
              <thead>
                <tr>
                  <th className="text-left px-4 py-2">Date</th>
                  <th className="text-left px-4 py-2">Description</th>
                  <th className="text-left px-4 py-2">Debit</th>
                  <th className="text-left px-4 py-2">Credit</th>
                  <th className="text-left px-4 py-2">Balance</th>
                </tr>
              </thead>
              <tbody>
                {data.map((detail, index) => (
                  <Table
                    key={index}
                    date={detail.Date}
                    description={detail.Description}
                    debit={detail.Debit}
                    credit={detail.Credit}
                    balance={detail.Balance}
                  />
                ))}
              </tbody>
            </table>
            <div className="text-3xl font-bold mt-5">
              {data.length === 0 && "No transaction available"}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
