import "./SiteHeader.css";
import User from "./User";

export function SiteHeader({ user }) {
  return (
    <div className="header-container">
      <div className="header-title-container">
        <p className="header-title">OutofinsighT</p>
      </div>
      <User user={user} />
    </div>
  );
}
