import "./SiteHeader.css";
import { BulbTwoTone } from "@ant-design/icons";
import User from "./User";

export function SiteHeader({ user }) {
  return (
    <div className="header-container">
      <div className="header-title-container">
        <BulbTwoTone
          twoToneColor="white"
          rotate={-15}
          className="header-icon"
        />
        <p className="header-title">Ideas</p>
        <BulbTwoTone twoToneColor="white" rotate={15} className="header-icon" />
      </div>
      <User user={user} />
    </div>
  );
}
