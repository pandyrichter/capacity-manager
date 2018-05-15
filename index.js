import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";

import Home from './components/Home';

const $root = document.getElementById('root');

ReactDOM.render(
  <Router>
    <Home />
  </Router>
, $root);
