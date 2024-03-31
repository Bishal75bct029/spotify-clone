import React from 'react'
import { useSelector } from 'react-redux'
import { Store } from '../interfaces/Store';

const SearchResult: React.FC = () => {
    const searchData = useSelector((store: Store) => store.searchResult);
    return (
        <div>

            <p className='text-white text-[20px] font-bold my-3'>Top Results</p>
            <div className='flex gap-10'>
                {

                    searchData.artists.map((artist: any, index: number) => {
                        return (
                            <div key={index} >
                                <img src={artist.image} className='rounded-full w-[150px] h-[150px]' alt="Error" />
                                <p className='text-white mt-3 text-[16px] text-center'>{artist.title}</p>
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
                            <div key={index} className='flex items-center gap-8 mb-5'>
                                <img src={track.image} className='rounded-md w-20 h-20' alt="No Image Found" />
                                <div>
                                    <p className='text-white'>{track.title}</p>

                                    <div className='flex gap-2'>
                                        {track.artists.map((artist: any, index: number) => {
                                            return (

                                                <p key={index} className='text-[#a7a7a7] text-[12px]'>{artist.name}</p>
                                            )
                                        })}

                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                <p className='mt-10 mb-5 text-[20px] text-white'>Albums</p>
                <div className='flex gap-4'>
                    {
                        searchData.albums.map((album:any,index:any)=>{
                            return(
                                <div key={index} className='w-32'>
                                    <img src={album.image} className='w-32 h-32 rounded-md ' alt="Not Found" />
                                    <p className='text-white   mt-2 ml-2 line-clamp-2 text-[16px]'>{album.title}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <p className='mt-10 mb-5 text-[20px] text-white'>Playlists</p>
                <div className='flex gap-4'>
                    {
                        searchData.playlists.map((playlist:any,index:any)=>{
                            return(
                                <div key={index} className='w-32'>
                                    <img src={playlist.image} className='w-32 h-32 rounded-md ' alt="Not Found" />
                                    <p className='text-white   mt-2 ml-2 line-clamp-2 text-[16px]'>{playlist.title}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        </div>
    )
}

export default SearchResult