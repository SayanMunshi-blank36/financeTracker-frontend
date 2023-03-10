import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {user ? (
              <>
                <li>
                  <Link to="/">FINANCE ENTRY</Link>
                </li>
                <li>
                  <Link to="/finance-display">FINANCE DISPLAY</Link>
                </li>
                <li>
                  <button className="btn text-white" onClick={onLogout}>
                    <FaSignOutAlt /> LogOut
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">
                    <FaSignInAlt /> LogIn
                  </Link>
                </li>
                <li>
                  <Link to="/signup">
                    <FaUser /> SignUp
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl font-mono">
          FinanceTracker
        </Link>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {user ? (
            <>
              <li className="mx-3">
                <Link to="/">FINANCE ENTRY</Link>
              </li>
              <li className="mx-3">
                <Link to="/finance-display">FINANCE DISPLAY</Link>
              </li>
              <li className="mx-3">
                <button className="btn text-white" onClick={onLogout}>
                  <FaSignOutAlt /> LogOut
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">
                  <FaSignInAlt /> LogIn
                </Link>
              </li>
              <li>
                <Link to="/signup">
                  <FaUser /> SignUp
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
