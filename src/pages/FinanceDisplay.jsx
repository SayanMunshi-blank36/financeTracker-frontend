import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import FinanceDetailsModal from "../components/FinanceDetailsModal";
import { getFinances, reset } from "../features/finances/financeSlice";

const FinanceDisplay = () => {
  const [modalData, setModalData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { finances, isLoading, isError, message } = useSelector(
    (state) => state.finance
  );

  useEffect(() => {
    const selectedFinanceData = finances.filter(
      (finance) => finance.month === selectedMonth
    );

    setModalData(selectedFinanceData);
  }, [selectedMonth, finances]);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getFinances());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  console.log(finances);

  const monthsAdded = finances.map((finance) => finance.month);

  function removeDuplicates(arr) {
    let unique = arr.reduce(function (acc, curr) {
      if (!acc.includes(curr)) acc.push(curr);
      return acc;
    }, []);
    return unique;
  }

  const uniqueMonths = removeDuplicates(monthsAdded);

  function sortByMonth(arr) {
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    arr.sort(function (a, b) {
      return months.indexOf(a) - months.indexOf(b);
    });

    return arr;
  }

  const uniqueMonthsSorted = sortByMonth(uniqueMonths);

  const handleClick = (e) => {
    setSelectedMonth(e.target.textContent);
  };

  return (
    <>
      <FinanceDetailsModal
        modalData={modalData}
        selectedMonth={selectedMonth}
      />
      <section>
        <h1 className="mt-8 md:mt-2 w-full flex items-center justify-center text-center text-3xl font-bold mx-auto">
          {(user && user.name).toUpperCase()}'s Finance Stats
        </h1>
        <div className="md:mx-auto md:w-3/5 lg:md-4/5 my-20 mx-5">
          <h2 className="font-bold text-gray-400 text-2xl text-center sm:text-left">
            {new Date().getFullYear()}
          </h2>
          {finances.length === 0 ? (
            <div className="mt-3">
              <h3 className="font-bold">No Finance Details Added Yet</h3>
            </div>
          ) : (
            <div className="mt-3 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 grid-cols-2 gap-4">
              {uniqueMonthsSorted.map((month, idx) => {
                return (
                  <label
                    className="py-12 px-8 shadow-lg card text-center uppercase flex flex-col items-center justify-center font-bold cursor-pointer hover:bg-black hover:text-white transition-all hover:scale-95"
                    onClick={handleClick}
                    key={idx}
                    htmlFor="my-modal-3"
                  >
                    {month}
                  </label>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default FinanceDisplay;
