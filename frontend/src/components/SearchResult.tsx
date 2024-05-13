import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Store } from '../interfaces/Store';
import { OPEN_PLAYER } from '../redux/actionTypes';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SearchResult: React.FC = () => {
    const dispatch = useDispatch();
    const searchData = useSelector((store: Store) => store.searchResult);
    const playMusic = async(url:string)=>{
        const music = await axios.get('http://saavn.dev/api/songs',
            {
                params:{
                    link:url
                }
            }
        )
            console.log(music)
        dispatch({type:OPEN_PLAYER,payload:music.data.data[0].downloadUrl[2].url})
    }
    console.log(searchData)
    return (
        <div>
            <p className='text-white text-[20px] font-bold my-3'>Top Results</p>
            <div className='flex'>
                {

                    searchData.artists.map((artist: any, index: number) => {
                        return (
                            <div key={index} className='w-[200px] flex flex-col items-center justify-center' >
                                <img src={artist.image} className='rounded-full w-[120px] h-[120px]' alt="Error" />
                                <p className='text-white mt-3 text-[16px] text-center overflow-ellipsis'>{artist.title}</p>
                                <p className='text-[#a7a7a7] text-[14px] text-center'>Artist</p>
                            </div>

                        )
                    })
                }
            </div>

            <p className='text-white text-[20px] mt-10 mb-5'>Songs</p>
            <div>

                {
                    searchData.tracks.map((track: any, index: number) => {
                        return (
                            <div key={index} className='hover:bg-[#1e1e1e] duration-300 active:bg-[#2e2e2e] cursor-pointer flex items-center gap-8 mb-5' onClick={()=>playMusic(track.url)}>
                                <img src={track.image} className='rounded-md w-20 h-20' alt="No Image Found" />
                                <div>
                                    <p className='text-white '>{track.title}</p>

                                    <div className='flex gap-2'>
                                        {track.artists.map((artist: any, index: number) => {
                                            return (

                                                <p key={index} className='text-[#a7a7a7] text-[12px]'>{artist}</p>
                                            )
                                        })}

                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                <p className='mt-10 mb-5 text-[20px] text-white'>Albums</p>
                <div className='flex gap-10'>
                    {
                        searchData.albums.map((album:any,index:any)=>{
                            return(
                                <div key={index} className='w-32 hover:translate-y-[-12px] duration-300 cursor-pointer'>
                                    <img src={album.image} className='w-32 h-32 rounded-md ' alt="Not Found" />
                                    <p className='text-white   mt-2 ml-2 line-clamp-2 text-[16px]'>{album.title}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <p className='mt-10 mb-5 text-[20px] text-white'>Playlists</p>
                <div className='flex gap-10'>
                    {
                        searchData.playlists.map((playlist:any,index:any)=>{
                            return(
                                <Link to={`/playlist/${playlist.id}`}>
                                <div key={index} className='w-32 hover:translate-y-[-12px] duration-300'>
                                    <img src={playlist.image} className='w-32 h-32 rounded-md ' alt="Not Found" />
                                    <p className='text-white   mt-2 ml-2 line-clamp-2 text-[16px]'>{playlist.title}</p>
                                </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>

        </div>
    )
}

export default SearchResult