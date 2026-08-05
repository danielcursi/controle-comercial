import ButtonAction from "../../components/ButtonAction/ButtonAction";
import ButtonAdd from "../../components/ButtonAdd/ButtonAdd";
import styles from "./styles.module.css"
import { LuPencil } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";

import usuarios from '../../data/usuarios.json'


export default function Brand() {
    return (
        <section>
            <section className={styles.top}>
                <h1>Marcas</h1>
                <ButtonAdd link="/brand/new"/>
            </section>
            <section className={styles.brand}>
                <ul>
                    {usuarios.map((brand) => (
                        <li key={brand.id}>
                            {brand.nome}
                            <div>
                            <ButtonAction><LuPencil /></ButtonAction>
                            <ButtonAction><FaRegTrashAlt style={{ color: '#c93e4f' }}/></ButtonAction>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </section>
    )
}