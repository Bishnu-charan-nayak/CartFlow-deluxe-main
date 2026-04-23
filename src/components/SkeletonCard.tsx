const SkeletonCard = () => {
  return (
    <div className="rounded-2xl border bg-card p-0 overflow-hidden">
      <div className="skeleton aspect-square w-full rounded-none" />
      <div className="p-4 space-y-3">
        <div className="skeleton h-3 w-16 rounded-full" />
        <div className="skeleton h-4 w-full rounded-full" />
        <div className="skeleton h-4 w-3/4 rounded-full" />
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="skeleton h-3 w-3 rounded-full" />
          ))}
          <div className="skeleton h-3 w-10 ml-1 rounded-full" />
        </div>
        <div className="flex items-center gap-2">
          <div className="skeleton h-5 w-16 rounded-full" />
          <div className="skeleton h-4 w-12 rounded-full" />
        </div>
        <div className="skeleton h-10 w-full rounded-xl" />
      </div>
    </div>
  );
};

export default SkeletonCard;
