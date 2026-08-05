import styles from "./styles.module.css"

export default function ButtonAction(props){
    return(
        <button className={styles.button}>{props.children}</button>
    )
}