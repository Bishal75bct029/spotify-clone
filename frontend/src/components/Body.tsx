import { useSelector } from "react-redux"
import Home from "./Home"
import SearchBox from "./SearchBox"
import { Store } from "../interfaces/Store"
import SearchResult from "./SearchResult"

const Body: React.FC = () => {
    const searchResult = useSelector((store: Store) => store.searchResult);
    let isData: any = searchResult.artists.length > 0 || searchResult.albums.length > 0 || searchResult.tracks > 0 || searchResult.playlists.length > 0;
    console.log(isData, "hello");
    console.log(searchResult, 'kinak')
    return (
        <div className="p-5 custom-scrollbar h-auto min-h-full">
            <div className="flex  items-center justify-between flex-grow mt-2 rounded-xl  h-auto text-white ">
                <SearchBox />
                <div>
                    <button className="bg-white font-bold px-8 py-[6px] text-gray-800 rounded-full mr-3">Login</button>
                    <button className="font-normal text-[18px]">Sign up</button>
                </div>
            </div>
            <hr className="mt-8 border-1 border-gray-800 text-blue-500 shadow-xl" />
            {
                !isData ? <Home /> : <SearchResult />
            }
        </div>
    )
}

export default Body