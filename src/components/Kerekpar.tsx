import { useEffect, useState } from "react"
import type { KerekparType } from "../types/kerekparType"

function Kerekpar(){

    const URL = "/kerekparok.json"
    const [kerekparok, setkerekpar] = useState<KerekparType[]>([])
    
    useEffect(() => {
    async function adatokBetoltese(){
        const response = await fetch(URL)
        const data:KerekparType[] = await response.json()
        setkerekpar(data)
    }
    adatokBetoltese()
    }, [])

    return<>
    <h2>Kerekparok listaja</h2>
    <div className="container mt-3">
        {kerekparok.map((kerekpar) => (
            <div className="card">
                <div className="card-body">
                    <h3 className="card-title">{kerekpar.nev}</h3>
                    <p className="card-text"><em>{kerekpar.tipus}</em></p>
                    <a href="#" className="card-link">Card link</a>
                    <a href="#" className="card-link">Another link</a>
                </div>
            </div>
        ))}
        
    </div>
    </> 
}

export default Kerekpar