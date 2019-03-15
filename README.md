# Seuss App

This is the front-end that interacts with the Seuss contracts.  Allows doctors to prescribe medicine to patients,
who then use the prescriptions to purchase medicine.

The contracts are at [seuss-contracts](https://github.com/prismseuss/seuss-contracts).

# Setup

Install dependencies:

```
$ yarn
```

Make sure you have `direnv` installed and copy `.envrc.example` to `.envrc`:

```
$ cp .envrc.example .envrc
$ direnv allow
```

Now you must configure the deployed contract addresses.  If you're running locally and using the default ganache config from [seuss-contracts](https://github.com/prismseuss/seuss-contracts) you'll need to add a file at `networks/1234.json`.  This file should contain the contract address config for the network 1234 (local chain id).  It should look like this:

```json
[
  {
    "contractName": "Seuss",
    "address": "0xDf9779Bab5AE23aDc40987A3bd4D686d5c7Bc1C7"
  }
]
```

Make sure to update the address with your locally deployed contract address.

Now, make sure to generate the artifacts that the app consumes:

```
$ yarn apply-registry
```

This will generate files that match the Truffle artifact shape for contract network configs.  These files are pulled into the app.  If you want to setup a custom test environment then you follow the custom contract configuration instructions below.

To run the local server, run:

```
$ yarn start
```

To build the production version of the site run:

```
$ yarn build
```

## Custom Contract Addresses

We use [truffle-deploy-registry](https://github.com/MedXProtocol/truffle-deploy-registry) to manage the contract addresses.  TDR merges network config files into Truffle artifacts.  Each network config file stores an array of deployed contracts in chronological order.  The newest addresses for each contract and from each network config are merged into a standard Truffle artifact JSON object.

Create a network config for the contracts deployed to the [pool-together-mock](https://github.com/DeltaCamp/pool-together-mock).  The network id for the `pool-together-mock` ganache-cli node is 1234, so create a file like so:

`networks/1234.json`

```json
[
  {
    "contractName": "Seuss",
    "address": "0x1111111111111111111111111111111111111111"
  }
]
```

Make sure to replace the above addresses with the actual addresses in the generated zos config file `zos.dev-1234.json` in the pool-together-mock project directory.

Now generate the Truffle artifacts to be included in the build:

```
$ yarn apply-registry
```

This will generate Truffle-compatible artifacts in the `build/contracts` directory.

# Updating the Contract ABIs

The ABIs live in `src/apollo/abi`.  They are currently hard-coded in the app, so any changes to the contracts will require these files to be updated.

##### Made with :heart: by [Delta Camp](https://delta.camp)
