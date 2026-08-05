import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import styles from "./styles.module.css"
import HeaderTop from "../components/HeaderTop/HeaderTop";

export default function RootLayout() {
    return (
        <>
            <div className={styles.layout}>
                <Header />
                <main className={styles.main}>
                    <HeaderTop />
                    <Outlet/>
                </main>

            </div>
            <footer className={styles.footer}>
                <p>Criado por Daniel Cursi</p>
            </footer>
        </>
    )
}