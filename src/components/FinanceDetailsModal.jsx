import { useState, useEffect } from "react";
import LineChart from "./LineChart";
import { UserData } from "./Data";

const FinanceDetailsModal = ({ modalData, selectedMonth }) => {
  console.log(modalData);

  const inputDates = modalData.map((data) => data.day);
  function removeDuplicates(arr) {
    let unique = arr.reduce(function (acc, curr) {
      if (!acc.includes(curr)) acc.push(curr);
      return acc;
    }, []);
    return unique;
  }
  const uniqueDates = removeDuplicates(inputDates);

  // const creditDataArr = ;

  const [totalDays, setTotalDays] = useState(0);
  useEffect(() => {
    if (
      selectedMonth === "January" ||
      selectedMonth === "March" ||
      selectedMonth === "May" ||
      selectedMonth === "July" ||
      selectedMonth === "August" ||
      selectedMonth === "October" ||
      selectedMonth === "December"
    ) {
      setTotalDays(31);
    } else if (
      selectedMonth === "April" ||
      selectedMonth === "June" ||
      selectedMonth === "September" ||
      selectedMonth === "November"
    ) {
      setTotalDays(30);
    } else if (selectedMonth === "February") {
      setTotalDays(28);
    } else {
      setTotalDays(0);
    }
  }, [selectedMonth]);

  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.userGain),
        backgroundColor: ["#f3ba2f", "#50af95", "ecf0f1"],
      },
    ],
  });

  // const [creditData, setCreditData] = useState({
  //   labels: [...Array(totalDays)].map((e, i) => i + 1),
  //   datasets: [
  //     {
  //       label: "Credit Amount",
  //       data: ,
  //       backgroundColor: ["#f3ba2f"]
  //     }
  //   ]
  // });

  let totalMonthlyCreditAmount = 0,
    totalMonthlyDebitAmount = 0;

  modalData.map((data) => {
    if (data.finType === "Credit") totalMonthlyCreditAmount += data.finAmt;

    if (data.finType === "Debit") totalMonthlyDebitAmount += data.finAmt;

    return null;
  });

  let totalMonthlyBalance = totalMonthlyCreditAmount - totalMonthlyDebitAmount;

  return (
    <>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative md:max-w-5xl">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-3xl underline font-bold text-center md:text-left mb-4">
            {selectedMonth}
          </h3>
          <div className="py-4">
            <div className="md:w-[56rem] w-72 md:ml-10 grid md:grid-cols-3 grid-cols-1 gap-8 mb-8">
              <div className="mb-4 md:mb-0">
                <LineChart chartData={userData} />
                <p className="mt-4 text-center text-sm">
                  Total Monthly Credit Amount: ₹ {totalMonthlyCreditAmount}
                </p>
              </div>
              <div className="mb-4 md:mb-0">
                <LineChart chartData={userData} />
                <p className="mt-4 text-center text-sm">
                  Total Monthly Debit Amount: ₹ {totalMonthlyDebitAmount}
                </p>
              </div>
              <div className="mb-4 md:mb-0">
                <LineChart chartData={userData} />
                <p className="mt-4 text-center text-sm">
                  Total Monthly Balance Amount: ₹ {totalMonthlyBalance}
                </p>
              </div>
            </div>
            {/* <div className="flex items-center justify-evenly text-sm">
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default FinanceDetailsModal;
