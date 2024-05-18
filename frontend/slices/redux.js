import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

// Initial states
const initialRequestTabState = false;
const initialAssetTabState = false;
const initialUserTabState = false;
const initialPlanTabState = false;
const initialUserInfoState = {
  email: '',
  role: '',
  name: '',
};

// Slices
const requestTabSlice = createSlice({
  name: 'requestTab',
  initialState: initialRequestTabState,
  reducers: {
    setActive: (state, { payload }) => payload,
  },
});

const assetTabSlice = createSlice({
  name: 'assetTab',
  initialState: initialAssetTabState,
  reducers: {
    setActive: (state, { payload }) => payload,
  },
});

const userTabSlice = createSlice({
  name: 'userTab',
  initialState: initialUserTabState,
  reducers: {
    setActive: (state, { payload }) => payload,
  },
});

const planTabSlice = createSlice({
  name: 'planTab',
  initialState: initialPlanTabState,
  reducers: {
    setActive: (state, { payload }) => payload,
  },
});

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialUserInfoState,
  reducers: {
    setUserInfo: (state, { payload }) => {
      state.email = payload.email;
      state.role = payload.role;
      state.name = payload.name;
    },
    clearUserInfo: (state) => {
      state.email = '';
      state.role = '';
      state.name = '';
    },
  },
});

// Export actions
export const {
  setActive: setActiveRequestTab,
} = requestTabSlice.actions;

export const {
  setActive: setActiveAssetTab,
} = assetTabSlice.actions;

export const {
  setActive: setActiveUserTab,
} = userTabSlice.actions;

export const {
  setActive: setActivePlanTab,
} = planTabSlice.actions;

export const { setUserInfo, clearUserInfo } = userInfoSlice.actions;

// Export selectors
export const getRequestTab = (state) => state?.requestTab;
export const getAssetTab = (state) => state?.assetTab;
export const getUserTab = (state) => state?.userTab;
export const getPlanTab = (state) => state?.planTab;
export const getUserInfo = (state) => state?.userInfo;

export const getUserInfoEmail = createSelector(getUserInfo, (state) => state.email);
export const getUserInfoRole = createSelector(getUserInfo, (state) => state.role);
export const getUserInfoName = createSelector(getUserInfo, (state) => state.name);

// Export reducers
export const requestTabReducer = requestTabSlice.reducer;
export const assetTabReducer = assetTabSlice.reducer;
export const userTabReducer = userTabSlice.reducer;
export const planTabReducer = planTabSlice.reducer;
export default userInfoSlice.reducer;
