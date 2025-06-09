import { useEffect, useState } from "react";
import {
  addToFavourite,
  removeFromFavourite,
} from "../../../app/Apis/UnitsApis";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
const PopularCard = ({
  id,
  image,
  title,
  klass,
  bathrooms,
  bed_rooms,
  updateFavList,
  active_ranges,
  nearest_active_ranges,
  favouritesList,
  total_price,
  current_price,
  is_favourite,
}) => {
  const [isFav, setIsFav] = useState(is_favourite);
  const router = useRouter();
  let { lang } = useSelector((state) => state.language);

  const getOffers = () => {
    return active_ranges?.filter((date) => {
      const startDate = new Date(date.from);
      const endDate = new Date(date.to);
      const currentDate = new Date();
      return currentDate >= startDate && currentDate <= endDate;
    });
  };
  const handleAddToFavourite = (e, id) => {
    e.stopPropagation();
    const token = localStorage.getItem("access_token");
    if (!token) return router.push("/signin");

    if (isFav) {
      setIsFav(false);
      removeFromFavourite(id)
        .then((res) => {
          toast.success(
            lang === "ar"
              ? "تمت إزالة العنصر من المفضلة"
              : "Item removed from favorites!",
            { autoClose: 5000 }
          );
        })
        .catch((err) => {
          setIsFav(true);
        });
    } else {
      setIsFav(true);
      addToFavourite(id)
        .then((res) => {
          toast.success(
            lang === "ar"
              ? "تمت إضافة العنصر إلي المفضلة"
              : "Item added to favorites!",
            { autoClose: 5000 }
          );
        })
        .catch((err) => {
          setIsFav(false);
        });
    }
  };

  return (
    <div className="tw-group tw-relative tw-overflow-hidden tw-bg-white tw-rounded-2xl tw-shadow-md hover:tw-shadow-xl tw-transition-all tw-duration-300 tw-ease-in-out tw-transform hover:tw-scale-[1.02]">
      {(klass === "villa" || klass === "studio") && (
        <div className="tw-absolute tw-top-4 tw-left-4 tw-z-10 tw-py-1 tw-px-3 tw-bg-[#2396cc] tw-text-white tw-uppercase tw-text-xs tw-font-bold tw-rounded-full tw-shadow-md">
          {klass}
        </div>
      )}

      {typeof window !== "undefined" && (
        <button
          onClick={(e) => handleAddToFavourite(e, id)}
          className={`tw-absolute tw-top-4 tw-right-4 tw-z-10 tw-h-10 tw-w-10 tw-flex tw-items-center tw-justify-center tw-rounded-full tw-transition-all tw-duration-300 tw-shadow-md ${
            isFav
              ? "tw-bg-pink-500 tw-text-white"
              : "tw-bg-white tw-text-gray-400 hover:tw-bg-gray-100"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`tw-h-5 tw-w-5 ${
              isFav ? "tw-fill-current" : "tw-stroke-current tw-fill-none"
            }`}
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      )}

      <Link
        href={`/properties/${id}`}
        className="tw-block tw-text-decoration-none"
      >
        <div className="tw-relative tw-overflow-hidden tw-h-56">
          <Image
            width={500}
            height={500}
            src={image}
            alt={title}
            className="tw-w-full tw-h-full tw-object-cover tw-transition-transform tw-duration-500 tw-ease-in-out tw-transform group-hover:tw-scale-110"
          />
          <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-t tw-from-black/60 tw-via-transparent tw-to-transparent tw-opacity-80"></div>
        </div>

        <div className="tw-p-5">
          <div className="tw-flex tw-flex-col tw-mb-4">
            <h3 className="tw-text-lg tw-font-bold tw-text-gray-800 tw-mb-2 tw-line-clamp-1">
              {title}
            </h3>
            <div className="tw-flex tw-items-center tw-justify-between">
              <div className="tw-text-xl tw-font-bold tw-text-[#44bcb7]">
                {total_price ? `${total_price}` : `${current_price}`}
                <span className="tw-text-sm tw-font-normal tw-text-gray-500 tw-ml-1">
                  {total_price ? "/ Reservation" : "/ day"}
                </span>
              </div>
            </div>
          </div>

          <div className="tw-flex tw-flex-wrap tw-justify-between tw-items-center">
            <div className="tw-flex tw-items-center tw-space-x-4">
              {bed_rooms && (
                <div className="tw-flex tw-items-center tw-text-gray-600 gap-2">
                  <svg
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    enableBackground="new 0 0 32 32"
                    className="tw-w-5 tw-h-5 tw-fill-current"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      d="M28,16V9c0-1.1-0.9-2-2-2H6C4.9,7,4,7.9,4,9v7"
                    />
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      d="M8,16v-2c0-1.1,0.9-2,2-2h4c1.1,0,2,0.9,2,2v2"
                    />
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      d="M16,16v-2c0-1.1,0.9-2,2-2h4c1.1,0,2,0.9,2,2v2"
                    />
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      d="M3,18v8h3v-2h20v2h3v-8c0-1.1-0.9-2-2-2H5
	C3.9,16,3,16.9,3,18z"
                    />
                  </svg>
                  <span className="tw-font-medium">{bed_rooms}</span>
                </div>
              )}

              {bathrooms && (
                <div className="tw-flex tw-items-center tw-text-gray-600 gap-2">
                  <svg
                    className="tw-w-5 tw-h-5 tw-fill-current"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    data-name="Layer 2"
                  >
                    <path d="M22,12H5V6.41016A1.97474,1.97474,0,0,1,6.04,4.65137a1.99474,1.99474,0,0,1,1.14764-.2312,3.49114,3.49114,0,0,0,.83771,3.55444L9.08594,9.03516a.99965.99965,0,0,0,1.41406,0L14.03516,5.5a.99964.99964,0,0,0,0-1.41406L12.97461,3.02539a3.494,3.494,0,0,0-4.52972-.34253A3.99247,3.99247,0,0,0,3,6.41016V12H2a1,1,0,0,0,0,2H3v3a2.995,2.995,0,0,0,2,2.81567V21a1,1,0,0,0,2,0V20H17v1a1,1,0,0,0,2,0V19.81573A2.99507,2.99507,0,0,0,21,17V14h1a1,1,0,0,0,0-2ZM9.43945,4.43945a1.50184,1.50184,0,0,1,2.1211,0l.35351.35352L9.793,6.91406l-.35352-.35351A1.50123,1.50123,0,0,1,9.43945,4.43945ZM19,17a1.00067,1.00067,0,0,1-1,1H6a1.00067,1.00067,0,0,1-1-1V14H19Z" />
                  </svg>
                  <span className="tw-font-medium">{bathrooms}</span>
                </div>
              )}
            </div>

            {nearest_active_ranges.length > 0 && getOffers()?.length === 0 && (
              <div className="tw-flex tw-flex-col tw-items-end">
                <p className="tw-text-xs tw-text-gray-500">
                  Offer on{" "}
                  {moment(nearest_active_ranges[0].from).format("D MMM")}
                </p>
                <div className="tw-font-bold tw-text-green-600">
                  {nearest_active_ranges[0].price}
                  <span className="tw-text-xs tw-font-normal tw-ml-1">
                    / day
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PopularCard;
