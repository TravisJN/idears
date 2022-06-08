import { BulbTwoTone } from "@ant-design/icons";

export function SiteHeader() {
  return (
    <div className="header-container">
      <BulbTwoTone twoToneColor="white" rotate={-15} className="header-icon" />
      <p className="header-title">Ideas</p>
      <BulbTwoTone twoToneColor="white" rotate={15} className="header-icon" />
    </div>
  );
}
