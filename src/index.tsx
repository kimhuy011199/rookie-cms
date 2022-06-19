import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './stores';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { DialogProvider } from './shared/components/Dialog/Provider';
import i18n from './core/i18n';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <DialogProvider>
            <App />
            <ToastContainer
              position="bottom-right"
              autoClose={2000}
              hideProgressBar
              newestOnTop={false}
              rtl={false}
              pauseOnFocusLoss={false}
              draggable={false}
              icon={false}
              toastClassName={'toast'}
              closeButton={false}
            />
          </DialogProvider>
        </Provider>
      </I18nextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
