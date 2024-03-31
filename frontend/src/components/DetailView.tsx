import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { Store } from '../interfaces/Store';
import { getDuration } from '../function';
import { RiDownloadLine } from "react-icons/ri";
import { IoPlaySharp } from "react-icons/io5";
import SkeletonUI from './Loading';

interface PlaylistDetail {
    id: string;
    name: string;
    artists: any[];
    durations: number;
    image?: string;
}

const DetailView: React.FC = () => {
    const { id } = useParams();
    const token = useSelector((store: Store) => store.token);
    const [isLoading,setIsLoading] = useState(true);
    const [playlistDetail, setPlaylistDetail] = useState<PlaylistDetail[]>([]);
    useEffect(() => {
        try {

            const fetchPlayList = async () => {
                const response = await axios.get(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log(response.data, "I am the first1")
                const data = response.data.items.map((track: any) => {
                    return {
                        id: track.track.id,
                        name: track.track.name,
                        artists: track.track.artists,
                        durations: track.track.duration_ms,
                        image: track.track.album.images[0].url
                    }
                })
                console.log(data, "I am the data")
                setPlaylistDetail(data);
                setIsLoading(false);


            }
            if (token) {
                fetchPlayList();
            }
        } catch (e) {
            console.log(e, 'Error in loading playlist');
        }
    }, [token, id])
    console.log(playlistDetail, "hello thank you")

    return (
        <>
        {isLoading ? (
            <SkeletonUI/>
            ):
        <div>
            <div className='flex gap-4 p-4 h-[280px] bg-gray-900 rounded-xl' >
                {playlistDetail.length > 0 && playlistDetail[0].image && (
                    <>
                        <img src={`${playlistDetail[0].image}`} alt="Not Found" className='w-[250px] h-[250px] rounded-md' />
                        <div className='h-8 mt-auto mb-12 '>

                            <h1 className='text-white text-[30px] tracking-wider font-extrabold'>{playlistDetail[0].name}</h1>
                            <div className='flex gap-4 items-center text-[14px]'>
                            <IoPlaySharp className='font-bolder text-[30px] text-green-500'/>
                                <p className='text-[#a7a7a7] '>Spotify</p>                                
                              <p className='text-[#a7a7a7]'>2024</p>
                                <p className='text-[#a7a7a7]'>{playlistDetail.length} songs</p>
                            </div>

                        </div>

                    </>
                )}
            </div>
            <div className='mt-8 ml-4 cursor-pointer'>
                {playlistDetail.map((song: any) => {
                    return (
                        <div key={song.id} className='flex mb-3 items-center'>
                            <img src={`${song.image}`} alt="Not Found" className='h-20 w-20 rounded-sm' />
                            <div className='m-4'>

                            <p className='text-[#a7a7a7]  text-[14px]'>{song.name}</p>
                            <div className='flex gap-2'>
                                {
                                    song.artists.map((artist: any, index: number) => {
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