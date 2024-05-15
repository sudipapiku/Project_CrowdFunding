import React, { useContext, createContext } from 'react';
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract('0x70e465408E360DfBeAE0ec5348a6BAaC65F53357');
  const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');

  const address = useAddress();
  const connect = useMetamask(); // Assuming useMetamask provides the 'connect' function

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign({
        args: [
          address, // owner
          form.name, // name
          form.title, // title
          form.description, // description
          form.category, // category
          form.target,
          new Date(form.deadline).getTime(), // deadline,
          form.image,
        ],
      });

      console.log("contract call success", data)
    } catch (error) {
      console.log("contract call failure", error)
    }
  }
  
  // Stop the campaign if the goal amount is reached or if the owner doesn't want to collect the extra amount

  const stopCampaign = async (campaignId) => {
    try {
      await contract.call('stopCampaign', [campaignId]);
      console.log("stopCampaign success");
    } catch (error) {
      console.log("stopCampaign failure", error);
    }
  }

  // Function to continue a campaign
  const continueCampaign = async (campaignId) => {
    try {
      await contract.call('continueCampaign', [campaignId]);
      console.log("continueCampaign success");
    } catch (error) {
        console.log("continueCampaign failure", error);
    }
  }
  // campaign active or not 
  const isCampaignActive = async (campaignId) => {
    try {
      if (!contract) {
        console.error("Contract object is not initialized");
        return false;
      }
  
      const isActive = await contract.call('isCampaignActive', [campaignId]);
      return isActive;
    } catch (error) {
      console.error("Error fetching campaign status:", error);
      return false; // Return false in case of error
    }
  }


  
  const checkAndPromptForCampaignStatus = async (campaignId) => {
    try {
      const campaigns = await getCampaigns();
      const campaign = campaigns[campaignId];
  
      if (!campaign) {
        console.error("Campaign not found");
        return false;
      }
  
      const isGoalReached = campaign.amountCollected >= campaign.target;
      const isBeforeDeadline = campaign.deadline > Date.now();
  
      return isGoalReached && isBeforeDeadline;
    } catch (error) {
      console.log("checkAndPromptForCampaignStatus failure", error);
      return false;
    }
  };
    
  

  const withdrawFunds = async (campaignId) => {
    try {
      const data = await contract.call('withdrawFunds', [campaignId]);
      console.log("withdrawFunds success", data);
    } catch (error) {
      console.log("withdrawFunds failure", error);
    }
  }
   
  const getCampaigns = async () => {
    const campaigns = await contract.call('getCampaigns');

    const parsedCampaings = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      name: campaign.name,
      title: campaign.title,
      description: campaign.description,
      category: campaign.category,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
      image: campaign.image,
      pId: i
    }));

    return parsedCampaings;
  }

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);

    return filteredCampaigns;
  }

  const donate = async (pId, amount) => {
    const data = await contract.call('donateToCampaign', [pId], { value: ethers.utils.parseEther(amount)});

    return data;
  }

  const getDonations = async (pId) => {
    const donations = await contract.call('getDonators', [pId]);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for(let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString())
      })
    }

    return parsedDonations;
  }

  return (
    <StateContext.Provider
      value={{ 
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        isCampaignActive,
        withdrawFunds,
        stopCampaign,
        continueCampaign,
        getCampaigns,
        checkAndPromptForCampaignStatus,
        getUserCampaigns,
        donate,
        getDonations,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);
