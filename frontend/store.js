import { configureStore } from '@reduxjs/toolkit';
import {
  requestTabReducer,
  assetTabReducer,
  userTabReducer,
  planTabReducer,
  userInfoReducer,
} from './slices/redux';

const store = configureStore({
  reducer: {
    requestTab: requestTabReducer,
    assetTab: assetTabReducer,
    userTab: userTabReducer,
    planTab: planTabReducer,
    userInfo: userInfoReducer,
  },
});

export default store;
