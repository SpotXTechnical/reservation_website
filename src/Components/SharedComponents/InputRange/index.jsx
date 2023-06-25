import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { FormattedMessage } from "react-intl";

const PriceRangeComponent = ({
  min,
  max,
  step,
  priceRange,
  handlePriceChange,
  handlePriceAfterChange,
}) => {
  return (
    <div className="w-100">
      <div className="d-flex justify-content-between mb-3 price-range-info">
        <div className="d-flex flex-column">
          <span>
            <FormattedMessage id="minimum" />
          </span>{" "}
          <span>
            {priceRange[0]} <FormattedMessage id="le" />
          </span>
        </div>
        <div className="d-flex flex-column">
          <span>
            <FormattedMessage id="maximum" />
          </span>{" "}
          <span>
            {priceRange[1]} <FormattedMessage id="le" />
          </span>
        </div>
      </div>
      <Slider
        range
        min={min}
        max={max}
        step={step}
        value={priceRange}
        onChange={handlePriceChange}
        onAfterChange={handlePriceAfterChange}
      />
    </div>
  );
};

export default PriceRangeComponent;
