import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app/globals.css";
import "./app/offers.css";
import "./app/HomeHeading.css";

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
