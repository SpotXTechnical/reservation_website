import Layout from "../CusomLayout";
import { IntlProvider } from "react-intl";
import en from "../lang/en.json";
import ar from "../lang/ar.json";

import { Provider, useSelector, useDispatch } from "react-redux";
import { AuthInitializer } from "../Components/AuthInitializer/AuthInitializer";
import BootStrapClient from "../Components/BootStrapClient/BootStrapClient";
import { useEffect, useMemo } from "react";
import { langAction } from "../store";
import store from "../store";

function AppContent({ Component, pageProps }) {
  const dispatch = useDispatch();
  const { lang } = useSelector((state) => state.language);
  const getLayout = Component.getLayout;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLang = localStorage.getItem("language");
      if (storedLang && storedLang !== lang) {
        dispatch(
          storedLang === "ar" ? langAction.langAr() : langAction.langEn()
        );
      }
    }
  }, [dispatch, lang]);

  const messages = useMemo(() => {
    return lang === "ar" ? ar : en;
  }, [lang]);

  return (
    <IntlProvider
      locale={lang}
      messages={messages}
      onError={(err) => {
        if (err.code === "MISSING_TRANSLATION") {
          console.warn("Missing translation:", err.message);
          return;
        }
        throw err;
      }}
    >
      <AuthInitializer>
        {getLayout ? (
          getLayout(<Component {...pageProps} locale={lang} />)
        ) : (
          <Layout>
            <Component {...pageProps} locale={lang} />
          </Layout>
        )}
        <BootStrapClient />
      </AuthInitializer>
    </IntlProvider>
  );
}

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AppContent Component={Component} pageProps={pageProps} />
    </Provider>
  );
}
