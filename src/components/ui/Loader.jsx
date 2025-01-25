const Loader = () => {
  return (
    <div className="fixed w-full h-full bg-white bg-opacity-50 flex justify-center items-center z-50">
      <div
        className="rounded-full h-20 w-20 border-t-4 border-l-4 animate-spin "
        style={{
          background:
            "radial-gradient(farthest-side,#02B9B0 94%,transparent) top/8px 8px no-repeat, conic-gradient(transparent 30%, #02B9B0)",
          WebkitMask:
            "radial-gradient(farthest-side,transparent calc(100% - 8px),#000 0)",
        }}
      ></div>
    </div>
  );
};

export default Loader;
