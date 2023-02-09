import "./User.css";
import { getAuth, signOut } from "firebase/auth";
import { Link } from "react-router-dom";

const auth = getAuth();

export default function User({ user }) {
  const handleLogOut = () => {
    signOut(auth);
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
        <Link to="/login">Log In</Link>
      )}
    </div>
  );
}
