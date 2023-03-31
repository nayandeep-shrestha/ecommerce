import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import "./assets/css/global.css";
import Routing from './routing';
import {Provider} from 'react-redux';
import rootStore from './store'
import "./index.css"
import "bootstrap/dist/css/bootstrap.min.css"
// import dotenv from "dotenv"
// dotenv.config();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={rootStore}>
    <Routing></Routing>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
