import { Inter } from "@next/font/google";
import styles from "./page.module.css";
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import HomeHeading from "@/Components/HomeHeading/HomeHeading";
import RegionsHomeList from "@/Components/RegionsHomeList/RegionsHomeList";
import OffersList from "@/Components/OffersList/OffersList";
import SubscribeUs from "@/Components/SubscribeUs/SubscribeUs";
import MostPopularList from "@/Components/MostPopularList/MostPopularList";
import "bootstrap/dist/css/bootstrap.min.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <HomeHeading />
      <RegionsHomeList />
      <MostPopularList />
      <OffersList />
      <SubscribeUs />
      <Footer />
    </main>
  );
}
