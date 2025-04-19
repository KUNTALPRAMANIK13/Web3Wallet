# Crypto Wallet Generator

A secure, client-side cryptocurrency wallet generator that creates Ethereum and Solana wallets from a BIP39 mnemonic seed phrase.

## Live Demo

Try the application live at: [https://web3-wallet-three.vercel.app/](https://web3-wallet-three.vercel.app/)

## Features

- **Secure Seed Phrase Generation**: Creates cryptographically secure BIP39 mnemonic seed phrases
- **Multi-Cryptocurrency Support**: Generate wallets for Ethereum and Solana
- **Multiple Wallet Creation**: Generate multiple wallets with different derivation paths from a single seed phrase
- **Private Key Management**: View and securely copy private keys with show/hide functionality
- **Client-Side Security**: All operations run locally in your browser with no data sent to servers
- **Modern React UI**: Clean and intuitive user interface

## Technologies Used

- React 19
- Vite
- ethers.js (for Ethereum wallet generation)
- @solana/web3.js (for Solana wallet generation)
- BIP39 for mnemonic seed phrase generation
- ED25519-HD-Key for Solana HD wallet derivation

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/crypto-wallet-generator.git
cd crypto-wallet-generator
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Generate a Seed Phrase**:

   - When you first open the application, click "Create Seed Phrase" to generate a new BIP39 mnemonic
   - Your seed phrase will be displayed as a grid of 12 words
   - You can copy the entire seed phrase with the "Copy Seed Phrase" button

2. **Generate Ethereum Wallets**:

   - Click on the "Ethereum" tab
   - Click "Generate Ethereum Wallet" to create your first wallet
   - Use "Add Wallet" to generate additional wallets from the same seed phrase
   - Use "New Wallet" to reset and generate a single new wallet

3. **Generate Solana Wallets**:

   - Click on the "Solana" tab
   - Click "Generate Solana Wallet" to create your first wallet
   - Use "Add Wallet" to generate additional wallets from the same seed phrase
   - Use "New Wallet" to reset and generate a single new wallet

4. **Managing Private Keys**:
   - Private keys are hidden by default
   - Click "Show" to reveal a wallet's private key
   - Use the "Copy" button to copy the address or private key to your clipboard

## Security Considerations

- **Your seed phrase is your master key**: Anyone with access to your seed phrase can access all wallets derived from it
- **Store safely offline**: Write down your seed phrase and keep it in a secure location
- **Never share private keys**: Private keys provide direct access to your funds
- **This is a client-side application**: No data is sent to any server, all operations happen in your browser

## Development

- Build for production:

```bash
npm run build
```

- Preview the production build:

```bash
npm run preview
```

- Lint the codebase:

```bash
npm run lint
```

## License

MIT

## Disclaimer

This wallet generator is provided for educational purposes only. Always use reputable hardware or software wallets for storing significant cryptocurrency assets. The creators of this tool are not responsible for any loss of funds.
