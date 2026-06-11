# Contract Verification Guide

This guide explains how to verify a token contract deployed through EVOZX Ultimate Factory v2.0.

## Verification Settings

Use the following parameters during verification:

| Parameter | Value |
|------------|------------|
| Compiler Version | 0.8.34 |
| Optimization | Enabled |
| Optimizer Runs | 200 |
| EVM Version | Paris |
| Verification Method | Solidity Standard JSON Input |

---

## Step 1

Open the blockchain explorer and navigate to the token contract address.

---

## Step 2

Click **Verify Contract**.

---

## Step 3

Select:

```text
Solidity (Standard JSON Input)
```

---

## Step 4

Configure the compiler settings:

```text
Compiler Version : 0.8.34
Optimization     : Enabled
Optimizer Runs   : 200
EVM Version      : Paris
```

---

## Step 5

Upload the file:

```text
standard-input.json
Link download👉 https://raw.githubusercontent.com/EVOZXLabs/evozx-factory/main/assets/verification/ultimate-standard-input.json
```

from this verification package.

---

## Step 6

Submit the verification request.

The explorer will compile the source code using the provided settings and compare the resulting bytecode with the deployed contract.

---

## Verification Success

If the compiler settings and source files match the original deployment configuration, the contract will be successfully verified.

---

## Included Source Files

```text
LaunchKitToken.sol
LaunchKitTypes.sol
standard-input.json
```

These files represent the official source package used by EVOZX Ultimate Factory v2.0.
