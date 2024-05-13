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
        image: { url: string }[], name: '', id: ''
    };

    useEffect(() => {
        const browseHome = async () => {
            try {
                // //playlists);
                if (playlists?.length > 0) {
                    setIsLoading(false);
                    return;
                } else {
                    // //"bairi pii")
                }
                const response = await axios.get('https://saavn.dev/api/search/playlists', {
                    params: {
                        query: "trending",
                        page: 0,
                        limit: 10
                    }
                });


                const data = response.data.data.results;
                // //data,"are")
                const payload = data?.map(({ image, name, id }: featuredPlaylisting) => {
                    return {
                        id: id,
                        image: image[2]?.url,
                        title: name,

                    }
                });

                const newReleaseResponse = await axios.get('https://saavn.dev/api/search/playlists', {
                    params: {
                        query: "new",
                        page: 0,
                        limit: 10
                    }
                });
                const searchResponse = await axios.get('https://saavn.dev/api/search/playlists', {
                    params: {
                        query: "English",
                        page: 0,
                        limit: 10
                    }
                });
                const bhajanSearchResponse = await axios.get('https://saavn.dev/api/search/playlists', {
                    params: {
                        query: "Bhajan",
                        page: 0,
                        limit: 10
                    }
                });
                const hindiSearchResponse = await axios.get('https://saavn.dev/api/search/playlists', {
                    params: {
                        query: "Hindi",
                        page: 0,
                        limit: 10
                    }
                });

                const newReleasesData = newReleaseResponse.data.data.results.map((item: any) => ({
                    id: item.id,
                    title: item.name,
                    image: item.image[2].url,
                }));
                //newReleasesData, "checking")

                const englishPlaylists = searchResponse.data.data.results;
                const bhajanPlaylists = bhajanSearchResponse.data.data.results;
                const hindiPlaylists = hindiSearchResponse.data.data.results;

                const englishPlayMusic = englishPlaylists.map((playlist: any) => {
                    return {
                        id: playlist.id,
                        title: playlist.name,
                        image: playlist.image[2].url,
                    }
                });
                const bhajanPlayMusic = bhajanPlaylists.map((playlist: any) => {
                    return {
                        id: playlist.id,
                        title: playlist.name,
                        image: playlist.image[2].url,

                    }
                });
                const HindiPlaymusic = hindiPlaylists.map((playlist: any) => {
                    return {
                        id: playlist.id,
                        title: playlist.name,
                        image: playlist.image[2].url,

                    }
                });
                setIsLoading(false);
                dispatch({ type: FETCH_FEATURED_PLAYLIST, payload: payload });
                dispatch({ type: FETCH_NEW_RELEASE, payload: newReleasesData });
                dispatch({ type: FETCH_ENGLISH_SONGS, payload: englishPlayMusic });
                dispatch({ type: FETCH_BHAJAN_SONGS, payload: bhajanPlayMusic });
                dispatch({ type: FETCH_HINDI_SONGS, payload: HindiPlaymusic });


            } catch (e) {
                //e);
            }
        }
        if (token) {
            browseHome();
        }
    }, [token]);
    //token, "token")

    return (
        <div className='w-full h-[1324px]'>
            {
                isLoading ? <SkeletonUI /> :
                    <>
                        <p className='text-white font-bold text-[24px] mt-8'>Trending</p>
                        <div className='flex flex-wrap justify-between mt-[-30px] gap-8 carousel-container relative '>
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
                                className=' h-[240px] w-full absolute left-0 top-10 overflow-x-scroll '

                            >
                                {

                                    Array.isArray(playlists) && playlists?.map((playlist) => {
                                        // //playlists, 'why man')
                                        return (
                                            <div key={playlist.id}className='hover:translate-y-[-8px] duration-300'>
                                                <Link to={`/playlist/${playlist.id}`}>
                                                    <Albums image={playlist.image} title={playlist.title} />
                                                </Link>
                                            </div>
                                        )
                                    })
                                }
                            </Carousel>
                        </div>

                        <div className='flex flex-wrap justify-between mt-[-20px] gap-8 carousel-container relative'>
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
                                className=' h-[240px] w-full absolute left-0 top-[330px] overflow-x-scroll '
                            >
                                {
                                    Array.isArray(newReleases) && newReleases?.map((release: any) => {

                                        return (
                                            <div key={release.id} className='hover:translate-y-[-8px] duration-300'>
                                                <Link to={`/playlist/${release.id}`}>
                                                    <Albums image={release.image} title={release.title} />
                                                </Link>
                                            </div>
                                        )
                                    })
                                }
                            </Carousel>
                        </div>
                        <div className='flex flex-wrap justify-between mt-[-10px] gap-8 carousel-container relative '>
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
                                            <div key={release.id} className='hover:translate-y-[-8px] duration-300'>
                                                <Link to={`/playlist/${release.id}`}>

                                                    <Albums image={release.image} title={release.title} />
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
                                            <div key={release.id} className='hover:translate-y-[-8px] duration-300'>
                                                <Link to={`/playlist/${release.id}`}>

                                                    <Albums image={release.image} title={release.title} />
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
                                ssr={true}
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
                                            <div key={release.id} className='hover:translate-y-[-8px] duration-300'>
                                                <Link to={`/playlist/${release.id}`}>
                                                    <Albums image={release.image} title={release.title} />
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