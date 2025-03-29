import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const SkeletonUI: React.FC = () => {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <Skeleton width={250} height={250} className="mr-4" />
          <div>
            <Skeleton width={100} height={30} />
            <Skeleton width={150} height={50} />
          </div>
        </div>
        <div className="mb-4">
          <Skeleton height={100} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Skeleton height={50} />
          <Skeleton height={50} />
          <Skeleton height={50} />
          <Skeleton height={50} />
          <Skeleton height={50} />
          <Skeleton height={50} />
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default SkeletonUI;
