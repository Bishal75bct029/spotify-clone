import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { Store } from '../interfaces/Store';
import { getDuration } from '../function';
import { RiDownloadLine } from "react-icons/ri";
import { IoPlaySharp } from "react-icons/io5";
import SkeletonUI from './Loading';
import { OPEN_PLAYER } from '../redux/actionTypes';

import 'react-h5-audio-player/lib/styles.css';




const DetailView: React.FC = () => {
    const { id } = useParams();
    const token = useSelector((store: Store) => store.token);
    const [isLoading,setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const [playlistDetail, setPlaylistDetail] = useState<any[]>([]);
   // const [currentSong, setCurrentSong] = useState("");
    useEffect(() => {
        try {

            const fetchPlayList = async () => {
                const response = await axios.get(`https://saavn.dev/api/playlists`, {
                    params:{
                        id,
                        limit:100
                    }
                });
                // //response.data, "I am the first1")
                const playlists = [];
                const songs = response.data.data.songs.map((track: any) => {
                    return {
                        id: track.id,
                        name: track.name,
                        artists: track?.artists.primary,
                        durations: track?.duration,
                        image: track?.image[2].url,
                        playUrl:track.downloadUrl[4].url
                    }
                })
                const playlistInfo = {
                    description:response.data.data.description,
                    image:response.data.data.image[2].url,


                }
                playlists.push(songs);
                playlists.push(playlistInfo);
                // //playlists, "I am the data")
                setPlaylistDetail(playlists);
                setIsLoading(false);
            }
            fetchPlayList()
        } catch (e) {
            // //e, 'Error in loading playlist');
        }
    }, [token, id])
    // //playlistDetail, "hello thank you");

    const playMusic = (url:any)=>{
        
        dispatch({type:OPEN_PLAYER,payload:url});
    }

    return (
        <>
        {isLoading ? (
            <SkeletonUI/>
            ):
        <div>
           
            <div className='flex gap-4 p-4 h-[280px] bg-gray-900 rounded-xl' >
                {playlistDetail.length > 0 && playlistDetail[1].image && (
                    <>
                        <img src={`${playlistDetail[1].image}`} alt="Not Found" className='w-[250px] h-[250px] rounded-md' />
                        <div className=' capitalize mt-auto mb-auto '>

                            <h1 className='text-white text-[30px] tracking-wider mb-[14px] font-bold'>{playlistDetail[1].description}</h1>
                            <div className='flex gap-4 items-center text-[14px]'>
                            <IoPlaySharp className='font-bolder text-[30px] text-green-500'/>
                                <p className='text-[#a7a7a7] '>Spotify</p>                                
                              <p className='text-[#a7a7a7]'>2024</p>
                                <p className='text-[#a7a7a7]'>{playlistDetail[0].length} songs</p>
                            </div>

                        </div>

                    </>
                )}
            </div>
            

            <div className='mt-8 ml-4 cursor-pointer' >
                {playlistDetail[0].map((song: any) => {
                    return (
                        <div key={song.id} className='flex mb-3 items-center hover:bg-[#1e1e1e]'onClick={()=>playMusic(song.playUrl)}>
                            <img src={`${song.image}`} alt="Not Found" className='h-20 w-20 rounded-sm' />
                            <div className='m-4'>
                            <p className='text-[#a7a7a7]  text-[14px]'>{
                                song.name ? song.name.replace(/&quot;/g,'"'):''
                            }</p>
                            <div className='flex gap-2'>
                                {
                                    song.artists?.map((artist: any, index: number) => {
                                        return (
                                            <div className='text-[#a7a7a7] '>
                                                <p key={index} className='text-[12px]'>{artist.name}</p>
                                                
                                            </div>
                                        )
                                    })
                                }
                                </div>
                            </div>
                            <div className='text-[#a7a7a7] text-[12px] ml-auto'>
                                {getDuration(song.durations)}</div>
                                <div className='text-[#a7a7a7] mx-10 '><RiDownloadLine /></div>
                        </div>
                    )
                })}
            </div>
        </div>
   }   </>
    )
}

export default DetailView