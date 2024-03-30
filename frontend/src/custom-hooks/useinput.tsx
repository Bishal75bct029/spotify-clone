import { ChangeEvent, useEffect, useState } from 'react'
import { Store } from '../interfaces/Store';
import { useSelector } from 'react-redux';
import { UserInput } from '../interfaces/UserInput';
import axios from 'axios';


const useInput = (initialValue: any): UserInput => {
  const [value, setValue] = useState(initialValue);
  const token = useSelector((store: Store) => store.token);
  console.log(token, "hello")
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(token,'hehe')
        const response = await axios.get('https://api.spotify.com/v1/search', {
          headers: {
            Authorization: `Bearer ${token}`
          },
          
            params: {
              q: value,
              type: 'artist'
            }
          
        });
        console.log(response.data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    if(value){
      fetchData();
    }
  
  }, [token,value]); 
  
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
  }
  return { value, handleChange };

};

export default useInput