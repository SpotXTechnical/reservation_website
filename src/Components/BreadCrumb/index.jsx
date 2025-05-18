import Link from "next/link";
import React, { useMemo } from "react";

const Breadcrumb = ({ items }) => {
  const breadcrumbItems = useMemo(() => {
    return items.map((item, index) => ({
      label: item.label,
      url: item.url,
      isLast: index === items.length - 1,
    }));
  }, [items]);

  return (
    <nav aria-label="breadcrumb" className="tw-w-full tw-overflow-x-auto">
      <ol className="tw-flex tw-items-center tw-flex-nowrap tw-whitespace-nowrap">
        {breadcrumbItems.map(({ label, url, isLast }, index) => (
          <li
            key={index}
            className="tw-flex tw-items-center"
            aria-current={isLast ? "page" : null}
          >
            {index > 0 && (
              <span className="tw-mx-2 tw-text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="tw-h-3 tw-w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            )}

            {isLast ? (
              <span className="tw-font-medium tw-text-[#44bcb7]">{label}</span>
            ) : (
              <Link
                href={url}
                className="tw-text-gray-500 hover:tw-text-[#44bcb7] tw-transition-colors tw-duration-200 tw-text-sm tw-font-normal"
              >
                {label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
