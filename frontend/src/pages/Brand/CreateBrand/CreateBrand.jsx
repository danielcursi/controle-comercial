import styles from "./styles.module.css"
import api from "../../../services/api"
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function CreateBrand() {
    const [brand, setBrand] = useState("")
    const navigate = useNavigate()

    async function handleSubmit(event) {
        event.preventDefault()
        try {
            const response = await api.post("/brand", {
                name: brand.toUpperCase()
            })
            alert(`Marca ${response.data.name} cadastrada com sucesso!`)
            navigate('/brand')
        } catch (error) {
            if (error.response) {
                if (error.response.status === 409) {
                    alert("Essa marca já está cadastrada no sistema!")
                    setBrand("")
                } else {
                    alert("Erro ao cadastrar marca. tente novamente")
                }
            } else {
                alert("Erro de conexão com o servidor.")
            }
            console.log("Erro ao cadastrar marca", error)
        }
    }
    return (
        <section className={styles.newBrand}>
            <h1>Cadastrar marca</h1>
            <form className={styles.brandForm} onSubmit={handleSubmit}>
                <label>Nome: </label>
                <input
                    type="text"
                    name="brand"
                    id="brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                />
                <button type="submit">Cadastrar</button>
            </form>
        </section>
    )
}