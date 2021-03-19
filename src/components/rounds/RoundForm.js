import React, { useContext, useEffect, useState } from "react"
import { RoundContext } from "./RoundProvider"
import { useHistory, useParams } from "react-router-dom";
import "./Round.css"
import { CourseContext } from "../courses/CourseProvider";

export const RoundForm = () => {
    const { getRounds, addRound, getRoundById, saveRound, updateRound } = useContext(RoundContext)
    const { courses, getCourses } = useContext(CourseContext)
    const { roundId } = useParams()
    const currentUserId = parseInt(sessionStorage.getItem("teeBox_user"))

    const [round, setRound] = useState({
        id: 0,
        userId: currentUserId,
        courseId: 0,
        score: "", 
        date: ""
    })
    const [course, setCourses] = useState({
        id: 0,
        userId: currentUserId,
        courseId: 0,
        score: 0, 
        date: ""
    })

    const history = useHistory()

    useEffect(() => {
        getCourses()
        getRounds()
        if (roundId) {
            getRoundById(roundId)
            .then(round => {
                setRound(round)
            })
        }
    }, [])

    const handleControlledInputChange = (event) => {
        // debugger
        const newRound = { ...round }
        // const newCourse = { ...course }
        newRound[event.target.id] = event.target.value
        // newCourse[event.target.id] = event.target.value
        setRound(newRound)
        // setCourses(newRound)
    }


    const handleSaveRound = () => {
        if ( course.id === "" || round.score === "" || round.date === "" ) {
            window.alert("Please complete all fields")
        } else {
            if (roundId) {
                updateRound({
                    course: course.id,
                    score: round.score,
                    date: round.date,
                    userId: round.userId
                })
                .then(() => history.push("/"))
            } else {
                addRound ({
                    course: course.id,
                    score: round.score,
                    date: round.date
                })
                .then(() => history.push("/"))
            }
        }
    }
    

    return (
        <form className="roundForm">
            <h2 className="roundFormTitle">{roundId ? "Edit Round" : "Add Round"}</h2>
            <fieldset>
                <select onChange={handleControlledInputChange}>
                    <option value="0">Please select a course...</option> {
                        courses.map(course => {
                            return <option value={course.id}>{course.name}</option>
                        })
                    }
                </select>
                <div>
                    <label htmlFor="roundScore">Round Score</label>
                    <input type="text" name="roundScore" id="score" onChange={handleControlledInputChange} required className="form-control" placeholder="Strokes" value={round.score}></input>
                </div>
                <div>
                    <label htmlFor="roundDate">Date Played</label>
                    <input type="text" name="roundDate" id="date" onChange={handleControlledInputChange} required className="form-control" placeholder="ex. 6/25/20" value={round.date}></input>
                </div>
            </fieldset>
            <button className="btn btn-primary"
              onClick={event => {
                event.preventDefault()
                handleSaveRound()
            }}>
              {roundId ? "Save Round" : "Add Round"}
            </button>
        </form>
    )

}