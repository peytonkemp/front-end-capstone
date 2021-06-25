import React, { useContext, useEffect, useState } from "react"
import { RoundContext } from "./RoundProvider"
import { useHistory, useParams } from "react-router-dom";
import "./Round.css"
import { CourseContext } from "../courses/CourseProvider";

export const RoundForm = () => {
    const { getRounds, addRound, getRoundById, saveRound, updateRound } = useContext(RoundContext)
    const { courses, getCourses } = useContext(CourseContext)
    const currentUserId = parseInt(sessionStorage.getItem("app_user_id"))

    const [round, setRound] = useState({
        userId: currentUserId,
        courseId: 0,
        score: "",
        date: ""
    })

    const history = useHistory()
    const { roundId } = useParams()

    useEffect(() => {
        getRounds().then(getCourses).then(() => {
            if (roundId) {
                getRoundById(roundId)
                    .then(round => {
                        setRound(round)
                    })
            }
        })
    }, [])


    const handleControlledInputChange = (event) => {
        const newRound = { ...round }
        newRound[event.target.id] = event.target.value
        setRound(newRound)
    }


    const handleSaveRound = () => {
        if (round.score === 0 || round.date === "") {
            window.alert("Please complete all fields")
        } else {
            if (roundId) {
                updateRound({
                    courseId: parseInt(round.courseId),
                    score: parseInt(round.score),
                    date: round.date,
                    userId: round.userId,
                    id: roundId
                })
                    .then(() => history.push("/"))
            } else {
                addRound({
                    courseId: parseInt(round.courseId),
                    score: parseInt(round.score),
                    date: round.date,
                    userId: currentUserId
                })
                    .then(() => history.push("/"))
            }
        }
    }


    return (
        <form className="roundForm">
            <h2 className="roundFormTitle">{roundId ? "Edit Round" : "Add Round"}</h2>
            <fieldset className="fieldset">
                <select className="form__dropdown" value={round.courseId} name="courseId" onChange={handleControlledInputChange} id="courseId">
                    <option value="0">Please select a course...</option> {
                        courses.map(course => {
                            return <option key={course.id} value={course.id}>{course.name}</option>
                        })
                    }
                </select>
                <div className="score__div">
                    <label htmlFor="roundScore">Round Score </label>
                    <input type="text" name="roundScore" id="score" defaultValue={round.score} onChange={handleControlledInputChange} required className="form-control" placeholder="Strokes" ></input>
                </div>
                <div className="date__div">
                    <label htmlFor="roundDate">Date Played </label>
                    <input type="text" name="roundDate" id="date" onChange={handleControlledInputChange} required className="form-control" placeholder="ex. 6/25/20" value={round.date}></input>
                </div>
                <button className="btn btn-primary"
                    onClick={event => {
                        event.preventDefault()
                        handleSaveRound()
                    }}>
                    {roundId ? "Save Round" : "Add Round"}
                </button>
            </fieldset>
        </form>
    )

}