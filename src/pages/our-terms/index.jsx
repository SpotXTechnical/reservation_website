import React from "react";
import SpecialLayout from "../../Components/PolicySpecialLayout/PolicySpecialLayout";
import TermsContent from "../../Components/TermsContent/TermsContent";

function OurTerms() {
  return <TermsContent />;
}

OurTerms.getLayout = (page) => <SpecialLayout>{page}</SpecialLayout>;
export default OurTerms;
