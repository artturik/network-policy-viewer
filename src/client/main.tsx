import React from "react";
import { render } from "react-dom";
import "./main.css";
import { App } from "./components/App";

const rootElement = document.getElementById('root')
render(<App />, rootElement)