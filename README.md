# Compound-Registry

## Functionality

A Compound Registry Dapp with following features:
- Open Safe ETH-DAI Position in Compound with 1 click
- Wind up some part of your position in 1 click
- View your ctoken and borrowed asset balances at all times

### Note 
- The [Contract](https://ropsten.etherscan.io/address/0x2295a8dfd58619385d6920eed61fd7baf73c3e56) is deployed on Ropsten please read the comments there and in all the JS files and as mentioned have created a minimal UI.
- Due to time constraints on the task tested with ETH-DAI Pair
- The registry acts as a proxy implementation for the user since it is a connector on top of Compound, due to time constraints have not implemented the open zepplin proxy on top of the registry.
- Once deployed please replace the registry contract address in config file to test


### Installation Steps
- Clone the Repo
- Go inside frontend folder
- Do npm install
- Run npm run start 
- Go To localhost:3000 and connect your wallet

### Re Producing Instructions
- Deploy the contract
- Follow the installation steps
- go to open position, connect your wallet and enter the amounts as specified on the screen
- Once the tx happens refresh and click connect again and you will see the updateed balances
- go to pay out, connect your wallet and enter the amounts as specified on the screen 
- repaeat step 4
- NOTE -> I would recommend going through the contract & the code for comments etc. to have a better understanding


### Screenshots
![resgistryhome](https://user-images.githubusercontent.com/26670962/87881113-c3b81800-ca14-11ea-9095-830ca0254d68.png)
Home Page

![open1](https://user-images.githubusercontent.com/26670962/87881119-c87ccc00-ca14-11ea-997f-0e635699e35e.png)
Open Position

![openposition](https://user-images.githubusercontent.com/26670962/87881122-cd418000-ca14-11ea-9aac-b328f7d1339e.png)
Pay Out



