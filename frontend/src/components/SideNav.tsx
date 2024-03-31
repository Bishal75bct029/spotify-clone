import React, { useEffect, useState } from 'react'
import { MdHomeFilled } from "react-icons/md";
import { FaSearch } from 'react-icons/fa';
import { MdOutlineLibraryBooks } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa';
import { MdLanguage } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { clientId, clientSecret } from '../constants/constant';
import { FETCH_TOKEN } from '../redux/actionTypes';
import { Link } from 'react-router-dom';

const SideNav: React.FC = () => {
  const [token, SetToken] = useState('');
  const storedToken: string = localStorage.getItem('token') || '';
  const dispatch: Dispatch = useDispatch();

  if (token) {
    SetToken(storedToken)
  }
  useEffect(() => {
    try {
      fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`
      })
        .then(response => {

          if (!response.ok)
            throw new Error("Error");
          return response.json()
        }
        )
        .then(data => {
          dispatch({ type: FETCH_TOKEN, payload: data.access_token })
          // console.log('Access token ', data.access_token);
        });
    }
    catch (e) {
      console.log(e);
    }
  }, [])

  return (
    <nav className='min-h-screen w-[340px] mt-2 fixed top-0 bottom-0 left-0'>
      <div className='flex flex-col gap-[6px]  rounded-xl w-full bg-[#121212] mx-1 py-6 px-5'>
        <div className='flex items-center gap-1 my-2 cursor-pointer'>
          <a href="#">
            <img src="../../spotify.png" alt="noimage" width={25} height={25} />
          </a>
          <p className='flex text-white font-bold text-[16px] '>Spotify</p>
        </div>
          <Link to = "/">
        <div className='flex items-center gap-4 h-10 mb-3'>
            <MdHomeFilled className='text-white text-[30px]' />
            <p className='text-white font-bold text-[17px] mt-[2px]'>Home</p>

        </div>
          </Link>
        <div className='flex gap-4 items-center font-bold ml-1 mb-3 cursor-pointer hover:text-white'>
          <FaSearch className='text-[#A7A7A7] text-[25px]' />
          <p className='text-[#A7A7A7] text-[17px]'>Search</p>
        </div>

      </div>
      <div className='h-[430px] mt-[10px] ml-[5px] w-full pt-[10px] px-5 pb-[30px] bg-[#121212] rounded-xl ' >
        <div className='flex items-center gap-4 px-[10px] mt-3 mb-5'>
          <MdOutlineLibraryBooks className='text-[#A7A7A7] text-[30px]' />
          <p className='text-[#a7a7a7]' >Your Library</p>
          <FaPlus className='text-[#a7a7a7] font-light ml-auto text-[20px]' />
        </div>
        <div className=' bg-[#242424] pt-[5px] pr-[30px] pb-[10px] pl-5 mt-[5px] mb-5 rounded-xl h-[140px] text-white' >
          <p className='text-[14px] font-bold tracking-wider my-[10px]' >Create your  First Playlist</p>
          <p className='text-[12px] tracking-wider mb-1'>It's easy, we will help you</p>
          <button className=' my-[10px] rounded-full bg-white text-black py-[6px] px-5 font-bold text-[14px]' >Create Playlist</button>
        </div>
        <div className='flex flex-wrap mt-9 ml-[10px]'>

          <p className='text-[#a7a7a7] text-[12px] mr-6 mb-[18px]' > Legal</p>
          <p className='text-[#a7a7a7] text-[12px] mr-6 mb-[18px]' > Safety&PrivacyCenter</p>
          <p className='text-[#a7a7a7] text-[12px] mr-6 mb-[18px]' > Cookies</p>
          <p className='text-[#a7a7a7] text-[12px] mr-6 mb-[18px]' > Accessibility</p>
          <p className='text-[#a7a7a7] text-[12px] mr-6 mb-[18px]' > AboutAds</p>
          <p className='text-[#a7a7a7] text-[12px] mr-6 mb-[18px]' > Cookies</p>
          <p className='text-[#a7a7a7] text-[12px] mr-6 '> PrivacyPolicy</p>
        </div>
        <div className='flex gap-5'>
          <button style={{ backgroundColor: 'transparent', color: 'white', padding: '5px 8px', border: '1px solid #878787', fontSize: 14, fontWeight: '700', display: 'flex', alignItems: 'center', gap: 2, marginTop: 30, borderRadius: 15 }}><MdLanguage />English</button>

          <button style={{ backgroundColor: 'transparent', color: 'white', padding: '5px 18px', border: '1px solid #878787', fontSize: 14, fontWeight: '700', display: 'flex', alignItems: 'center', gap: 6, borderRadius: 15, marginTop: 30 }}><MdLanguage />नेपाली</button>
        </div>
      </div>
    </nav>
  )
}

export default SideNav