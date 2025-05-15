import Image from "next/image";

const RegionsCard = ({ id, name, image, handleClick }) => {
  return (
    <div
      className="tw-shrink-0 tw-w-64 sm:tw-w-72 md:tw-w-80 tw-cursor-pointer tw-mb-2"
      onClick={handleClick}
    >
      <div className="tw-overflow-hidden tw-rounded-lg tw-shadow-md hover:tw-shadow-lg tw-transition-all tw-duration-300 tw-transform hover:tw-scale-105">
        <div className="tw-relative tw-h-52 tw-overflow-hidden">
          <Image
            src={image}
            width={500}
            height={500}
            alt={name}
            className="tw-w-full tw-h-full tw-object-cover"
          />
          <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-t tw-from-black/60 tw-to-transparent"></div>

          <div className="tw-absolute tw-bottom-0 tw-left-0 tw-w-full tw-p-4">
            <h3 className="tw-text-lg tw-font-bold tw-text-white">{name}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionsCard;
