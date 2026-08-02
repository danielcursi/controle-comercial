import { Link } from "react-router-dom"
import styles from "./styles.module.css"

export default function Header(){
    return(
        <header className={styles.header}>
            <nav className={styles.nav}>
                <section className={styles.logo}>
                    <h4>Controle Comercial</h4>
                    <p>Gestão de material rastreavel</p>
                </section>
                <section className={styles.links}>
                    <h4>Principal</h4>
                    <Link to={"/"}>Inicio</Link>
                    <Link to={"/equipment"}>Estoque</Link>
                </section>
                <section className={styles.links}>
                    <h4>Operações</h4>
                    <Link to={"/transfer"}>Transferências</Link>
                </section>
                <section className={styles.links}>
                    <h4>Cadastros</h4>
                    <Link to={"/center"}>Centros Logísticos</Link>
                    <Link to={"/team"}>Turmas</Link>
                    <Link to={"/electrician"}>Eletricistas</Link>
                    <Link to={"/material"}>Materiais</Link>
                    <Link to={"/brand"}>Marcas</Link>
                    <Link to={"/user"}>Usuarios</Link>
                </section>
            </nav>
        </header>
    )
}