import React, { useState } from "react";
import Gallery from "./Components/Gallery";
import SearchBox from "./Components/SearchBox";

const App = () => {
  const [input, setInput] = useState("");
  return (
    <center>
      <h1>Image search</h1>
      <SearchBox input={input} setInput={setInput} />
      <Gallery query={input} />
    </center>
  );
};

export default App;
