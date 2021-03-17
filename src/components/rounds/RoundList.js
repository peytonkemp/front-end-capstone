import { useContext, useEffect } from "react"
import { RoundContext } from "./RoundProvider"
import { useHistory } from "react-router"
import { RoundCard } from "./RoundCard";
import ReactBootstrap from 'react-bootstrap'
import { Dropdown } from "bootstrap";


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
                <h3>Rounds</h3>
                <div className="rounds">
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Dropdown Button
                        </Dropdown.Toggle>
                    </Dropdown>
                </div>
            </section>
        </>
    )
}