import { useSelector } from "react-redux"
import Home from "./Home"
import SearchBox from "./SearchBox"
import { Store } from "../interfaces/Store"
import SearchResult from "./SearchResult"
import { useEffect, useState } from "react"

const Body: React.FC = () => {
    const searchResult = useSelector((store: Store) => store.searchResult);
    const [isData,SetIsData] = useState(searchResult.artists.length > 0 || searchResult.albums.length > 0 || searchResult.tracks > 0 || searchResult.playlists.length > 0);
    
    useEffect(()=>{
        SetIsData(searchResult.artists.length > 0 || searchResult.albums.length > 0 || searchResult.tracks > 0 || searchResult.playlists.length > 0)
    },[searchResult])
    

    return (
        <div className="p-5 custom-scrollbar h-auto min-h-full relative ">
            <div className="flex  items-center justify-between flex-grow mt-2 rounded-xl  h-auto text-white relative  z-[102] ">
                <SearchBox />
                <div className="mr-4 relative z-[990]">
                    <button className="bg-white font-bold px-8 py-[6px] text-gray-800 rounded-full relative  mr-3 top 10 right">Login</button>
                    <button className="font-normal text-[18px]">Sign up</button>
                </div>
            </div>
            <hr className="mt-8 border-1 border-gray-800 text-blue-500 shadow-xl relative z-[999]" />
            {
                !isData ? <Home /> : <SearchResult />
            }
        </div>
    )
}

export default Body