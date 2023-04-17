import Layout from "../CusomLayout";
import { IntlProvider } from "react-intl";
import en from "../lang/en.json";
import ar from "../lang/ar.json";
import store from "../store/index";
import { Provider } from "react-redux";
import { useEffect, useState, useMemo } from "react";

export default function MyApp({ Component, pageProps }) {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    if (localStorage.getItem("language")) {
      setLang(localStorage.getItem("language"));
    }
  }, []);

  const messages = useMemo(() => {
    return lang === "ar" ? ar : en;
  }, [lang]);
  return (
    <Provider store={store}>
      <IntlProvider locale={lang} messages={messages} onError={() => null}>
        <Layout>
          <Component {...pageProps} locale={lang} />
        </Layout>
      </IntlProvider>
    </Provider>
  );
}
