import React, { useState, useEffect } from 'react'

import { WithdrawalDisplayCampaign } from '../components';
import { useStateContext } from '../context'

const Withdrawal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getUserCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <WithdrawalDisplayCampaign 
      title="Your Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  ) 
}

export default Withdrawal