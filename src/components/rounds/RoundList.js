import { useContext, useEffect, useState } from "react"
import { RoundContext } from "./RoundProvider"
import { useHistory } from "react-router"
import { RoundCard } from "./RoundCard";
import "./Round.css"
import { CourseContext } from "../courses/CourseProvider";
import { RoundForm } from "./RoundForm";
import { Handicap } from "../courses/CourseHandicap";
import { roundedHandicap } from "../courses/CourseHandicap";
// import ReactBootstrap from 'react-bootstrap'
// import { Dropdown } from "bootstrap";


export const RoundList = () => {
    const { courses, getCourses } = useContext(CourseContext)
    const { rounds, getRounds } = useContext(RoundContext)
    const [ filteredCourses, setFiltered ] = useState("0")
    const [ filteredRounds, setFilteredRounds ] = useState([])
    const [ roundedHandicap, setRoundedHandicap ] = useState([])
    const [ showHandicap, setShowHandicap ] = useState(false)

    const history = useHistory()

    useEffect(() => {
        getCourses().then(getRounds)
    }, [])

    useEffect(() => {
        if (filteredCourses !== "0") {
            const filter = rounds.filter(round => {
                return round.courseId === parseInt(filteredCourses)
            })
            setFilteredRounds(filter)
        } else {
            setFilteredRounds(rounds)
        }
    }, [filteredCourses, rounds])


    const calculateButton = () => {
        setShowHandicap(true)
    }


    return (
        <>
            <header className="header">
                <h1 className="h1">TeeBox</h1>
            </header>
            <section>
                <h1 className="h3">Rounds</h1>
                <div className="rounds">

                    <div className="filterDropdown">
                        <h5 className="h5" >Select a course</h5>
                        <select className="dropdownBox" value={rounds.courseId} name="courseId" id="courseId" onChange={(e) => {
                            setFiltered(e.target.value)
                            setShowHandicap(false)
                            }
                            }>

                            <option value="0">Filter by course...</option> {
                                courses.map(course => {
                                    return <option key={course.id} value={course.id}>{course.name}</option>
                                })
                            }
                            
                        </select>
                    </div>
                    <div className="addRoundButton">
                        <button className="roundButton" onClick={() => {history.push("/create")}}>Add Round</button>
                    </div>
                    <div>
                        <div className="handicapDiv">
                            <button className="calculateHandicapButton" onClick={calculateButton} >Calculate Handicap</button>
                            {filteredCourses !== "0" && showHandicap && <Handicap courseId={filteredCourses} />}
                        </div>
                    </div>
                    <div className="roundCards">
                        {  
                            filteredRounds.map(round => {
                                const course = courses.find(c => c.id === round.courseId)
                                return <RoundCard key={round.id} round={round} course={course} />
                            })
                        }
                    </div>
                </div>
            </section>
        </>
    )
}
