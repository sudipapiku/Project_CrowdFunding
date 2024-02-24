import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // Update the current year every minute to handle the case where the year changes while the user is on the page
    const intervalId = setInterval(() => {
      setCurrentYear(new Date().getFullYear());
    }, 60000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <footer className="flex-1 h-16 pd-4 pt-5 bg-[#1c1c24] rounded-[20px] text-[#bac2d6] font-epilogue font-normal text-[16px] flex justify-center  ">
        <div>
        <p className="font-epilogue font-normal text-[19px]"> 
        <Link to='/'> CrowdFunding </Link>   | &copy; {currentYear} All rights reserved </p>
        </div>
    </footer>
  );
};

export default Footer;
