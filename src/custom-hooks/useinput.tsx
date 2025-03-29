import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { Store } from '../interfaces/Store';
import { UserInput } from '../interfaces/UserInput';
import { SEARCH_RESULTS } from '../redux/actionTypes';
import { BASE_API } from '../constants/constant';

const useInput = (initialValue: any): UserInput => {
  const dispatch = useDispatch();
  const token = useSelector((store: Store) => store.token);

  const [value, setValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(value);

  // Debouncing the input value
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, 600); // 600ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  // Fetch data when the debounced value changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // If debounced value is empty, clear the results
        if (!debouncedValue) {
          dispatch({ type: SEARCH_RESULTS, payload: { artists: [], tracks: [], albums: [], playlists: [] } });
          return;
        }

        // API call to fetch search results
        const response = await axios.get(`${BASE_API}/search`, {
          params: {
            query: debouncedValue,
          },
        });

        const searchResult = response.data;

        const albums = searchResult.data.albums?.results?.map((album: any) => ({
          id: album.id,
          title: album.description,
          image: album.image[2].url,
        }));

        const artists = searchResult.data.artists.results.map((artist: any) => ({
          id: artist.id,
          title: artist.title,
          image: artist.image[2].url,
        }));

        const playlists = searchResult.data.playlists.results.map((playlist: any) => ({
          id: playlist.id,
          title: playlist.title,
          image: playlist.image[2].url,
          description: playlist.description,
        }));

        const tracks = searchResult.data.songs.results.map((track: any) => ({
          id: track.id,
          title: track.title,
          image: track.image[2].url,
          artists: track.primaryArtists?.includes(',') ? track.primaryArtists.split(',') : [track.primaryArtists],
          description: track.description,
          url: track.url,
        }));

        // Prepare payload data
        const payloadData = { artists, albums, playlists, tracks };

        // Dispatching the results
        dispatch({ type: SEARCH_RESULTS, payload: payloadData });
        if (!debouncedValue || !value) {
          console.log('hello boy');
          dispatch({ type: SEARCH_RESULTS, payload: [] });
        }
        console.log('her');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (debouncedValue) {
      fetchData();
    }
  }, [debouncedValue, token, dispatch, value]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
  };

  return { value, handleChange };
};

export default useInput;
