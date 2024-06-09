import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sortFilters: [
    { value: "latest", checked: false },
    { value: "price_low_high", checked: false },
    { value: "price_high_low", checked: false },
  ],
  priceRange: [],
  page: 1,
  hasOffer: false,
  noOfGuests: "",
  filtersValues: {
    sortFilters: [],
    regions: [],
    page: [],
    beds: [],
    rooms: [],
    prices: [],
    availability: [],
    keyWord: [],
    features: [],
    hasOffer: [],
    guests: [],
    type: [],
  },
  filterFields: {
    rooms: [],
    beds: [],
    minPrice: 0,
    maxPrice: 50000,
    subRegions: [],
    regions: [],
    features: [],
    types: [],
  },
  minPrice: null,
  maxPrice: null,
  dateRange: [null, null],
};

const discoverFilters = createSlice({
  name: "discoverFilters",
  initialState,
  reducers: {
    setDateRange: (state, action) => {
      state.dateRange = action.payload;
    },
    setPrices(state, action) {
      console.log({ action });
      state.maxPrice = action.payload.maxPrice;
      state.minPrice = action.payload.minPrice;
    },
    setFilterValues: (state, action) => {
      state.filtersValues = {
        ...state.filtersValues,
        [action.payload.key]: action.payload.value,
      };
    },
    setFilterFields: (state, action) => {
      console.log(action);
      state.filterFields = {
        ...state.filterFields,
        ...action.payload,
      };
    },
    toggleCheckBox: (state, action) => {
      const { key, value, index } = action.payload;
      state.filterFields[key][index] = {
        ...state.filterFields[key][index],
        checked: value,
      };
    },
    updateSortFilter: (state, action) => {
      state.sortFilters = [...action.payload];
    },

    setPriceRange: (state, action) => {
      state.priceRange = [...action.payload];
    },

    setPage: (state, action) => {
      state.page = action.payload;
    },

    setHasOffer: (state, action) => {
      state.hasOffer = action.payload;
    },
    setNumberOfGuests: (state, action) => {
      state.noOfGuests = action.payload;
    },
  },
});

export const {
  setDateRange,
  setPrices,
  setFilterValues,
  setFilterFields,
  toggleCheckBox,
  updateSortFilter,
  setPriceRange,
  setPage,
  setHasOffer,
  setNumberOfGuests,
} = discoverFilters.actions;

export default discoverFilters.reducer;
