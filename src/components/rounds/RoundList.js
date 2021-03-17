import { useContext } from "react"
import { RoundContext } from "./RoundProvider"
import { useHistory } from "react-router"
import {  } from "";



export const RoundList = () => {
    const { rounds, getRounds } = useContext(RoundContext)
    const history = useHistory()

    useEffect(() => {
        getRounds()
    }, [])


    return (
        <>
            <header>
                <h1>TeeBox</h1>
            </header>
            <section>
                
            </section>
        </>
    )
}