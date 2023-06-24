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
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {breadcrumbItems.map(({ label, url, isLast }, index) => (
          <li
            className={`breadcrumb-items ${isLast ? "active" : ""}`}
            aria-current={isLast ? "page" : null}
            key={index}
          >
            {isLast ? <span>{label}</span> : <a href={url}>{label}</a>}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
