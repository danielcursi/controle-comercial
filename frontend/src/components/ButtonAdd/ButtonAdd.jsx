import { Link } from "react-router-dom";
import styles from "./styles.module.css"

export default function ButtonAdd(props){
    return(
        <Link className={styles.button} to={props.link}>+  Adicionar</Link>
    )
}