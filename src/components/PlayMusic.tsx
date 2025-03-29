import AudioPlayer from 'react-h5-audio-player';
import { useSelector } from 'react-redux';
const PlayMusic = () => {
  const songUrl = useSelector((store: any) => store.playerState);

  return (
    <div className={`sticky bottom-0 ${songUrl.length ? '' : 'hidden'}`}>
      <AudioPlayer autoPlay src={songUrl} className="bg-[black]" />
    </div>
  );
};

export default PlayMusic;
