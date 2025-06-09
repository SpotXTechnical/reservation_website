"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const ANDROID = "android";
const IOS = "ios";

const Announcements = () => {
  const [platform, setPlatform] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  const detectPlatform = () => {
    if (typeof window !== "undefined") {
      const ua = navigator?.userAgent || navigator?.vendor || window?.opera;

      if (/android/i.test(ua)) {
        setPlatform(ANDROID);
      } else if (/iPad|iPhone|iPod/.test(ua) && !("MSStream" in window)) {
        setPlatform(IOS);
      } else {
        setPlatform("");
      }
    }
  };

  useEffect(() => {
    detectPlatform();
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible || !platform) {
    return null;
  }

  return (
    <div className="tw-fixed tw-bottom-4 tw-left-0 tw-right-0 tw-mx-auto tw-max-w-md tw-px-4 tw-z-50">
      <div className="tw-bg-white tw-rounded-lg tw-shadow-lg tw-overflow-hidden tw-border tw-border-gray-200">
        <div
          className={`tw-p-4 tw-flex tw-items-center tw-justify-between ${
            platform === ANDROID ? "tw-bg-green-50" : "tw-bg-blue-50"
          }`}
        >
          <div className="tw-flex tw-items-center tw-space-x-3">
            {platform === ANDROID ? (
              <div className="tw-flex-shrink-0 tw-w-12 tw-h-12 tw-rounded-full tw-bg-green-100 tw-flex tw-items-center tw-justify-center">
                <svg
                  fill="#000000"
                  className="tw-h-5 tw-w-5"
                  viewBox="-5 -5 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMinYMin"
                >
                  <path d="M8 6.641l1.121-1.12a1 1 0 0 1 1.415 1.413L7.707 9.763a.997.997 0 0 1-1.414 0L3.464 6.934A1 1 0 1 1 4.88 5.52L6 6.641V1a1 1 0 1 1 2 0v5.641zM1 12h12a1 1 0 0 1 0 2H1a1 1 0 0 1 0-2z" />
                </svg>
              </div>
            ) : (
              <div className="tw-flex-shrink-0 tw-w-12 tw-h-12 tw-rounded-full tw-bg-blue-100 tw-flex tw-items-center tw-justify-center">
                <svg
                  fill="#000000"
                  className="tw-h-5 tw-w-5"
                  viewBox="-5 -5 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMinYMin"
                >
                  <path d="M8 6.641l1.121-1.12a1 1 0 0 1 1.415 1.413L7.707 9.763a.997.997 0 0 1-1.414 0L3.464 6.934A1 1 0 1 1 4.88 5.52L6 6.641V1a1 1 0 1 1 2 0v5.641zM1 12h12a1 1 0 0 1 0 2H1a1 1 0 0 1 0-2z" />
                </svg>
              </div>
            )}
            <div>
              <h3 className="tw-font-medium tw-text-gray-900">
                {platform === ANDROID
                  ? "Better experience on Android"
                  : "Better experience on iOS"}
              </h3>
              <p className="tw-text-sm tw-text-gray-600">
                Download our app for the best experience
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="tw-flex-shrink-0 tw-p-1 tw-rounded-full tw-text-gray-400 hover:tw-text-gray-500 hover:tw-bg-gray-100"
          >
            <svg
              fill="#000000"
              className="tw-h-5 tw-w-5"
              viewBox="-6 -6 24 24"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMinYMin"
            >
              <path d="M7.314 5.9l3.535-3.536A1 1 0 1 0 9.435.95L5.899 4.485 2.364.95A1 1 0 1 0 .95 2.364l3.535 3.535L.95 9.435a1 1 0 1 0 1.414 1.414l3.535-3.535 3.536 3.535a1 1 0 1 0 1.414-1.414L7.314 5.899z" />
            </svg>
          </button>
        </div>
        <div className="tw-px-4 tw-py-3 tw-bg-gray-50">
          <Link
            href={
              platform === ANDROID
                ? "https://play.google.com/store/apps/details?id=com.spotx.customer"
                : "https://apps.apple.com/eg/app/spotx-app/id6444921625"
            }
            className={`tw-block tw-w-full tw-text-center tw-px-4 tw-py-2 tw-rounded-md tw-font-medium tw-text-white ${
              platform === ANDROID
                ? "tw-bg-green-600 hover:tw-bg-green-700"
                : "tw-bg-blue-600 hover:tw-bg-blue-700"
            } tw-transition tw-duration-150`}
            target="_blank"
          >
            {platform === ANDROID
              ? "Get it on Google Play"
              : "Download on App Store"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
