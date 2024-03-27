import React from 'react'
import { MdHomeFilled } from "react-icons/md";


const SideNav: React.FC = () => {
  return (
    <nav className='navbar' style={{ backgroundColor: '#121212', width: 300, minHeight: '100vh',padding:'25px 20px',display:'flex',flexDirection:'column',gap:'5px' }}>
      <div style={{display:'flex',alignItems:'center',height:40}}>
        <a href="#">
          <img src="../../navlogo.png" alt="noimage" width={40} height={40} />
        </a>
          <p style={{color:'white',fontSize:16,fontWeight:600}}>Spotify</p>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:'15px',height:40}}>
      <MdHomeFilled style={{color:'white',fontSize:30}}/>
        <p style={{color:'white',fontSize:18,fontWeight:700}}>Home</p>

      </div>

    </nav>
  )
}

export default SideNav