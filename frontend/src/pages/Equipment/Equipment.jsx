import { useEffect, useState } from "react"
import api from "../../services/api"

export default function Equipment(){
    const [equipamento, setEquipamento] = useState([])

    useEffect(() => {
        buscarEquipamentos()
    }, [])

    const buscarEquipamentos = async () => {
        try {
            const response = await api.get('/equipment')
            console.log(response.data)
            setEquipamento(response.data)
        } catch (error){
            console.log("Erro ao buscar o estoque: ", error)
        }
    }
    return(
        <h1>Estoque</h1>
    )
}