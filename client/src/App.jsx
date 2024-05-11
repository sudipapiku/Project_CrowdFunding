import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Sidebar, Navbar, Footer } from './components';
import { CampaignDetails, CreateCampaign, Home, Profile, ProfileCampaignDetails, WithdrawalCampaignDetails } from './pages';
import Withdrawal from './pages/Withdrawal';
import CustomChatbot from './CustomChatBot';

const App = () => {
  return (
    <div>
      <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
        <div className="sm:flex hidden mr-10 relative">
          <Sidebar />
        </div>

        <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path='/withdrawal' element={<Withdrawal />} />
            <Route path="/create-campaign" element={<CreateCampaign />} />
            <Route path="/campaign-details/:id" element={<CampaignDetails />} />
            <Route path='/profile-campaign-details/:id' element={<ProfileCampaignDetails />} />
            <Route path='/withdrawal-campaign-details/:id' element={<WithdrawalCampaignDetails />} />
          </Routes>

          <div className="fixed bottom-4 right-4">
            <CustomChatbot  />
          </div>
        </div>
      </div>

      <div className='relative sm:-8 p-4 bg-[#13131a] text-[19px] flex flex-row justify-center'>
        <Footer />
      </div>
    </div>
  )
}

export default App;
