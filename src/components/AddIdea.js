import { Collapse } from "antd";
import { AddIdeaForm } from "./AddIdeaForm";

const { Panel } = Collapse;

export function AddIdea() {
  return (
    <div className="add-idea-container">
      <Collapse defaultActiveKey={["1"]} ghost>
        <Panel header="Add Idea" key="1">
          <AddIdeaForm />
        </Panel>
      </Collapse>
    </div>
  );
}
