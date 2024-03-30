import Home from "./Home"
import SearchBox from "./SearchBox"

const Body: React.FC = () => {
    return (
        <div className="p-5 overflow-y-auto">
            <div className="flex  items-center justify-between flex-grow mt-2 rounded-xl min-h-full text-white ">
                <SearchBox />
                <div>
                    <button className="bg-white font-bold px-8 py-[6px] text-black rounded-full mr-3">Login</button>
                    <button className="font-normal text-[18px]">Sign up</button>
                </div>
            </div>
            <hr className="my-4 border-t border-blue-500 text-blue-500 "/>
            <Home />
        </div>
    )
}

export default Body