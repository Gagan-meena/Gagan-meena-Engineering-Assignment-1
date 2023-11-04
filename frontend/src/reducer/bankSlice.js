import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const fetchData = createAsyncThunk(
  "fetchData",
  async ({ bank, search, category, startDate, endDate }) => {
    let baseUrl = `http://localhost:3000/api/${bank}`;

    const queryParams = [];

    // Include category in the request URL if it's provided
    if (category && category.length > 0) {
      queryParams.push(`category=${category.join(",")}`);
    }
    if (search && search.length > 0) {
      queryParams.push(`search=${search}`);
    }

    // Include startDate and endDate in the request URL if they're provided
    if (startDate) {
      queryParams.push(`startDate=${startDate}`);
    }
    if (endDate) {
      queryParams.push(`endDate=${endDate}`);
    }

    // Construct the full URL with query parameters
    if (queryParams.length > 0) {
      baseUrl += `?${queryParams.join("&")}`;
    }

    let link = baseUrl;

    const res = await fetch(link);
    const { bankData } = await res.json();

    return bankData;
  }
);

const bankSlice = createSlice({
  name: "bank",
  initialState: {
    isLoading: false,
    data: [],
    bank: "axis",
    search: "",
    category: [],
    startDate: "",
    endDate: "",
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchData.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },

  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
    },
    setBank(state, action) {
      state.bank = action.payload;
    },
    setStartDate(state, action) {
      state.startDate = action.payload;
    },
    setEndDate(state, action) {
      state.endDate = action.payload;
    },
  },
});

export const {
  setFilterOptions,
  setCategory,
  setBank,
  setStartDate,
  setEndDate,
} = bankSlice.actions;

export default bankSlice.reducer;
