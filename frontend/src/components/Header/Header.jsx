import { Link } from "react-router-dom"
import styles from "./styles.module.css"
import { IoIosHome, IoIosPerson } from "react-icons/io";
import { FaBoxArchive, FaArrowRightArrowLeft, FaWarehouse, FaHelmetSafety } from "react-icons/fa6";
import { FaBoxOpen, FaUser } from "react-icons/fa";
import { BiExclude } from "react-icons/bi";
import { FcElectroDevices } from "react-icons/fc";


export default function Header(){
    return(
        <header className={styles.header}>
            <nav className={styles.nav}>
                <section className={styles.logo}>
                    <FcElectroDevices className={styles.icon}/>
                    <div>
                       <h4>Controle Comercial</h4>
                        <p>Gestão de material rastreavel</p> 
                    </div>
                </section>
                <section className={styles.links}>
                    <h4>Principal</h4>
                    <Link to={"/"}><IoIosHome />Inicio</Link>
                    <Link to={"/equipment"}><FaBoxArchive />Estoque</Link>
                </section>
                <section className={styles.links}>
                    <h4>Operações</h4>
                    <Link to={"/transfer"}><FaArrowRightArrowLeft />Transferências</Link>
                </section>
                <section className={styles.links}>
                    <h4>Cadastros</h4>
                    <Link to={"/center"}><FaWarehouse />Centros Logísticos</Link>
                    <Link to={"/team"}><FaHelmetSafety />Turmas</Link>
                    <Link to={"/electrician"}><IoIosPerson />Eletricistas</Link>
                    <Link to={"/material"}><FaBoxOpen />Materiais</Link>
                    <Link to={"/brand"}><BiExclude />Marcas</Link>
                    <Link to={"/user"}><FaUser />Usuarios</Link>
                </section>
            </nav>
        </header>
    )
}