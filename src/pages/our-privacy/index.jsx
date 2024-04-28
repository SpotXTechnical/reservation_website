import React from "react";
import SpecialLayout from "../../Components/PolicySpecialLayout/PolicySpecialLayout";
import PrivacyContent from "../../Components/PrivacyContent/PrivacyContent";

function OurPrivacy() {
  return <PrivacyContent />;
}

OurPrivacy.getLayout = (page) => <SpecialLayout>{page}</SpecialLayout>;
export default OurPrivacy;
