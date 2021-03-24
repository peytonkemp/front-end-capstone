import { useContext, useEffect, useState } from "react"
import { RoundContext } from "./RoundProvider"
import { useHistory } from "react-router"
import { RoundCard } from "./RoundCard";
import "./Round.css"
import { CourseContext } from "../courses/CourseProvider";
import { RoundForm } from "./RoundForm";
// import ReactBootstrap from 'react-bootstrap'
// import { Dropdown } from "bootstrap";


export const RoundList = () => {
    const { courses, getCourses } = useContext(CourseContext)
    const { rounds, getRounds } = useContext(RoundContext)
    const [ filteredRounds, setFiltered ] = useState([])
    const history = useHistory()

    useEffect(() => {
        getCourses().then(getRounds)
    }, [])

    useEffect(() => {

    })

    return (
        <>
            <header>
                <h1>TeeBox</h1>
            </header>
            <section>
                <h3>Rounds</h3>
                <div className="rounds">

                    <div className="filterDropdown">
                        <h5>Filter by course</h5>

                        <select className="dropdownBox" value={rounds.courseId} name="courseId" id="courseId" onChange={(e) => setFiltered(e.target.value)}>

                            <option value="0">Filter by course...</option> {
                                courses.map(course => {
                                    return <option key={course.id} value={course.id}>{course.name}</option>
                                })
                            }
                            
                        </select>
                    </div>

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