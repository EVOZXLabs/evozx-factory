# EVOZX Ultimate Factory v2.0 — Frontend Boilerplate

Serverless frontend architecture tailored for deployment on GitHub Pages. Built with zero backend overhead, zero Node.js runtime dependencies, and constructed using pure HTML5, CSS3, Vanilla JS, and Ethers.js v6.

---

## Folder Structure

```
evozx-factory/
│
├── index.html                    # Homepage (Hero, Features, Workflow, CTA)
│
├── pages/
│   ├── create.html               # Phase 3: Token deployment form
│   ├── explore.html              # Phase 4: Token explorer
│   ├── my-tokens.html            # Phase 5: Creator portfolio
│   └── verification.html         # Phase 6: Verification Center
│
├── css/
│   ├── design-tokens.css         # ★ Single source of truth — all CSS variables
│   ├── base.css                  # Reset, global typography, utility classes
│   ├── components.css            # Navbar, Buttons, Cards, Inputs, Toast, Skeleton
│   ├── layout.css                # Container, sections, Hero, Features, Footer
│   └── pages/
│       └── home.css              # Page-specific overrides (extend per page)
│
├── js/
│   ├── core/
│   │   ├── config.js             # Chain ID, contract addresses, ABIs
│   │   ├── wallet.js             # WalletManager: connect/disconnect/events
│   │   └── contract.js           # ContractManager: factory & token read/write
│   │
│   ├── modules/
│   │   ├── nav.js                # Hamburger, scroll effect, active link
│   │   └── toast.js              # Toast.show(type, title, message)
│   │
│   └── pages/
│       └── home.js               # Home page: live stats from chain
│
└── assets/
    ├── icons/                    # SVG icons (add as needed)
    └── fonts/                    # Local font files (optional, using Google Fonts)
```

---

## Design System

The interface has been fully overhauled to a premium **Black & Gold** visual identity, optimized for financial/tokenization platforms. 

---

## Script Load Order (per page)

```html
<!-- 1. Ethers v6 -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/ethers/6.7.0/ethers.umd.min.js"></script>
<!-- 2. Config (constants, ABIs) -->
<script src="js/core/config.js"></script>
<!-- 3. Wallet manager -->
<script src="js/core/wallet.js"></script>
<!-- 4. Contract interface -->
<script src="js/core/contract.js"></script>
<!-- 5. UI modules -->
<script src="js/modules/nav.js"></script>
<script src="js/modules/toast.js"></script>
<!-- 6. Page-specific logic -->
<script src="js/pages/[page].js"></script>
```

---

## Key APIs

```js
// Connect wallet + switch to EVOZ Mainnet (Chain 805)
await WalletManager.connect();

// Get deployment fee for a config
const { total, burn, treasury } = await ContractManager.getDeploymentFee(config);

// Deploy token (handles approval automatically)
const { tokenAddress } = await ContractManager.createToken(config);

// Toast notifications
Toast.show('success', 'Token Deployed', '0x1234…abcd');
Toast.show('error', 'Transaction Failed', err.message);
```

---

## Chain Info

| Property | Value |
|---|---|
| Network | EVOZ Mainnet |
| Chain ID | 805 (0x325) |
| Factory | `0xbA40773bCF0d30e83c4319796Ec45CA31d6e64bB` |
| EVOZX Token | `0x032a962F62Fc1cbc15B19767Aa138deA3B454B74` |
| Treasury | `0x50Cd30Ff7f0fbBD9d0FDe1F60DE8c52D6F390c5C` |

---

## Phase Roadmap

| Phase | Scope |
|---|---|
| ✅ Phase 1–2 | Foundation: Design system, boilerplate, nav, wallet, contract core |
| 🔜 Phase 3 | Create Token: Config form + live fee calculator + deployment flow |
| 🔜 Phase 4 | Explore Tokens: Factory token list, filtering, pagination |
| 🔜 Phase 5 | My Tokens: Creator portfolio, token management panel |
| 🔜 Phase 6 | Verification Center: Standard Input JSON + constructor args export |
