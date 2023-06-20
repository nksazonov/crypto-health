import React from "react";
import { metaMask as metamaskConnector, hooks } from "../connectors/metaMask";
import { getAddChainParameters } from "../chains";

const { useChainId, useAccounts, useIsActive, useProvider } = hooks;

export default function useDApp() {
  const chainId = useChainId();
  const accounts = useAccounts();
  const account = accounts?.[0];

  const isActive = useIsActive();
  const provider = useProvider();

  // const config = useAppSelector((state) => state.config);
  const signer = React.useMemo(() => {
    return provider?.getSigner();
  }, [provider]);

  const connectWallet = React.useCallback(async () => {
    try {
      await metamaskConnector.activate(getAddChainParameters(80001));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const disconnectWallet = React.useCallback(() => {
    if (metamaskConnector?.deactivate) {
      metamaskConnector.deactivate();
    } else if (metamaskConnector?.resetState) {
      metamaskConnector.resetState();
    }
  }, []);

  const currentProvider = React.useMemo(() => {
    if ((window as any)?.ethereum?.providers?.length) {
      return (window as any)?.ethereum?.providerMap?.get("MetaMask");
    }

    return (window as any)?.ethereum;
  }, []);

  return {
    isActive,
    account,
    chainId,
    signer,
    metamaskConnector,
    connectWallet,
    disconnectWallet,
    provider,
    currentProvider,
  };
}
