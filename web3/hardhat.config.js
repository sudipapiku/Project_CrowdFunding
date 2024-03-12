/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: '0.8.9',
    defaultNetwork: 'polygon-mumbai',
    networks: {
      hardhat: {},
      // goerli: {
      //   url: 'https://rpc.ankr.com/eth_goerli',
      //   accounts: [`0x${process.env.PRIVATE_KEY}`]
      // }
      Mumbai: {
        url: 'https://polygon-mumbai.g.alchemy.com/v2/demo',
        accounts: [`0x${process.env.PRIVATE_KEY}`],
      }

      // sepolia: {
      //   url: 'https://eth-sepolia.g.alchemy.com/v2/demo',
      //   accounts: [`0x${process.env.PRIVATE_KEY}`]
      // },

      // Localhost: {
      //   url: 'HTTP://127.0.0.1',
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