import React from 'react'
import { MdHomeFilled } from "react-icons/md";
import { FaSearch } from 'react-icons/fa';
import { MdOutlineLibraryBooks } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa';
import { MdLanguage } from 'react-icons/md';

const SideNav: React.FC = () => {
  return (
    <nav style={{ width: 300, minHeight: '100vh' }}>
      <div className='navbar' style={{ width: '100%', backgroundColor: '#121212', display: 'flex', flexDirection: 'column', gap: '5px', padding: '25px 20px', margin: '0 4px', borderRadius: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', height: 40, gap: 4 }}>
          <a href="#">
            <img src="../../spotify.png" alt="noimage" width={25} height={25} />
          </a>
          <p style={{ color: 'white', fontSize: 16, fontWeight: 700 }}>Spotify</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', height: 40 }}>
          <MdHomeFilled style={{ color: 'white', fontSize: 30 }} />
          <p style={{ color: 'white', fontSize: 17, fontWeight: 700 }}>Home</p>

        </div>
        <div style={{ display: 'flex', gap: 15, alignItems: 'center', fontWeight: 700, marginLeft: 5 }}>
          <FaSearch style={{ color: '#A7A7A7', fontSize: 25 }} />
          <p style={{ color: '#A7A7A7', fontSize: 17 }}>Search</p>
        </div>

      </div>
      <div style={{ height:400,margin: '10px 0 0 5px', width: '100%', padding: '10px 20px 30px 20px', backgroundColor: '#121212', borderRadius: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 15,padding:'0 10px' }}>
          <MdOutlineLibraryBooks style={{ color: '#A7A7A7', fontSize: 30 }} />
          <p style={{ color: '#A7A7A7' }}>Your Library</p>
          <FaPlus style={{ color: '#a7a7a7', fontSize: 20, marginLeft: 'auto', fontWeight: '300' }} />
        </div>
        <div style={{ backgroundColor: '#242424', padding: '5px 30px 10px 20px', margin: '5px 0px 20px 0px', borderRadius: '10px', color: 'white',height:120 }}>
          <p style={{ fontSize: '14px',letterSpacing:1, fontWeight: '700',padding:0 }}>Create your  First Playlist</p>
          <p style={{ fontSize: '12px',letterSpacing:1 }}>It's easy, we will help you</p>
          <button style={{borderRadius:20,padding:'10px 20px',border:'none',fontWeight:'700'}}>Create Playlist</button>
        </div>
        <div style={{display:'flex',flexWrap:'wrap',margin:'40px 0 0px 10px'}}>

        <p style={{color:'#A7A7A7',fontSize:12,margin:' 0px 25px 20px 0'}}> Legal</p>
        <p style={{color:'#A7A7A7',fontSize:12,margin:'0 25px 0 0'}}> Safety&PrivacyCenter</p>
        <p style={{color:'#A7A7A7',fontSize:12,margin:'0 25px 0 0'}}> Cookies</p>
        <p style={{color:'#A7A7A7',fontSize:12,margin:'0 25px 0 0'}}> Accessibility</p>
        <p style={{color:'#A7A7A7',fontSize:12,margin:'0 25px 0 0'}}> AboutAds</p>
        <p style={{color:'#A7A7A7',fontSize:12,margin:'0 25px 20px 0px'}}> Cookies</p>
        <p style={{color:'#A7A7A7',fontSize:12,margin:'0'}}> PrivacyPolicy</p>
        </div>
        <div style={{display:'flex',gap:20}}>
        <button style={{backgroundColor:'transparent',color:'white',padding:'5px 8px',border:'1px solid #878787',fontSize:14,fontWeight:'700',display:'flex',alignItems:'center',gap:2,marginTop:40,borderRadius:15}}><MdLanguage/>English</button>

        <button style={{backgroundColor:'transparent',color:'white',padding:'5px 18px',border:'1px solid #878787',fontSize:14,fontWeight:'700',display:'flex',alignItems:'center',gap:6,borderRadius:15,marginTop:40}}><MdLanguage/>नेपाली</button>
        </div>
      </div>
    </nav>
  )
}

export default SideNav