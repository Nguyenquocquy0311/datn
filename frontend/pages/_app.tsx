import { useAuth } from "@/middleware/Auth";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from 'react-redux'
import store from '../store'

export default function App({ Component, pageProps }: AppProps) {
  useAuth()
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
