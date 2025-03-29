import { FaSearch } from 'react-icons/fa';
import useInput from '../custom-hooks/useinput';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const SearchBox: React.FC = () => {
  const navigate = useNavigate();
  const searchBoxRef = useRef<HTMLInputElement>(null);
  const { id } = useParams();
  useEffect(() => {
    if (id === 'search' && searchBoxRef.current) {
      searchBoxRef.current.focus();
    }
  }, [id]);

  const handleFocus = () => {
    navigate('/search');
  };
  const { value, handleChange } = useInput('');
  return (
    <div className="relative">
      <FaSearch className="absolute top-[13px] left-2  text-[#a7a7a7] text-[20px] " />
      <input
        type="text"
        placeholder="What do you want to play for ?"
        className="bg-[#242424] w-[300px] font-light pl-10 pr-5 py-3 rounded-full focus:outline-none focus:ring-1 border-1 text-[14px] placeholder:text-[16px]"
        value={value}
        onChange={handleChange}
        ref={searchBoxRef}
        onFocus={handleFocus}
      />
    </div>
  );
};

export default SearchBox;
