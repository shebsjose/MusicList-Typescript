import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "tippy.js/dist/tippy.css";
import reportWebVitals from "./reportWebVitals";
const { Provider } = require('react-redux');
const { persistStore } = require('redux-persist');
const { store } = require('./redux/store');
const { PersistGate } = require('redux-persist/integration/react');

let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
   <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
