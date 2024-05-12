
import { useEffect, useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import { useSelector } from 'react-redux';
const PlayMusic = () => {
  const [rerender,setRerender] = useState(0);

  const songUrl = useSelector((store: any) => store.playerState)
  useEffect(()=>{
    if(!songUrl) return;
    const renderFunc = async()=>{
      console.log(rerender)
      if(rerender == 0)
        setRerender(rerender=>rerender+1);
    }
    
    renderFunc();
  },[songUrl])
  console.log(songUrl,"hello");
  return (
    <div className={`sticky bottom-0 ${songUrl.length ? '' : 'hidden'}`}>
      <AudioPlayer
        autoPlay
        src={songUrl}
           className = 'bg-[black]'
          />
    </div>
  )
}

export default PlayMusic;
