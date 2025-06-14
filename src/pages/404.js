import Head from "next/head";
import Link from "next/link";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found | SpotX</title>
        <meta
          name="description"
          content="The page you're looking for doesn't exist."
        />
      </Head>

      <div className="tw-min-h-screen tw-bg-gradient-to-br tw-from-blue-50 tw-via-white tw-to-purple-50 tw-flex tw-items-center tw-justify-center tw-px-4">
        <div className="tw-max-w-lg tw-w-full tw-text-center">
          {/* Animated 404 Number */}
          <div className="tw-mb-8">
            <div className="tw-text-8xl md:tw-text-9xl tw-font-bold tw-text-transparent tw-bg-clip-text tw-bg-gradient-to-r tw-from-[#2396cc] tw-via-[#44bcb7] tw-to-pink-600 tw-animate-pulse">
              404
            </div>
            <div className="tw-flex tw-justify-center tw-mt-4">
              <div className="tw-w-24 tw-h-1 tw-bg-gradient-to-r tw-from-[#2396cc] tw-to-[#44bcb7] tw-rounded-full"></div>
            </div>
          </div>

          {/* Main Content */}
          <div className="tw-mb-8">
            <h1 className="tw-text-2xl md:tw-text-3xl tw-font-bold tw-text-gray-800 tw-mb-4">
              Oops! Page Not Found
            </h1>
            <p className="tw-text-gray-600 tw-text-lg tw-mb-6 tw-leading-relaxed">
              The page you&apos;re looking for seems to have vanished into thin
              air. Don&apos;t worry, even the best explorers sometimes take a
              wrong turn!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="tw-space-y-4 sm:tw-space-y-0 sm:tw-space-x-4 sm:tw-flex sm:tw-justify-center tw-mb-8">
            <Link href="/">
              <a className="tw-inline-flex tw-items-center tw-justify-center tw-px-6 tw-py-3 tw-bg-gradient-to-r tw-from-[#2396cc] tw-to-[#44bcb7] tw-text-white tw-font-semibold tw-rounded-lg tw-shadow-lg tw-hover:from-blue-700 tw-hover:to-blue-800 tw-transform tw-hover:scale-105 tw-transition-all tw-duration-200 tw-w-full sm:tw-w-auto">
                <svg
                  className="tw-w-5 tw-h-5 tw-mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Go Home
              </a>
            </Link>

            <button
              onClick={() => window.history.back()}
              className="tw-inline-flex tw-items-center tw-justify-center tw-px-6 tw-py-3 tw-border-2 tw-border-gray-300 tw-text-gray-700 tw-font-semibold tw-rounded-lg tw-hover:border-gray-400 tw-hover:bg-gray-50 tw-transform tw-hover:scale-105 tw-transition-all tw-duration-200 tw-w-full sm:tw-w-auto"
            >
              <svg
                className="tw-w-5 tw-h-5 tw-mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Go Back
            </button>
          </div>

          {/* Decorative Elements */}
          <div className="tw-flex tw-justify-center tw-space-x-8 tw-opacity-60">
            <div className="tw-w-16 tw-h-16 tw-bg-gradient-to-br tw-from-blue-200 tw-to-blue-300 tw-rounded-full tw-animate-bounce tw-animation-delay-100"></div>
            <div className="tw-w-12 tw-h-12 tw-bg-gradient-to-br tw-from-purple-200 tw-to-purple-300 tw-rounded-full tw-animate-bounce tw-animation-delay-200"></div>
            <div className="tw-w-8 tw-h-8 tw-bg-gradient-to-br tw-from-pink-200 tw-to-pink-300 tw-rounded-full tw-animate-bounce tw-animation-delay-300"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .tw-animation-delay-100 {
          animation-delay: 0.1s;
        }
        .tw-animation-delay-200 {
          animation-delay: 0.2s;
        }
        .tw-animation-delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </>
  );
}
