import "./App.css";
import { IdeasList } from "./components/IdeasList";
import { AddIdea } from "./components/AddIdea";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";
import { Layout } from "antd";
import { Content, Header, Footer } from "antd/lib/layout/layout";

function App() {
  return (
    <div className="App">
      <Layout className="content">
        <Header>
          <SiteHeader />
        </Header>
        <Content>
          <AddIdea />
          <IdeasList />
        </Content>
        <Footer>
          <SiteFooter />
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
