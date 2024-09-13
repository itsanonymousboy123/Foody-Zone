import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import styled from "styled-components";
import {createGlobalStyle} from "styled-components";

const Globalstyle=createGlobalStyle`

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body{
  background-color: #323334;
  height: 100vh;
  color: white;
  font-family: "Inter", sans-serif;
}
`


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Globalstyle />
    <App />
    </React.StrictMode>
  
);
