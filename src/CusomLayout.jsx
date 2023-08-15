import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app/globals.css";
import "./app/offers.css";
import "./app/HomeHeading.css";
import "./app/terms.css";
import "./app/subRegion.css";
import "./app/RegionsHomeList.css";
import "./app/MostPopularList.css";
import "./app/OffersList.css";
import "./app/SubscribeUs.css";
import "./app/signin.css";
import "./app/signup.css";
import "./app/reservations.css";
import "./app/RegionsCard.css";
import "./app/ImportantRegionsCard.css";
import "./app/PopularCard.css";
import "./app/reservationCard.css";
import "./app/subReg.css";
import "./app/properties.css";
import "./app/Modal.css";
import "./app/ReviewsCard.css";
import "./app/Title.css";
import "./app/ViewAll.css";
import "./app/profile.css";
import "./app/privacy.css";
import "./app/discover.css";
import "react-date-range/dist/theme/default.css";
import "react-date-range/dist/styles.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./app/DateRangePicker.css";
import "./app/pagination.css";
import "rc-slider/assets/index.css";
import "./app/radio.css";
import "./app/regions.css";
import "./app/checkbox.css";
import "./app/ownerprofile.css";

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
