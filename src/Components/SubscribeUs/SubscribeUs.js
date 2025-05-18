"use client";
import PlayStore from "../../../public/assets/googleplay.svg";
import AppStore from "../../../public/assets/appstore.svg";
import Image from "next/image";
import Link from "next/link";
const SubscribeUs = () => {
  return (
    <div className="tw-bg-[#fcd95c] tw-flex tw-justify-center tw-items-center tw-p-4">
      <div className="tw-flex tw-space-x-4 tw-items-center">
        <Link
          href="https://apps.apple.com/eg/app/spotx-app/id6444921625"
          target="_blank"
          className="tw-transition tw-transform tw-hover:scale-105 tw-duration-300"
        >
          <Image
            src={AppStore}
            alt="app-store"
            className="tw-cursor-pointer tw-w-40 tw-h-auto"
          />
        </Link>
        <Link
          href="https://play.google.com/store/apps/details?id=com.spotx.customer"
          target="_blank"
          className="tw-transition tw-transform tw-hover:scale-105 tw-duration-300"
        >
          <Image
            src={PlayStore}
            alt="google-play"
            className="tw-cursor-pointer tw-w-40 tw-h-auto"
          />
        </Link>
      </div>
    </div>
  );
};

export default SubscribeUs;
