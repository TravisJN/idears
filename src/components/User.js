import "./User.css";

export default function User({ user }) {
  return <div className="user-container">{user.email}</div>;
}
