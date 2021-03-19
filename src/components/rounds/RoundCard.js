import React, { useContext, useState } from "react"
import { useHistory } from "react-router"
import "./Round.css"
import { RoundContext } from "./RoundProvider"
import { useParams } from "react-router-dom";

export const RoundCard = ({round, course}) => {
    // const {roundId} = useParams()
    const { deleteRound, updateRound } = useContext(RoundContext)
    const history = useHistory()
    // const [round, setRound] = useState({})

    const handleDelete = () => {
        deleteRound(round.id)
        .then(() => {
            history.push("/")
        })
    }

    const handleEdit = () => {
        updateRound(round.id)
        .then(() => {
            history.push(`/edit/${round.id}`)
        })
    }

    return (
        <section className="roundCard">
            {/* <h3 className="courseName">{course.name}</h3> */}
            <h3 className="roundScore">{round.score} Strokes</h3>
            <h4 className="roundDate">{round.date}</h4>
            <button className="editRoundButton" onClick={handleEdit}> Edit Round </button>
            <button className="roundDeleteButton" onClick={handleDelete}>Delete Round</button>
        </section>
    )
}