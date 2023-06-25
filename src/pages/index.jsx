"use client";
import { Inter } from "@next/font/google";
import HomeHeading from "../Components/HomeHeading/HomeHeading";
import RegionsHomeList from "../Components/RegionsHomeList/RegionsHomeList";
import OffersList from "../Components/OffersList/OffersList";
import SubscribeUs from "../Components/SubscribeUs/SubscribeUs";
import MostPopularList from "../Components/MostPopularList/MostPopularList";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import store, { langAction } from "../store";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  let { lang } = useSelector((state) => state.language);
  const router = useRouter();
  if (typeof window !== "undefined") {
    const storedLanguage = localStorage.getItem("language");
    const language = storedLanguage ? storedLanguage : "en";
    store.dispatch(
      language === "ar" ? langAction.langAr() : langAction.langEn()
    );
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const idKey = urlParams.get("idKey");

    if (
      window.location.search.includes("idKey") ||
      window.location.search.includes("targetKey")
    ) {
      if (window.location.search.includes("unit")) {
        window.location.href = `/properties/${idKey}`;
      }
    } else if (window.location.search.includes("subRegion")) {
      window.location.href = `/subRegion/${idKey}`;
    }
  }, []);

  return (
    <main
      dir={lang === "ar" ? "rtl" : "ltr"}
      className={lang === "ar" ? "rtl" : "ltr"}
    >
      <HomeHeading />
      <RegionsHomeList />
      <MostPopularList />
      <OffersList />
      <SubscribeUs />
    </main>
  );
}
