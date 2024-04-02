// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        string category;
        uint256 target; 
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
        bool isActive; // Flag to indicate if the campaign is active or stopped

    }

    mapping(uint256 => Campaign) public campaigns;

    uint256 public numberOfCampaigns = 0;

    function createCampaign(address _owner, string memory _title, string memory _description, string memory _category, uint256 _target, uint256 _deadline, string memory _image) public returns (uint256) {
        require(_deadline > block.timestamp, "The deadline should be a date in the future.");

        Campaign storage campaign = campaigns[numberOfCampaigns];

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.category = _category;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;
        campaign.isActive = true; // New campaigns are active by default

        numberOfCampaigns++;

        return numberOfCampaigns - 1;
    }


    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;

        Campaign storage campaign = campaigns[_id];

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        (bool sent,) = payable(campaign.owner).call{value: amount}("");

        if(sent) {
            campaign.amountCollected = campaign.amountCollected + amount;
        }
    }

    function isCampaignActive(uint256 _id) public returns (bool) {
        require(_id < numberOfCampaigns, "Invalid campaign ID");

        Campaign storage campaign = campaigns[_id];

        // Check if the campaign is active and the deadline has not passed
        bool isActive = campaign.isActive && block.timestamp < campaign.deadline;

        // If the fundraising goal is reached or the deadline is passed, stop the campaign
        if (campaign.amountCollected >= campaign.target || block.timestamp >= campaign.deadline) {
            campaign.isActive = false;
            isActive = false; // Update the isActive variable to return false
        }

        return isActive;
    }



    function stopCampaign(uint256 _id) public {
        require(msg.sender == campaigns[_id].owner, "Only the owner can stop the campaign");
        require(campaigns[_id].isActive, "Campaign is already stopped");
        
        campaigns[_id].isActive = false;
    }

    function continueCampaign(uint256 _id) public {
        require(msg.sender == campaigns[_id].owner, "Only the owner can continue the campaign");
        require(!campaigns[_id].isActive, "Campaign is already active");

        campaigns[_id].isActive = true;
    }


    function withdrawFunds(uint256 _id) public {
        Campaign storage campaign = campaigns[_id];

        require(msg.sender == campaign.owner, "Only the owner can withdraw funds");
        require(block.timestamp >= campaign.deadline || !campaign.isActive, "Withdrawal is only allowed after the deadline or if the campaign is stopped");
        require(campaign.amountCollected > 0, "Insufficient funds for withdrawal");

        uint256 amountToWithdraw = campaign.amountCollected;
        campaign.amountCollected = 0;

        payable(campaign.owner).transfer(amountToWithdraw);
    }

    function setCampaignActive(uint256 _id, bool _isActive) public {
        require(msg.sender == campaigns[_id].owner, "Only the owner can change the campaign status");
        campaigns[_id].isActive = _isActive;
    }

    function getDonators(uint256 _id) view public returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }


    function checkAndPromptForCampaignStatus(uint256 _id) public view returns (bool) {
        Campaign storage campaign = campaigns[_id];
        // Check if the amount collected is greater than or equal to the target
        // No need to check the deadline since we're only interested in goal achievement
        return campaign.amountCollected >= campaign.target && block.timestamp < campaign.deadline;
    }


    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for(uint i = 0; i < numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i];

            allCampaigns[i] = item;
        }

        return allCampaigns;
    }


}
