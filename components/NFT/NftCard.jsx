const NftCard = ({
  image,
  id,
  title,
  count,
  price,
}) => {
  return (
    <div className="w-56  mr-3  ml-3 bg-slate-100 rounded-xl">
      <div className="flex w-56 h-56 justify-center items-center rounded-xl bg-nftbg">
        {image ? (
          <img
            className="flex justify-center items-center w-52 h-52"
            key={id}
            src={image}
          ></img>
        ) : (
          "NO IMAGE"
        )}
      </div>
      <div className="p-3">
        <div>
          <div className="flex-grow">
            <h2 className="text-xl font-lalezar flex flex-col items-center">
              {title}
            </h2>
            {count ? (
              <h2 className="text-xl font-lalezar flex flex-col items-center">
                {count}
              </h2>
            ) : null}

            {price ? (
              <h2 className="text-xl font-lalezar flex flex-col items-center">
                {price}
              </h2>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftCard;
