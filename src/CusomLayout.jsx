import Header from "../src/Components/Header/Header"
import Footer from "../src/Components/Footer/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app/globals.css";

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
