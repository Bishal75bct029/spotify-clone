import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../interfaces/Store';
// import { featuredPlaylistAction } from '../redux/actions/featuredPlaylist';
import Albums from './Albums';
import { FETCH_FEATURED_PLAYLIST } from '../redux/actionTypes';
const Home: React.FC = () => {
    const token = useSelector((store: Store) => store.token);
    const playlists = useSelector((store: Store) => store.featuredPlaylist);
    const dispatch = useDispatch();
    interface featuredPlaylisting {
        images: { url: string }[], name: '', description: ''
    };
    useEffect(() => {
        const featuredPlaylist = async () => {
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
                dispatch({ type: FETCH_FEATURED_PLAYLIST, payload: payload });
                console.log(payload, "mareu");
                console.log(response.data.playlists.items, 'hehe')
            } catch (e) {
                console.log(e);
            }
        }
        if (token) {
            featuredPlaylist();
        }
    }, [token])
    console.log(playlists, "hey man")
    return (
        <div>
            <p className='text-white font-bold text-[20px] my-8'>Recommendation For You</p>
            <div className='flex flex-wrap justify-between w-full  truncate gap-3'>
                {

                    Array.isArray(playlists) && playlists?.map((playlist) => {
                        console.log(playlists, 'why man')
                        return (
                            <Albums image={playlist.image} description={playlist.description} title={playlist.title} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home