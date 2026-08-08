import { useEffect, useState } from "react"
import ButtonAdd from "../../components/ButtonAdd/ButtonAdd"
import ButtonAction from "../../components/ButtonAction/ButtonAction";
import styles from "./styles.module.css"
import { LuPencil } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";
import api from "../../services/api";

export default function Team() {
    const [team, setTeam] = useState([])

    useEffect(() => {
        buscarTurmas()
    }, [])

    const buscarTurmas = async () => {
        try {
            const response = await api.get('/team')
            console.log(response.data)
            setTeam(response.data)
        } catch (error) {
            console.log("Erro ao buscar as marcas", error)
        }
    }

    const deletarTurma = async (id) => {
        try{
            await api.delete(`/team/${id}`)
            setTeam((prev) => prev.filter((item) => item.id !== id ))
        } catch(error){
            console.log("Erro inesperado", error)
            alert("Erro ao deletar marca")
        }
    }
    return (
        <section>
            <section className={styles.top}>
                <h1>Turmas</h1>
                <ButtonAdd link="/team/new" />
            </section>
            <section className={styles.brand}>
                {team.length > 0 ? (
                    <ul>
                        {team.map((team) => (
                            <li key={team.id}>
                                {team.name}
                                <div>
                                    <ButtonAction onClick={() => deletarTurma(team.id)}><FaRegTrashAlt style={{ color: '#c93e4f' }} /></ButtonAction>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Adicione uma turma</p>
                )}
            </section>
        </section>
    )
}