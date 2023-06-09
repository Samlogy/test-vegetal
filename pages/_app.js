import Head from "next/head";
import "../style.css";
import AuthProvider from "../store/AuthProvider";
import PopupProvider from "../store/PopupProvider";
import ErrorBoundary from "../components/ErrorBoundary";
import GlobalProvider from "../store/GlobalStore";
import PopUp from "../components/PopUp";
import LoginPopup from "../components/LoginPopup";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Test App</title>
      </Head>

      <ErrorBoundary>
        <GlobalProvider>
          <AuthProvider>
            <PopupProvider>
              <Component {...pageProps} />
              <PopUp />
              <LoginPopup />
            </PopupProvider>
          </AuthProvider>
        </GlobalProvider>
      </ErrorBoundary>
    </>
  );
}
