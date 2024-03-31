import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../interfaces/Store';
// import { featuredPlaylistAction } from '../redux/actions/featuredPlaylist';
import "react-multi-carousel/lib/styles.css";
import Albums from './Albums';
import { FETCH_BHAJAN_SONGS, FETCH_ENGLISH_SONGS, FETCH_FEATURED_PLAYLIST, FETCH_HINDI_SONGS, FETCH_NEW_RELEASE } from '../redux/actionTypes';
import Carousel from 'react-multi-carousel';
import { responsive } from '../constants/carousel';

const Home: React.FC = () => {
    const token = useSelector((store: Store) => store.token);
    const playlists = useSelector((store: Store) => store.featuredPlaylist.featuredPlaylists);
    const newReleases = useSelector((store: Store) => store.featuredPlaylist.newReleases);
    const englishSongs = useSelector((store: Store) => store.featuredPlaylist.englishPlaylists);
    const hindiSongs = useSelector((store: Store) => store.featuredPlaylist.hindiSongs);
    const bhajanSongs = useSelector((store: Store) => store.featuredPlaylist.bhajanSongs);
    const dispatch = useDispatch();
    interface featuredPlaylisting {
        images: { url: string }[], name: '', description: ''
    };
    useEffect(() => {
        const browseHome = async () => {
            try {
                const response = await axios.get('https://api.spotify.com/v1/browse/featured-playlists', {
                    headers: {
                        'Authorization': `Bearer ${token}` // Replace with your actual access token
                    }
                });

                const data = response.data.playlists.items;
                const payload = data?.map(({ description, images, name }: featuredPlaylisting) => {
                    return {
                        image: images[0]?.url,
                        title: name,
                        description: description
                    }
                });
                const newReleaseResponse = await axios.get('https://api.spotify.com/v1/browse/new-releases', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const searchResponse = await axios.get('https://api.spotify.com/v1/search', {
                    params: {
                        q: 'English',
                        type: 'playlist'
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const bhajanSearchResponse = await axios.get('https://api.spotify.com/v1/search', {
                    params: {
                        q: 'Bhajan',
                        type: 'playlist'
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const hindiSearchResponse = await axios.get('https://api.spotify.com/v1/search', {
                    params: {
                        q: 'Hindi',
                        type: 'playlist'
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const newReleasesData = newReleaseResponse.data.albums.items.map((item: any) => ({
                    name: item.name,
                    artists: item.artists.map((artist: any) => artist.name).join(', '),
                    image: item.images[0].url,
                    releaseDate: item.release_date
                }));
                console.log(newReleaseResponse, 'are')

                const englishPlaylists = searchResponse.data.playlists.items;
                const bhajanPlaylists = bhajanSearchResponse.data.playlists.items;
                const hindiPlaylists = hindiSearchResponse.data.playlists.items;
                console.log(englishPlaylists, 'okay')
                const englishPlayMusic = englishPlaylists.map((playlist: any) => {
                    return {
                        title: playlist.name,
                        image: playlist.images[0].url,
                        description: ''
                    }
                });
                const bhajanPlayMusic = bhajanPlaylists.map((playlist: any) => {
                    return {
                        title: playlist.name,
                        image: playlist.images[0].url,
                        description: ''
                    }
                });
                const HindiPlaymusic = hindiPlaylists.map((playlist: any) => {
                    return {
                        title: playlist.name,
                        image: playlist.images[0].url,
                        description: ''
                    }
                });
                dispatch({ type: FETCH_FEATURED_PLAYLIST, payload: payload });
                dispatch({ type: FETCH_NEW_RELEASE, payload: newReleasesData });
                dispatch({type:FETCH_ENGLISH_SONGS,payload:englishPlayMusic});
                dispatch({type:FETCH_BHAJAN_SONGS,payload:bhajanPlayMusic});
                dispatch({type:FETCH_HINDI_SONGS,payload:HindiPlaymusic});


            } catch (e) {
                console.log(e);
            }
        }
        if (token) {
            browseHome();
        }
    }, [token])
    console.log(englishSongs, 'shaktimaan')
    return (
        <div className='w-full'>
            <p className='text-white font-bold text-[24px] mt-8'>Trending</p>
            <div className='flex flex-wrap justify-between mt-[-30px] gap-8 carousel-container relative'>
                <Carousel
                    swipeable={true}
                    draggable={false}
                    focusOnSelect={true}
                    responsive={responsive}
                    ssr={true} // means to render carousel on server-side.
                    keyBoardControl={true}
                    customTransition="all 1"
                    transitionDuration={500}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
                    itemClass="carousel-item-padding-40-px "
                    className=' h-[240px] w-full absolute left-0 top-10 overflow-x-scroll'

                >
                    {

                        Array.isArray(playlists) && playlists?.map((playlist) => {
                            // console.log(playlists, 'why man')
                            return (
                                <Albums image={playlist.image} description={playlist.description} title={playlist.title} />
                            )
                        })
                    }
                </Carousel>
            </div>

            <div className='flex flex-wrap justify-between mt-[-10px] gap-8 carousel-container relative'>
                <p className='text-white font-bold text-[24px] mt-8 top-[260px] absolute'>New Releases</p>
                <Carousel
                    swipeable={true}
                    draggable={false}

                    responsive={responsive}
                    ssr={true} // means to render carousel on server-side.
                    keyBoardControl={true}

                    transitionDuration={500}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
                    itemClass="carousel-item-padding-40-px "
                    className=' h-[240px] w-full absolute left-0 top-[330px] overflow-x-scroll'
                >
                    {
                        Array.isArray(newReleases) && newReleases?.map((release: any) => {

                            return (
                                <Albums image={release.image} description={release.artist} title={release.name} />
                            )
                        })
                    }
                </Carousel>
            </div>
            <div className='flex flex-wrap justify-between mt-[-10px] gap-8 carousel-container relative'>
                <p className='text-white font-bold text-[24px] mt-8 top-[540px] absolute'>English Playlists</p>
                <Carousel
                    swipeable={true}
                    draggable={false}

                    responsive={responsive}
                    ssr={true} // means to render carousel on server-side.
                    keyBoardControl={true}

                    transitionDuration={500}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
                    itemClass="carousel-item-padding-40-px "
                    className=' h-[240px] w-full absolute left-0 top-[620px] overflow-x-scroll'
                >
                    {
                        Array.isArray(englishSongs) && englishSongs?.map((release: any) => {

                            return (
                                <Albums image={release.image} description={release.description} title={release.title} />
                            )
                        })
                    }
                </Carousel>
            </div>
            <div className='flex flex-wrap justify-between mt-[-10px] gap-8 carousel-container relative'>
                <p className='text-white font-bold text-[24px] mt-8 top-[1080px] absolute'>Hindi Playlists</p>
                <Carousel
                    swipeable={true}
                    draggable={false}

                    responsive={responsive}
                    ssr={true} // means to render carousel on server-side.
                    keyBoardControl={true}

                    transitionDuration={500}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
                    itemClass="carousel-item-padding-40-px "
                    className=' h-[240px] w-full absolute left-0 top-[1160px] overflow-x-scroll'
                >
                    {
                        Array.isArray(hindiSongs) && hindiSongs?.map((release: any) => {

                            return (
                                <Albums image={release.image} description={release.description} title={release.title} />
                            )
                        })
                    }
                </Carousel>
            </div>
            <div className='flex flex-wrap justify-between mt-[-10px] gap-8 carousel-container relative'>
                <p className='text-white font-bold text-[24px] mt-8 top-[840px] absolute'>Bhajan Playlists</p>
                <Carousel
                    swipeable={true}
                    draggable={false}

                    responsive={responsive}
                    ssr={true} // means to render carousel on server-side.
                    keyBoardControl={true}

                    transitionDuration={500}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
                    itemClass="carousel-item-padding-40-px "
                    className=' h-[240px] w-full absolute left-0 top-[920px] overflow-x-scroll'
                >
                    {
                        Array.isArray(bhajanSongs) && bhajanSongs?.map((release: any) => {

                            return (
                                <Albums image={release.image} description={release.description} title={release.title} />
                            )
                        })
                    }
                </Carousel>
            </div>
        </div>
    )
}

export default Home