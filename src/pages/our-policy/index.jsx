import React from "react";
import SpecialLayout from "../../Components/PolicySpecialLayout/PolicySpecialLayout";
import PolicyContent from "../../Components/PolicyContent/PolicyContent";
import Head from "next/head";

function OurPolicy() {
  return (
    <>
      <PolicyContent />
    </>
  );
}

OurPolicy.getLayout = (page) => <SpecialLayout>{page}</SpecialLayout>;
export default OurPolicy;
