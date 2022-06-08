import "./App.css";
import { IdeasList } from "./components/IdeasList";
import { AddIdea } from "./components/AddIdea";

function App() {
  return (
    <div className="App">
      <div className="content">
        <AddIdea />
        <IdeasList />
      </div>
    </div>
  );
}

export default App;
