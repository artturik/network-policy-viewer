import React from "react";
import { render } from "react-dom";
import { App } from "./components/App";
import "github-fork-ribbon-css/gh-fork-ribbon.css"

const rootElement = document.getElementById('root')
render(<App />, rootElement)