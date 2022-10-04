import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

document.documentElement.addEventListener(
  'touchstart',
  function (event) {
    if (
      event.target.nodeName === 'SELECT' ||
      event.target.nodeName === 'INPUT' ||
      event.target.nodeName === 'TEXTAREA'
    ) {
      //it is a combo
      document
        .getElementById('view')
        .setAttribute('content', 'width=device-width, user-scalable=no');
      setTimeout(function () {
        document
          .getElementById('view')
          .setAttribute('content', 'width=device-width, user-scalable=yes');
      }, 1000);
    }
  },
  true
);
