import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useStateContext } from "../context";
import { CountBox, CustomButton, Loader } from "../components";
import { calculateBarPercentage, daysLeft } from "../utils";
import { thirdweb } from "../assets";

const ProfileCampaignDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const {
    getDonations,
    stopCampaign,
    continueCampaign,
    isCampaignActive,
    contract,
    address,
    checkAndPromptForCampaignStatus
  } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [donators, setDonators] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const [goalReachedBeforeDeadline, setGoalReachedBeforeDeadline] = useState(false);

  const remainingDays =
    state.deadline > Date.now() ? daysLeft(state.deadline) : 0;

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);
    setDonators(data);
  };

  useEffect(() => {
    if (contract) {
      fetchDonators();
    }

    const fetchIsActive = async () => {
      const active = await isCampaignActive(state.pId);
      setIsActive(active);
    };
    fetchIsActive();
  }, [contract, address]);

  useEffect(() => {
    const checkGoalReached = async () => {
      if (contract) {
        const goalReached = await checkAndPromptForCampaignStatus(state.pId);
        setIsActive(!goalReached); // Set isActive based on the result
        setGoalReachedBeforeDeadline(goalReached);
      }
    };
    checkGoalReached();
  }, [contract, state.pId]); 

  const handleStopCampaign = async () => {
    setIsLoading(true);
    await stopCampaign(state.pId);
    setIsLoading(false);
    navigate("/withdrawal");
  };

  const handleContinueCampaign = async () => {
    setIsLoading(true);
    await continueCampaign(state.pId);
    setIsLoading(false);
    // navigate('/');
  };

  return (
    <div>
      {isLoading && <Loader />}

      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img
            src={state.image}
            alt="campaign"
            className="w-full h-[410px] object-cover rounded-xl"
          />
          <div className="relative w-full h-[8px] bg-[#3a3a43] mt-2">
            <div
              className="absolute h-full bg-[#4acd8d]"
              style={{
                width: `${calculateBarPercentage(
                  state.target,
                  state.amountCollected
                )}%`,
                maxWidth: "100%",
              }}
            ></div>
          </div>
        </div>

        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox title="Days Left" value={remainingDays} />
          <CountBox
            title={`Raised of ${state.target}`}
            value={state.amountCollected}
          />
          <CountBox title="Total Backers" value={donators.length} />
        </div>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
        <div>
            <h4 className="font-epilogue font-semibold text-[20px] text-[#4acd8d] uppercase">Creator Name</h4>

              <div className="mt-[20px]">
                <p className="font-epilogue font-normal text-[20px] text-[#ebecf7] leading-[26px] text-justify">{state.name}</p>
              </div>
          </div>
          
          <div>
            <h4 className="font-epilogue font-semibold text-[20px] text-[#4acd8d] uppercase">
              Creator Address
            </h4>

            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img
                  src={thirdweb}
                  alt="user"
                  className="w-[60%] h-[60%] object-contain"
                />
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[18px] text-white break-all">
                  {state.owner}
                </h4>
                <p className="mt-[4px] font-epilogue font-normal text-[18px] text-[#4acd8d]">
                  Creator Address
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[20px] text-[#4acd8d] uppercase">
              Story
            </h4>

            <div className="mt-[20px]">
              <p className="font-epilogue font-normal text-[20px] text-[#ebecf7] leading-[26px] text-justify">
                {state.description}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[20px] text-[#4acd8d] uppercase">
              Donators
            </h4>

            <div className="mt-[20px] flex flex-col gap-4">
              {donators.length > 0 ? (
                donators.map((item, index) => (
                  <div
                    key={`${item.donator}-${index}`}
                    className="flex justify-between items-center gap-4"
                  >
                    <p className="font-epilogue font-normal text-[18px] text-[#ebecf7] leading-[26px] break-ll">
                      {index + 1}. {item.donator}
                    </p>
                    <p className="font-epilogue font-normal text-[18px] text-[#ebecf7] leading-[26px] break-ll">
                      {item.donation}
                    </p>
                  </div>
                ))
              ) : (
                <p className="font-epilogue font-normal text-[20px] text-[#ebecf7] leading-[26px] text-justify">
                  No donators yet. Be the first one!
                </p>
              )}
            </div>
          </div>
        </div>

        {goalReachedBeforeDeadline ? (

          <div className="flex-1">
          <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
            <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#ebecf7]">
              Fund Transfer
            </p>
              <div className="mt-[30px]">
                <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                  <p className="mt-[0px] font-epilogue font-normal leading-[22px] text-[#808191]">
                  The goal has already been reached. If you want to continue the campaign,
                  then click the continue button.
                  </p>
                </div>
                <CustomButton
                  btnType="button"
                  title="Continue"
                  styles="w-full mb-2 bg-[#8c6dfd]"
                  handleClick={handleContinueCampaign}
                />

                <CustomButton
                  btnType="button"
                  title="Stop Campaign"
                  styles="w-full mt-2 bg-[#b00707]"
                  handleClick={ handleStopCampaign }
                />
              </div>
              </div>
              </div>
        ) : (

          <div className="flex-1">
          <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
            <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-white">
              Fund Transfer
            </p>
              <div className="mt-[30px]">
                <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                  <p className="mt-[0px] font-epilogue font-normal leading-[22px] text-[#808191]">
                  Withdrawal is only allowed after the deadline or if the
                    campaign is stopped.
                  </p>
                </div>
                <CustomButton
                  btnType="button"
                  title="Stop Campaign"
                  styles="w-full mt-20px bg-[#b00707]"
                  handleClick={ handleStopCampaign }
                />
              </div>
              </div>
              </div>

        )}      
      </div>
    </div>
  );
};

export default ProfileCampaignDetails;
