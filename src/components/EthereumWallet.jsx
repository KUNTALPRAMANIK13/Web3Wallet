import React from "react";
import { ethers } from "ethers";
import ethereumLogo from "../assets/crypto/ethereum-eth-logo.svg";

function EthereumWallet({
  mnemonic,
  wallets,
  setWallets,
  isLoading,
  setIsLoading,
  isGeneratingMore,
  setIsGeneratingMore,
  visiblePrivateKeys,
  setVisiblePrivateKeys,
}) {
  const newWallets = [];
  const generateWallets = async () => {
    if (!mnemonic) return;
    
    setIsLoading(true);
    try {
      // Create multiple wallets from the same mnemonic with different derivation paths
      const newIndex = wallets.length;

      const path = `m/44'/60'/0'/0/${newIndex}`;
      const wallet = ethers.Wallet.fromMnemonic(mnemonic, path);

      setWallets([
        ...wallets,
        {
          index: newIndex,
          address: wallet.address,
          path,
          privateKey: wallet.privateKey,
        },
      ]);
    } catch (error) {
      console.error("Error generating Ethereum wallets:", error);
    } finally {
      setIsLoading(false);
    }
  };

  

  const copyAddress = (address) => {
    navigator.clipboard.writeText(address);
  };

  const copyPrivateKey = (privateKey) => {
    navigator.clipboard.writeText(privateKey);
  };

  const togglePrivateKeyVisibility = (index) => {
    setVisiblePrivateKeys((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div className="wallet-component">
      {wallets.length === 0 ? (
        <div className="wallet-empty-state">
          <img src={ethereumLogo} alt="Ethereum logo" className="wallet-logo" />
          <h3>Ethereum Wallets</h3>
          <p>Generate Ethereum wallets from your seed phrase</p>

          <button
            onClick={() => generateWallets()}
            disabled={!mnemonic || isLoading}
            className="wallet-button"
          >
            {isLoading ? "Generating..." : "Generate Ethereum Wallet"}
          </button>
        </div>
      ) : (
        <div className="wallets-container">
          <div className="wallets-header">
            <img
              src={ethereumLogo}
              alt="Ethereum logo"
              className="wallet-logo-small"
            />
            <h3>Ethereum Wallets</h3>
            <div className="wallet-header-buttons">
              <button
                onClick={() => generateWallets()}
                disabled={isGeneratingMore}
                className="add-wallet-button"
                title="Add one more wallet"
              >
                {isGeneratingMore ? "Adding..." : "Add Wallet"}
              </button>
              <button
                onClick={() => generateWallets(1)}
                className="reset-button"
                title="Reset and generate one new wallet"
              >
                New Wallet
              </button>
            </div>
          </div>

          <div className="wallets-list">
            {wallets.map((wallet) => (
              <div key={wallet.index} className="wallet-item">
                <div className="wallet-index">{wallet.index + 1}</div>
                <div className="wallet-details">
                  <p className="wallet-path">Path: {wallet.path}</p>

                  <div className="key-container">
                    <div className="key-label">Public Address:</div>
                    <div className="wallet-address-container">
                      <code>{wallet.address}</code>
                      <button
                        className="copy-address-btn"
                        onClick={() => copyAddress(wallet.address)}
                        title="Copy address"
                      >
                        Copy
                      </button>
                    </div>
                  </div>

                  <div className="key-container">
                    <div className="key-label">
                      Private Key:
                      <button
                        className="toggle-visibility-btn"
                        onClick={() => togglePrivateKeyVisibility(wallet.index)}
                        title={
                          visiblePrivateKeys[wallet.index]
                            ? "Hide private key"
                            : "Show private key"
                        }
                      >
                        {visiblePrivateKeys[wallet.index] ? "Hide" : "Show"}
                      </button>
                    </div>
                    <div className="wallet-private-key-container">
                      <code>
                        {visiblePrivateKeys[wallet.index]
                          ? wallet.privateKey
                          : "••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••"}
                      </code>
                      <button
                        className="copy-address-btn"
                        onClick={() => copyPrivateKey(wallet.privateKey)}
                        title="Copy private key"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="wallet-guide">
            <p>
              These wallets are derived from your master seed phrase using
              different derivation paths.
            </p>
            <p>
              You can import any of these wallets into MetaMask or other
              Ethereum wallets.
            </p>
            <p className="warning-text">
              Warning: Never share your private keys with anyone. Anyone with
              access to your private key has full control of your funds.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default EthereumWallet;
