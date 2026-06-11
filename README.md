# EVOZX Ultimate Factory v2.0 — Frontend Documentation

Serverless frontend architecture tailored for deployment on GitHub Pages. Built with zero backend overhead, zero Node.js runtime dependencies, and constructed using pure HTML5, CSS3, Vanilla JS, and Ethers.js v6.

---

## 🎨 Design System & Branding (v2.0)

The interface has been fully overhauled to a premium **Black & Gold** visual identity, optimized for financial/tokenization platforms. 

### Core Visual Design Tokens:
- **Font Stack:** Pure System Font Fallback (`-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `Roboto`, `Helvetica Neue`, `Arial`, `sans-serif`). External web font connections (Google Fonts) have been completely decoupled to guarantee maximum privacy, performance, and immediate rendering speed.
- **Base Background (`--color-bg-base`):** Absolute Pitch Black (`#000000`).
- **Card Background (`--color-bg-card`):** Ultra-dark charcoal grey (`#0d0d0d`) with subtle boundaries.
- **Primary Accent (`--color-gold`):** Classic Metallic Gold (`#D4AF37`) used for branding accents, highlights, primary buttons, and critical active interactive states.
- **Secondary Accent (`--color-gold-bright`):** Vibrant Gold (`#F3E5AB`) for high-contrast hovers and interactive triggers.

---

## 📁 Updated Folder Structure

evozx-factory/
│
├── index.html                    # Homepage (Hero, Live Stats, Features, Workflow, CTA)
│
├── pages/
│   ├── create.html               # Phase 3: Token deployment form (Placeholder)
│   ├── explore.html              # Phase 4: Token explorer list (Placeholder)
│   ├── my-tokens.html            # Phase 5: Creator wallet portfolio (Placeholder)
│   └── verification.html         # Phase 6: Verification Toolkit & Standard JSON export
│
├── css/
│   ├── design-tokens.css         # ★ Single source of truth — All global Black & Gold variables
│   ├── base.css                  # CSS Reset, system typography scales, utility classes
│   ├── components.css            # Reusable UI components (Navbar, Gold Buttons, Inputs, Toast, Skeleton)
│   ├── layout.css                # Layout layout (Container rules, Hero block, Feature grids, Footer)
│   └── pages/
│       └── home.css              # Page-specific override hooks (Extendable per view)
│
└── js/
├── core/
│   ├── config.js             # Contract addresses, Chain parameters (Chain 805), and ABIs
│   ├── wallet.js             # WalletManager: Connect/disconnect execution & metamask state tracking
│   └── contract.js           # ContractManager: High-level read/write smart contract wrappers
│
├── modules/
│   ├── nav.js                # Responsive navigation mobile drawer, scroll shrink, active highlights
│   └── toast.js              # Multi-state notifications (Success, Error, Warning, Info)
│
└── pages/
└── home.js               # Reactive initialization for landing page components

---

## 🚀 Script Execution Order

To prevent execution race conditions and guarantee that `Ethers.js` and Core Config tokens are available globally, scripts **must** be loaded at the bottom of the `<body>` element in the exact order specified below:

```html
<script src="[https://cdnjs.cloudflare.com/ajax/libs/ethers/6.7.0/ethers.umd.min.js](https://cdnjs.cloudflare.com/ajax/libs/ethers/6.7.0/ethers.umd.min.js)"></script>

<script src="js/core/config.js"></script>

<script src="js/core/wallet.js"></script>

<script src="js/core/contract.js"></script>

<script src="js/modules/nav.js"></script>
<script src="js/modules/toast.js"></script>

<script src="js/pages/[page].js"></script>

## 🛠 Key APIs & Global Modules
// Trigger Web3 Account Connection + Enforce Switch to EVOZ Mainnet (Chain 805)
await WalletManager.connect();

// Fetch On-chain Deployment Fees Dynamically from Factory Contract Parameters
const { total, burn, treasury } = await ContractManager.getDeploymentFee(config);

// Dispatch Factory Transaction (Automatically handles token approvals behind the scenes)
const { tokenAddress } = await ContractManager.createToken(config);

// Trigger Contextual Non-blocking Global Toasts
Toast.show('success', 'Token Deployed Successfully', 'Address: 0x1234…abcd');
Toast.show('error', 'Transaction Rejected', err.message);


⛓ Network Matrix & Deployments

PropertyTarget Chain Specifications
Network NameEVOZ Mainnet
Chain ID805 (Hexadecimal: 0x325)
Native CurrencyEVOZ (18 Decimals)
RPC Endpointhttps://rpc.evoz.network
Block Explorerhttps://explorer.evoz.network
Factory Smart Contract0xbA40773bCF0d30e83c4319796Ec45CA31d6e64bB
EVOZX Token Address0x032a962F62Fc1cbc15B19767Aa138deA3B454B74
Treasury Address Split0x50Cd30Ff7f0fbBD9d0FDe1F60DE8c52D6F390c5C
Burn Gateway (DEAD)0x000000000000000000000000000000000000dEaD

🔒 Security & Implementation Standards
Zero Inline Scripting: All reactive behavioral handlers are decoupled cleanly into their respective execution scripts inside the js/ hierarchy.
Scoped Semantic CSS: Structural cascading rules flow linearly through design-tokens.css → base.css → components.css → layout.css to eliminate style pollution and keep calculations lightweight.
Safe Integer Operations: All numeric expressions handling currency values rely strictly on Ethers' native BigInt handling methods to avoid precision breakdown.
