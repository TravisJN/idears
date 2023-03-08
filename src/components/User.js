import "./User.css";
import { getAuth, signOut } from "firebase/auth";
import { Link, useLocation } from "react-router-dom";
import { Dropdown, Space } from "antd";
import { DownOutlined, LogoutOutlined, BulbOutlined } from "@ant-design/icons";

const auth = getAuth();

const items = [
  {
    // label: "My Ideas",
    label: <Link to="/mine">My Ideas</Link>,
    key: "myIdeas",
    icon: <BulbOutlined />,
  },
  {
    type: "divider",
  },
  {
    label: "Log Out",
    key: "logOut",
    danger: true,
    icon: <LogoutOutlined />,
  },
];

export default function User({ user }) {
  const { pathname } = useLocation();

  const handleLogOut = () => {
    signOut(auth);
  };

  const onClick = ({ key }) => {
    if (key === "logOut") {
      handleLogOut();
    }
  };

  const renderHeaderLink = () => {
    if (pathname === "/login" || pathname === "/signup") {
      return <Link to="/">Home</Link>;
    }
    return <Link to="/signup">Authenticate</Link>;
  };

  const renderUser = () => {
    return (
      <Dropdown menu={{ items, onClick }} trigger={["click"]}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            {user.email}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    );
  };

  return (
    <div className="user-container">
      {!!user ? renderUser() : renderHeaderLink()}
    </div>
  );
}
