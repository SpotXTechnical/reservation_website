"use client";
import { Inter } from "@next/font/google";
import HomeHeading from "../Components/HomeHeading/HomeHeading";
import RegionsHomeList from "../Components/RegionsHomeList/RegionsHomeList";
import OffersList from "../Components/OffersList/OffersList";
import SubscribeUs from "../Components/SubscribeUs/SubscribeUs";
import MostPopularList from "../Components/MostPopularList/MostPopularList";
import { useRouter } from "next/router";
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
    const propertyNumber = urlParams.get("from_unit");

    if (
      window.location.search.includes("idKey") ||
      window.location.search.includes("targetKey")
    ) {
      if (window.location.search.includes("unit")) {
        router.push(`/properties/${idKey}`);
      }
    } else if (window.location.search.includes("subRegion")) {
      router.push(`/subRegion/${idKey}`);
    }
    if (propertyNumber) {
      router.push(`/properties/${propertyNumber}`);
    }
  }, [router]);

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
