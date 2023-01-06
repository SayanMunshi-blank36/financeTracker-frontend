import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import FinanceForm from "../components/FinanceForm";

const FinanceEntry = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <>
      <section className="h-full md:mx-28">
        <h1 className="mt-8 md:mt-2 w-full flex items-center justify-center text-center text-3xl font-bold mx-auto">
          {/* WELCOME {(user && user.name).toUpperCase()} */}
        </h1>
        <h1 className="mt-8 md:mt-2 w-full flex items-center justify-center text-center mb-16 text-3xl font-bold mx-auto text-gray-500">
          ENTER FINANCE DETAILS
        </h1>
        <FinanceForm />
      </section>
    </>
  );
};

export default FinanceEntry;
