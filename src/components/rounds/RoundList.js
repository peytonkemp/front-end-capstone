import { useContext, useEffect } from "react"
import { RoundContext } from "./RoundProvider"
import { useHistory } from "react-router"
import { RoundCard } from "./RoundCard";
// import ReactBootstrap from 'react-bootstrap'
// import { Dropdown } from "bootstrap";
import "./Round.css"
import { CourseContext } from "../courses/CourseProvider";


export const RoundList = () => {
    const { courses, getCourses } = useContext(CourseContext)
    const { rounds, getRounds } = useContext(RoundContext)
    const history = useHistory()

    useEffect(() => {
        getCourses().then(getRounds)
    }, [])


    return (
        <>
            <header>
                <h1>TeeBox</h1>
            </header>
            <section>
                <h3>Rounds</h3>
                <div className="rounds">
                    {/* <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Dropdown Button
                        </Dropdown.Toggle>
                    </Dropdown> */}
                    <div className="roundCards">
                        {  
                            rounds.map(round => {
                                const course = courses.find(c => c.id === round.courseId)
                                return <RoundCard key={round.id} round={round} course={course} />
                            })
                        }
                    </div>
                    <div className="addRoundButton">
                        <button className="roundButton" onClick={() => {history.push("/create")}}>Add Round</button>
                    </div>
                    <div className="handicapDiv">
                        <button className="calculateHandicapButton">Calculate Handicap</button>
                    </div>
                </div>
            </section>
        </>
    )
}