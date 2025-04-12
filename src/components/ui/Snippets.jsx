const CameraFrame = () => {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <div className="absolute w-14 h-14 border-t-[3px] border-l-[3px] border-white/50 top-[20%] left-[10%] rounded-tl-[36px]" />
      <div className="absolute w-14 h-14 border-t-[3px] border-r-[3px] border-white/50 top-[20%] right-[10%] rounded-tr-[36px]" />
      <div className="absolute w-14 h-14 border-b-[3px] border-l-[3px] border-white/50 bottom-[40%] left-[10%] rounded-bl-[36px]" />
      <div className="absolute w-14 h-14 border-b-[3px] border-r-[3px] border-white/50 bottom-[40%] right-[10%] rounded-br-[36px]" />
    </div>
  );
};

export default CameraFrame;
