import React, { useContext } from "react"
import { useHistory } from "react-router"
// import "./Round.css"
import { RoundContext } from "./RoundProvider"

export const RoundCard = ({round, course}) => {
    const { deleteRound, updateRound } = useContext(RoundContext)
    const history = useHistory()

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
            <h3 className="courseName">{course.name}</h3>
            <h4 className="roundScore">{round.score}</h4>
            <button className="editRoundButton" onClick={handleEdit}> Edit Event </button>
            <button className="roundDeleteButton" onClick={handleDelete}>Delete Round</button>
        </section>
    )
}