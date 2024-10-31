import React from "react";
import "./App.scss";
import Header from "./components/Header";
import List from "./components/List";
import AddTask from "./components/AddTask";

function App() {
  return (
    <div className="main">
      <Header />
      <List />
      <AddTask />
    </div>
  );
}

export default App;
