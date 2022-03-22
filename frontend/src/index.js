import React from "react";
import ReactDOM from "react-dom";

const App = () => {
  return (
    <>
      <div>
        <h1>Hellsdo World</h1>
        <Text />
      </div>
    </>
  );
};
const Text = () => <h2>Hello world</h2>;
ReactDOM.render(<App />, document.getElementById("root"));
