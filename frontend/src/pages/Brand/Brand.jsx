import ButtonAction from "../../components/ButtonAction/ButtonAction";
import ButtonAdd from "../../components/ButtonAdd/ButtonAdd";
import styles from "./styles.module.css"
import { LuPencil } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";
import api from "../../services/api";

import usuarios from '../../data/usuarios.json'
import { useEffect, useState } from "react";


export default function Brand() {
    const [brand, setBrand] = useState([])

    useEffect(() => {
        buscarMarcas()
    }, [])

    const buscarMarcas = async () => {
        try {
            const response = await api.get('/brand')
            console.log(response.data)
            setBrand(response.data)
        } catch (error) {
            console.log("Erro ao buscar as marcas", error)
        }
    }

    const deletarMarca = async (id) => {
        try{
            await api.delete(`/brand/${id}`)
            // atualiza o array de marcas na tela, retira a marca deletada
            setBrand((prev) => prev.filter((item) => item.id !== id))
        } catch (error){
            console.log("Erro inesperado", error)
            alert("Erro ao deletar marca")
        }
    }

    return (
        <section>
            <section className={styles.top}>
                <h1>Marcas</h1>
                <ButtonAdd link="/brand/new"/>
            </section>
            <section className={styles.brand}>
                <ul>
                    {brand.map((brand) => (
                        <li key={brand.id}>
                            {brand.name}
                            <div>
                            <ButtonAction onClick={() => deletarMarca(brand.id)}><FaRegTrashAlt style={{ color: '#c93e4f' }}/></ButtonAction>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </section>
    )
}