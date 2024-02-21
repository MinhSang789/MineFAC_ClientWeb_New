
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App from './App';
import 'antd/dist/antd.css';
import './styles/main.scss';
import './App.css';
import './styles/_antd.scss';

import store from './store'
import { IntlProviderWrapper } from 'helper/Internationalization';
import { ModalProvider } from 'context/ModalContext';
import { SystemProvider } from 'context/SystemContext';
import { UserProvider } from 'context/UserContext';
import { WalletProvider } from 'context/WalletContext';

ReactDOM.render(
  <Provider store={store}>
    <IntlProviderWrapper>
      <SystemProvider>
        <UserProvider>
          <WalletProvider>
            <ModalProvider>
              <App />
            </ModalProvider>
          </WalletProvider>
        </UserProvider>
      </SystemProvider>
    </IntlProviderWrapper>
  </Provider>,
  document.getElementById('root')
);

