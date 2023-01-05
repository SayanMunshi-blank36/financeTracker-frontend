import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FinanceEntry from "./pages/FinanceEntry";
import FinanceDisplay from "./pages/FinanceDisplay";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<FinanceEntry />} />
          <Route path="/finance-display" element={<FinanceDisplay />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
