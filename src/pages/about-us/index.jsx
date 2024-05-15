import React from "react";
import AboutUsContent from "../../Components/AboutUsContent/AboutUsContent";
import Head from "next/head";

export default function AboutUs() {
  return (
    <>
      <Head>
        <title>About Us | SpotX</title>
        <meta name="description" content={"about SpotX"} />
      </Head>
      <AboutUsContent />
    </>
  );
}
