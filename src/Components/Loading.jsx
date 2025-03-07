import loadingImage from "/images/loading.png";
function Loading() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <img
        src={loadingImage}
        alt="loading"
        className="h-[40px] w-[40px] animate-spin"
      ></img>
    </div>
  );
}

export default Loading;
