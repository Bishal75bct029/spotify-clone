type AlbumProps = {
  image: string;
  title: string;
};

const Albums: React.FC<AlbumProps> = ({ image, title }) => {
  return (
    <div className="h-[220px] w-32 rounded-sm bg-transparent cursor-pointer">
      <img src={image} alt="Not Found" className="w-32 h-32 rounded-md" />
      <p className="truncate text-white mt-2">{title}</p>
      {/* <p className=' text-[#a2a2a2] whitespace-normal truncate line-clamp-2 text-sm line'>{description}</p> */}
    </div>
  );
};

export default Albums;
