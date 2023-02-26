import "./User.css";
import { getAuth, signOut } from "firebase/auth";
import { Link, useLocation } from "react-router-dom";

const auth = getAuth();

export default function User({ user }) {
  const { pathname } = useLocation();
  const handleLogOut = () => {
    signOut(auth);
  };

  const renderHeaderLink = () => {
    if (pathname === "/login" || pathname === "/signup") {
      return <Link to="/">Home</Link>;
    }
    return <Link to="/signup">Authenticate</Link>;
  };

  return (
    <div className="user-container">
      {!!user ? (
        <div>
          {user.email}
          <button onClick={handleLogOut} className="user-button">
            Sign Out
          </button>
        </div>
      ) : (
        renderHeaderLink()
      )}
    </div>
  );
}
