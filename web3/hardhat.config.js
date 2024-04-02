/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: '0.8.9',
    defaultNetwork: 'FantomTestnet',
    networks: {
      hardhat: {},
      // goerli: {
      //   url: 'https://rpc.ankr.com/eth_goerli',
      //   accounts: [`0x${process.env.PRIVATE_KEY}`]
      // }
      // Mumbai: {
      //   url: 'https://polygon-mumbai.g.alchemy.com/v2/demo',
      //   accounts: [`0x${process.env.PRIVATE_KEY}`],
      // defaultNetwork: 'polygon-mumbai',
      // }

      // Polygon: {
      //   url: 'https://80002.rpc.thirdweb.com/d391b93f5f62d9c15f67142e43841acc',
      //   accounts: [`0x${process.env.PRIVATE_KEY}`]
      // }

      FantomTestnet: {
        url: 'https://rpc.testnet.fantom.network/',
        accounts: [`0x${process.env.PRIVATE_KEY}`]
      }

      // sepolia: {
      //   url: 'https://eth-sepolia.g.alchemy.com/v2/demo',
      //   accounts: [`0x${process.env.PRIVATE_KEY}`]
      // },

      // Localhost: {
      //   url: 'HTTP://127.0.0.1:8545',
      //   accounts: [`0x${process.env.PRIVATE_KEY}`]
      // }

    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};