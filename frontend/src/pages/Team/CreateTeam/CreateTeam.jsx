import styles from "./styles.module.css"
import api from "../../../services/api"
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function CreateBrand() {
    const [team, setteam] = useState("")
    const navigate = useNavigate()

    async function handleSubmit(event) {
        event.preventDefault()
        try {
            const response = await api.post("/team", {
                name: team.toUpperCase()
            })
            alert(`Turma ${response.data.name} cadastrada com sucesso!`)
            navigate('/team')
        } catch (error) {
            if (error.response) {
                if (error.response.status === 409) {
                    alert("Essa turma já está cadastrada no sistema!")
                    setteam("")
                } else {
                    alert("Erro ao cadastrar turma. tente novamente")
                }
            } else {
                alert("Erro de conexão com o servidor.")
            }
            console.log("Erro ao cadastrar turma", error)
        }
    }
    return (
        <section className={styles.newteam}>
            <h1>Cadastrar Turma</h1>
            <form className={styles.teamForm} onSubmit={handleSubmit}>
                <label>Nome: </label>
                <input
                    type="text"
                    name="team"
                    id="team"
                    value={team}
                    onChange={(e) => setteam(e.target.value)}
                />
                <button type="submit">Cadastrar</button>
            </form>
        </section>
    )
}