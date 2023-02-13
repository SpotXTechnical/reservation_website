import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";
import Header from "@/Components/Header";
import "bootstrap/dist/css/bootstrap.min.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
    </main>
  );
}
