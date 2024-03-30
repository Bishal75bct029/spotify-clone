import { FaSearch } from 'react-icons/fa';
import useInput from '../custom-hooks/useinput';

const SearchBox: React.FC = () => {
    const { value, handleChange } = useInput('');
    return (
        <div className='relative'>
            <FaSearch className='absolute top-[13px] left-2  text-[#a7a7a7] text-[20px] ' />
            <input type="text" placeholder="What do you want to play for ?" className="bg-[#242424] w-[300px] font-normal pl-10 pr-5 py-3 rounded-full focus:outline-none focus:ring-1 border-1 text-[14px] " value={value} onChange={handleChange} />
        </div>
    )
}

export default SearchBox