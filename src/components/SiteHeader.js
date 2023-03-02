import "./SiteHeader.css";
import User from "./User";
import { Link, useLocation } from "react-router-dom";

export function SiteHeader({ user }) {
  const { pathname } = useLocation();

  const isAbout = pathname === "/about";

  return (
    <div className="header-container">
      <div className="header-title-container">
        <p className="header-title">OutofinsighT</p>
      </div>
      <div className="header-button-container">
        {isAbout ? <Link to="/">Home</Link> : <Link to="/about">About</Link>}
        {!isAbout && <User user={user} />}
      </div>
    </div>
  );
}
