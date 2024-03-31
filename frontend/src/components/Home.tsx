import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../interfaces/Store';
// import { featuredPlaylistAction } from '../redux/actions/featuredPlaylist';
import "react-multi-carousel/lib/styles.css";
import Albums from './Albums';
import { FETCH_BHAJAN_SONGS, FETCH_ENGLISH_SONGS, FETCH_FEATURED_PLAYLIST, FETCH_HINDI_SONGS, FETCH_NEW_RELEASE } from '../redux/actionTypes';
import Carousel from 'react-multi-carousel';
import { responsive } from '../constants/carousel';
import { Link } from 'react-router-dom';
import SkeletonUI from './Loading';

const Home: React.FC = () => {
    const token = useSelector((store: Store) => store.token);
    const playlists = useSelector((store: Store) => store.featuredPlaylist.featuredPlaylists);
    const newReleases = useSelector((store: Store) => store.featuredPlaylist.newReleases);
    const englishSongs = useSelector((store: Store) => store.featuredPlaylist.englishPlaylists);
    const hindiSongs = useSelector((store: Store) => store.featuredPlaylist.hindiSongs);
    const bhajanSongs = useSelector((store: Store) => store.featuredPlaylist.bhajanSongs);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    interface featuredPlaylisting {
        images: { url: string }[], name: '', description: '',id:''
    };
    useEffect(() => {
        const browseHome = async () => {
            try {
                const response = await axios.get('https://api.spotify.com/v1/browse/featured-playlists', {
                    headers: {
                        'Authorization': `Bearer ${token}` // Replace with your actual access token
                    }
                });
                const first = await axios.get(`https://api.spotify.com/v1/playlists/37i9dQZF1DWTwzVdyRpXm1/tracks`, {
                    headers: {
                      'Authorization': `Bearer ${token}` 
                    }
                  });
                  console.log(first,"I am the first")
                const data = response.data.playlists.items;
                console.log(data,"are")
                const payload = data?.map(({ description, images, name,id }: featuredPlaylisting) => {
                    return {
                        id: id,
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
                    id:item.id,
                    name: item.name,
                    artists: item.artists.map((artist: any) => artist.name).join(', '),
                    image: item.images[0].url,
                    releaseDate: item.release_date
                }));
                // console.log(payload, 'are')

                const englishPlaylists = searchResponse.data.playlists.items;
                const bhajanPlaylists = bhajanSearchResponse.data.playlists.items;
                const hindiPlaylists = hindiSearchResponse.data.playlists.items;
                console.log(englishPlaylists, 'okay')
                const englishPlayMusic = englishPlaylists.map((playlist: any) => {
                    return {
                        id:playlist.id,
                        title: playlist.name,
                        image: playlist.images[0].url,
                        description: ''
                    }
                });
                const bhajanPlayMusic = bhajanPlaylists.map((playlist: any) => {
                    return {
                        id:playlist.id,
                        title: playlist.name,
                        image: playlist.images[0].url,
                        description: ''
                    }
                });
                const HindiPlaymusic = hindiPlaylists.map((playlist: any) => {
                    return {
                        id:playlist.id,
                        title: playlist.name,
                        image: playlist.images[0].url,
                        description: ''
                    }
                });
                setIsLoading(false);
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
            {
                isLoading ?<SkeletonUI/>:
                <>
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
                                <div key={playlist.id}>
                                    <Link to ={`/playlist/${playlist.id}`}>
                                <Albums image={playlist.image} description={playlist.description} title={playlist.title} />
                                    </Link>
                                </div>
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
                                <div key={release.id}>
                                    <Link to={`/playlist/${release.id}`}>
                                <Albums image={release.image} description={release.artist} title={release.name} />
                                    </Link>
                                </div>
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
                                <div key={release.id}>
                                    <Link to={`/playlist/${release.id}`}>

                                <Albums image={release.image} description={release.description} title={release.title} />
                                    </Link>
                                </div>

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
                                <div key={release.id}>
                                    <Link to={`/playlist/${release.id}`}>

                                <Albums image={release.image} description={release.description} title={release.title} />
                                    </Link>
                                    </div>
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
                                <div key={release.id}>
                                    <Link to={`/playlist/${release.id}`}>

                                <Albums image={release.image} description={release.description} title={release.title} />
                                    </Link>
                                </div>
                            )
                        })
                    }
                </Carousel>
            </div>
            </>
            }
        </div>

    )
}

export default Home