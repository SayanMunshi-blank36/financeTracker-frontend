import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createFinance } from "../features/finances/financeSlice";

const FinanceForm = () => {
  const [formData, setFormData] = useState({
    month: "",
    day: 0,
    finType: "",
    finAmt: 0,
  });

  const { month, day, finType, finAmt } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    let { month, day, finType, finAmt } = formData;
    day = Number(day);
    finAmt = Number(finAmt);

    let financeData = { month, day, finType, finAmt };

    dispatch(createFinance({ financeData }));

    setFormData({
      month: "",
      day: 0,
      finType: "",
      finAmt: 0,
    });
  };

  const monthList = [
    "Choose Month",
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  const [totalDays, setTotalDays] = useState(0);
  useEffect(() => {
    if (
      month === "January" ||
      month === "March" ||
      month === "May" ||
      month === "July" ||
      month === "August" ||
      month === "October" ||
      month === "December"
    ) {
      setTotalDays(31);
    } else if (
      month === "April" ||
      month === "June" ||
      month === "September" ||
      month === "November"
    ) {
      setTotalDays(30);
    } else if (month === "February") {
      setTotalDays(28);
    } else {
      setTotalDays(0);
    }
  }, [month]);

  return (
    <>
      <div className="container pb-12 h-full">
        <div className="flex flex-col justify-center items-center flex-wrap h-full text-gray-800">
          <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
            <form onSubmit={onSubmit}>
              {/* <!-- Month input --> */}
              <label className="font-bold">Select Month:</label>
              <div className="mb-6 relative">
                <select
                  className="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 cursor-pointer"
                  id="month"
                  name="month"
                  value={month}
                  onChange={onChange}
                >
                  {monthList.map((month, idx) => (
                    <option key={idx}>
                      {month[0].toUpperCase() + month.slice(1)}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>

              {/* <!-- day input --> */}
              <label className="font-bold">Select Day:</label>
              <div className="mb-6 relative">
                <select
                  className="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="day"
                  name="day"
                  value={day}
                  onChange={onChange}
                  disabled={month !== "" ? false : true}
                >
                  {[...Array(totalDays + 1)].map((e, i) => (
                    <option key={i}>{i}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>

              {/* <!-- Finance Type input --> */}
              <label className="font-bold">Select Type:</label>
              <div className="mb-6 relative">
                <select
                  className="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 cursor-pointer"
                  id="finType"
                  name="finType"
                  value={finType}
                  onChange={onChange}
                >
                  <option>Choose Debit/Credit</option>
                  <option>Credit</option>
                  <option>Debit</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>

              {/* <!--Finance Amount input --> */}
              <label className="font-bold">Enter Amount in ₹</label>
              <div className="mb-6">
                <input
                  type="number"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Confirm Password"
                  id="finAmt"
                  name="finAmt"
                  value={finAmt}
                  onChange={onChange}
                />
              </div>

              {/* <!-- Submit button --> */}
              <button
                type="submit"
                className="btn inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
              >
                Enter Details
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FinanceForm;
