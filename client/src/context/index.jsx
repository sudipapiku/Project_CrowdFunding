import React, { useContext, createContext } from 'react';
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract('0x989D1cFe6c19C9b5Cd43D343A4C3748280f5B1a7');
  const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');

  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign({
				args: [
					address, // owner
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

  const stopCampaign = async (campaignId) => {
    try {
      const campaign = await contract.call('getCampaign', [campaignId]);
      const isGoalReached = campaign.amountCollected >= campaign.target;

      // Check if the goal amount is already reached
      if (isGoalReached) {
        // Prompt the owner to decide whether to continue the campaign or not
        const collectExtraAmount = window.confirm("The goal amount is already reached. Do you want to continue the campaign and collect the extra amount?");

        if (collectExtraAmount) {
          // Continue the campaign by setting isActive to true
          await contract.call('setCampaignActive', [campaignId, true]);
          console.log("Campaign continued successfully");
          return;
        }
      }

      // Stop the campaign if the goal amount is reached or if the owner doesn't want to collect the extra amount
      await contract.call('stopCampaign', [campaignId]);
      console.log("stopCampaign success");
    } catch (error) {
      console.log("stopCampaign failure", error);
    }
  }

  const isCampaignActive = async (campaignId) => {
    try {
      const isActive = await contract.call('isCampaignActive', [campaignId]); // Assuming 'isCampaignActive' is a function in your contract that returns the status
      return isActive;
    } catch (error) {
      console.error("Error fetching campaign status:", error);
      return false; // Return false in case of error
    }
  }

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
        getCampaigns,
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
