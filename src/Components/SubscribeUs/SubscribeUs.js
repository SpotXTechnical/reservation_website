"use client";
import PlayStore from "../../../public/assets/googleplay.svg";
import AppStore from "../../../public/assets/appstore.svg";
import Image from "next/image";
import Link from "next/link";
const SubscribeUs = () => {
  return (
    <div className="subscribe_us_wrapper">
      <div className="app_images">
        <Link
          href="https://apps.apple.com/eg/app/spotx-app/id6444921625"
          target="_blank"
        >
          <Image src={AppStore} alt="app-store" className="cursor-pointer" />
        </Link>
        <Link
          href="https://play.google.com/store/apps/details?id=com.spotx.customer"
          target="_blank"
        >
          <Image src={PlayStore} alt="google-play" className="cursor-pointer" />
        </Link>
      </div>
    </div>
  );
};

export default SubscribeUs;
