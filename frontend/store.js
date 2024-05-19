import { configureStore } from '@reduxjs/toolkit';
import {
  requestTabReducer,
  assetTabReducer,
  userTabReducer,
  planTabReducer,
  userInfoReducer,
  dashboardReducer
} from './slices/redux';

const store = configureStore({
  reducer: {
    requestTab: requestTabReducer,
    assetTab: assetTabReducer,
    userTab: userTabReducer,
    planTab: planTabReducer,
    dashboardTab: dashboardReducer,
    userInfo: userInfoReducer,
  },
});

export default store;
