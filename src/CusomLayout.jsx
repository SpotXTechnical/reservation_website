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

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
