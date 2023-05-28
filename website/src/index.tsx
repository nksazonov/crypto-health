import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Web3ReactHooks, Web3ReactProvider } from '@web3-react/core';

import { hooks as metaMaskHooks, metaMask } from './connectors/metaMask'
import { MetaMask } from '@web3-react/metamask';
import MetaMaskCard from './components/connectorCards/MetaMaskCard';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const connectors: [MetaMask, Web3ReactHooks][] = [[metaMask, metaMaskHooks]];

root.render(
  <React.StrictMode>
    <Web3ReactProvider connectors={connectors}>
      <div style={{ display: 'flex', flexFlow: 'wrap', fontFamily: 'sans-serif' }}>
        <MetaMaskCard />
      </div>
    </Web3ReactProvider>
  </React.StrictMode>
);
