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
          <h3 className="text-lg font-bold">{selectedMonth}</h3>
          <div className="py-4">
            <div className="w-72 ml-20">
              <div className="flex items-center mb-8">
                <LineChart chartData={userData} />
                <LineChart chartData={userData} />
                <LineChart chartData={userData} />
              </div>
            </div>
            <div className="flex items-center justify-evenly">
              <p>Total Monthly Credit Amount: ₹ {totalMonthlyCreditAmount}</p>
              <p>Total Monthly Debit Amount: ₹ {totalMonthlyDebitAmount}</p>
              <p>Total Monthly Balance Amount: ₹ {totalMonthlyBalance}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FinanceDetailsModal;
