import React from 'react';
import { useSelector } from 'react-redux';
import { Store } from '../interfaces/Store';

const Albums: React.FC<{ image: string; title: string; description: string }> = ({ image, title, description }) => {
  const featuredPlaylists = useSelector((store:Store)=>store.featuredPlaylist)
  console.log(featuredPlaylists,"hehe");
  return (
    <div className='h-[250px] w-[200px] rounded-sm bg-transparent'>
      <img src={image} alt="Not Found" className='w-40 h-40 rounded-md' />
      <p className='truncate text-white mt-2'>{title}</p>
      <p className='truncate text-[#a2a2a2] break-all text-sm line'>{description}</p>
    </div>
  );
};

export default Albums;
