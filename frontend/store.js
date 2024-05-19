import { configureStore } from '@reduxjs/toolkit';
import {
  requestTabReducer,
  assetTabReducer,
  userTabReducer,
  planTabReducer,
  userInfoReducer,
  dashboardTabReducer
} from './slices/redux';

const store = configureStore({
  reducer: {
    requestTab: requestTabReducer,
    assetTab: assetTabReducer,
    userTab: userTabReducer,
    planTab: planTabReducer,
    dashboardTab: dashboardTabReducer,
    userInfo: userInfoReducer,
  },
});

export default store;
