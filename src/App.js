import "./App.css";
import { IdeasList } from "./components/IdeasList";
import { AddIdea } from "./components/AddIdea";
import { SiteHeader } from "./components/SiteHeader";
import { Layout } from "antd";
import { Content, Header } from "antd/lib/layout/layout";

function App() {
  return (
    <div className="App">
      {/* <div className="content"> */}
      <Layout className="content">
        <Header>
          <SiteHeader />
        </Header>
        <Content>
          <AddIdea />
          <IdeasList />
        </Content>
      </Layout>
      {/* </div> */}
    </div>
  );
}

export default App;
