import React from 'react';
import SideNav from '../components/SideNav';
import Body from '../components/Body';

const HomePage = () => {
  return (
    <div className="flex justify-between gap-4 relative">
      <div>
        <SideNav />
      </div>
      <div className=" min-h-full w-full bg-[#121212] ml-[345px] mt-2 rounded-xl custom-scrollbar h-auto relative-container relative z-0">
        <div></div>
        <Body />
      </div>
    </div>
  );
};

export default HomePage;
