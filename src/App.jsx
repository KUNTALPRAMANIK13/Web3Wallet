import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { generateMnemonic } from "bip39";
import EthereumWallet from "./components/EthereumWallet";
import SolanaWallet from "./components/SolanaWallet";

function App() {
  const [mnemonic, setMnemonic] = useState("");
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("seed");
  // Add state to store wallet data for both Ethereum and Solana
  const [ethWallets, setEthWallets] = useState([]);
  const [solWallets, setSolWallets] = useState([]);
  const [ethLoading, setEthLoading] = useState(false);
  const [solLoading, setSolLoading] = useState(false);
  const [ethGeneratingMore, setEthGeneratingMore] = useState(false);
  const [solGeneratingMore, setSolGeneratingMore] = useState(false);
  const [visibleEthPrivateKeys, setVisibleEthPrivateKeys] = useState({});
  const [visibleSolPrivateKeys, setVisibleSolPrivateKeys] = useState({});

  const createNewMnemonic = async () => {
    const mn = await generateMnemonic();
    setMnemonic(mn);
    // Reset wallets when creating a new seed phrase
    setEthWallets([]);
    setSolWallets([]);
    setVisibleEthPrivateKeys({});
    setVisibleSolPrivateKeys({});
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(mnemonic);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderMnemonicWords = () => {
    if (!mnemonic) return null;

    const words = mnemonic.split(" ");
    return (
      <div className="mnemonic-words">
        {words.map((word, index) => (
          <div key={index} className="mnemonic-word">
            <span className="word-number">{index + 1}.</span>
            <span className="word">{word}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container">
      <h1>Crypto Wallet Generator</h1>

      <div className="card">
        <div className="wallet-tabs">
          <button
            className={`tab-button ${activeTab === "seed" ? "active" : ""}`}
            onClick={() => setActiveTab("seed")}
          >
            Seed Phrase
          </button>
          <button
            className={`tab-button ${activeTab === "ethereum" ? "active" : ""}`}
            onClick={() => setActiveTab("ethereum")}
            disabled={!mnemonic}
          >
            Ethereum
          </button>
          <button
            className={`tab-button ${activeTab === "solana" ? "active" : ""}`}
            onClick={() => setActiveTab("solana")}
            disabled={!mnemonic}
          >
            Solana
          </button>
        </div>

        <div className="tab-content">
          {activeTab === "seed" && (
            <>
              {mnemonic ? (
                <>
                  <div className="warning">
                    <p>
                      Never share your seed phrase with anyone! Store it
                      securely offline.
                    </p>
                  </div>

                  <div className="mnemonic-container">
                    {renderMnemonicWords()}
                  </div>

                  <div className="controls">
                    <button onClick={createNewMnemonic}>
                      Generate New Phrase
                    </button>
                    <button className="copy-btn" onClick={copyToClipboard}>
                      {copied ? "Copied!" : "Copy Seed Phrase"}
                    </button>
                  </div>
                </>
              ) : (
                <div className="empty-state">
                  <p>No seed phrase generated yet</p>
                  <button onClick={createNewMnemonic}>
                    Create Seed Phrase
                  </button>
                </div>
              )}
            </>
          )}

          {activeTab === "ethereum" && (
            <EthereumWallet
              mnemonic={mnemonic}
              wallets={ethWallets}
              setWallets={setEthWallets}
              isLoading={ethLoading}
              setIsLoading={setEthLoading}
              isGeneratingMore={ethGeneratingMore}
              setIsGeneratingMore={setEthGeneratingMore}
              visiblePrivateKeys={visibleEthPrivateKeys}
              setVisiblePrivateKeys={setVisibleEthPrivateKeys}
            />
          )}

          {activeTab === "solana" && (
            <SolanaWallet
              mnemonic={mnemonic}
              wallets={solWallets}
              setWallets={setSolWallets}
              isLoading={solLoading}
              setIsLoading={setSolLoading}
              isGeneratingMore={solGeneratingMore}
              setIsGeneratingMore={setSolGeneratingMore}
              visiblePrivateKeys={visibleSolPrivateKeys}
              setVisiblePrivateKeys={setVisibleSolPrivateKeys}
            />
          )}
        </div>
      </div>

      <div className="wallet-note">
        <p>
          This wallet generator creates a BIP39 mnemonic seed phrase that can be
          used to generate cryptocurrency wallets.
        </p>
        {mnemonic && activeTab === "seed" && (
          <p>
            Click on the Ethereum or Solana tabs to generate wallets using this
            seed phrase.
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
