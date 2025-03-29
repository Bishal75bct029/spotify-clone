import SideNav from '../components/SideNav';
import DetailView from '../components/DetailView';

const PlaylistPage: React.FC = () => {
  return (
    <div className="flex justify-between gap-4 relative">
      <div>
        <SideNav />
      </div>

      <div className=" min-h-screen w-full bg-[#121212] ml-[345px] mt-2 rounded-xl custom-scrollbar h-auto relative-container">
        <DetailView />
      </div>
    </div>
  );
};

export default PlaylistPage;
