import React from "react";
import * as solanaWeb3 from "@solana/web3.js";
import { derivePath } from "ed25519-hd-key";
import * as bip39 from "bip39";
import solanaLogo from "../assets/crypto/solana-sol-logo.svg";

function SolanaWallet({
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
      // Convert mnemonic to seed
      const seed = await bip39.mnemonicToSeed(mnemonic);
      const newIndex = wallets.length;
      // Generate multiple wallets with different account indices

      // Derive the ED25519 private key using the path m/44'/501'/i'/0'
      const derivedPath = `m/44'/501'/${newIndex}'/0'`;
      const derivedSeed = derivePath(derivedPath, seed.toString("hex")).key;

      // Create a keypair from the derived seed
      const keypair = solanaWeb3.Keypair.fromSeed(derivedSeed);

      // Get the public key (wallet address)
      const publicKey = keypair.publicKey.toString();

      setWallets([
        ...wallets,
        {
          index: newIndex,
          address: publicKey,
          path: derivedPath,
          publicKey: keypair.publicKey,
          secretKey: keypair.secretKey,
        },
      ]);
    } catch (error) {
      console.error("Error generating Solana wallets:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyAddress = (address) => {
    navigator.clipboard.writeText(address);
  };

  const copyPrivateKey = (secretKey) => {
    // Convert the Uint8Array to a hex string for copying
    const privateKeyHex = Buffer.from(secretKey).toString("hex");
    navigator.clipboard.writeText(privateKeyHex);
  };

  const togglePrivateKeyVisibility = (index) => {
    setVisiblePrivateKeys((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  // Helper function to format the secret key for display
  const formatSecretKey = (secretKey) => {
    return Buffer.from(secretKey).toString("hex");
  };

  return (
    <div className="wallet-component">
      {wallets.length === 0 ? (
        <div className="wallet-empty-state">
          <img src={solanaLogo} alt="Solana logo" className="wallet-logo" />
          <h3>Solana Wallets</h3>
          <p>Generate Solana wallets from your seed phrase</p>

          <button
            onClick={() => generateWallets()}
            disabled={!mnemonic || isLoading}
            className="wallet-button"
            style={{ background: "linear-gradient(135deg, #9945FF, #14F195)" }}
          >
            {isLoading ? "Generating..." : "Generate Solana Wallet"}
          </button>
        </div>
      ) : (
        <div className="wallets-container">
          <div className="wallets-header">
            <img
              src={solanaLogo}
              alt="Solana logo"
              className="wallet-logo-small"
            />
            <h3>Solana Wallets</h3>
            <div className="wallet-header-buttons">
              <button
                onClick={() => generateWallets()}
                disabled={isGeneratingMore}
                className="add-wallet-button"
                title="Add one more wallet"
                style={{
                  background: "linear-gradient(135deg, #9945FF, #14F195)",
                }}
              >
                {isGeneratingMore ? "Adding..." : "Add Wallet"}
              </button>
              <button
                onClick={() => generateWallets(1)}
                className="reset-button"
                title="Reset and generate one new wallet"
                style={{
                  background: "linear-gradient(135deg, #9945FF, #14F195)",
                }}
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
                        style={{
                          background:
                            "linear-gradient(135deg, #9945FF, #14F195)",
                        }}
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
                        style={{
                          background: visiblePrivateKeys[wallet.index]
                            ? "linear-gradient(135deg, #FF5757, #FF9945)"
                            : "linear-gradient(135deg, #9945FF, #14F195)",
                        }}
                      >
                        {visiblePrivateKeys[wallet.index] ? "Hide" : "Show"}
                      </button>
                    </div>
                    <div className="wallet-private-key-container">
                      <code>
                        {visiblePrivateKeys[wallet.index]
                          ? formatSecretKey(wallet.secretKey)
                          : "••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••"}
                      </code>
                      <button
                        className="copy-address-btn"
                        onClick={() => copyPrivateKey(wallet.secretKey)}
                        title="Copy private key"
                        style={{
                          background:
                            "linear-gradient(135deg, #9945FF, #14F195)",
                        }}
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
              You can import any of these wallets into Phantom Wallet or other
              Solana wallets.
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

export default SolanaWallet;
