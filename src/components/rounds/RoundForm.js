import React, { useContext, useEffect, useState } from "react"
import { RoundContext } from "./RoundProvider"
import { useHistory, useParams } from "react-router-dom";
// import "./Round.css"

export const RoundForm = () => {
    const { getRounds, addRound, getRoundById, saveRound, updateRound } = useContext(RoundContext)
    const { roundId } = useParams()
    const currentUserId = parseInt(sessionStorage.getItem("teeBox_user"))

    const [round, setRound] = useState({
        id: 0,
        userId: currentUserId,
        courseId: 0,
        score: 0, 
        date: ""
    })

    const history = useHistory()

    useEffect(() => {
        getRounds()
        if (roundId) {
            getRoundById(roundId)
            .then(round => {
                setRound(round)
            })
        }
    }, [])

    const handleControlledInputChange = (event) => {
        const newRound = { ...round }
        newRound[event.target.id] = event.target.value
        setRound(newRound)
    }



    return (
        <form className="roundForm">
            <h2 className="roundFormTitle">{roundId ? "Edit Round" : "Add Round"}</h2>
            <fieldset>
                <div>
                    {/* COURSE DROPDOWN */}
                </div>
                <div>
                    <label htmlFor="roundScore">Round Score</label>
                    <input type="text" name="roundScore" id="score" onChange={handleControlledInputChange} required className="form-control" placeholder="Strokes" value={round.score}></input>
                </div>
                <div>
                    <label htmlFor="roundDate">Date</label>
                    <input type="text" name="roundDate" id="date" onChange={handleControlledInputChange} required className="form-control" placeholder="Date Played" value={round.date}></input>
                </div>
            </fieldset>
            <button className="btn btn-primary"
              onClick={event => {
                event.preventDefault()
                // handleClickSaveEvent()
            }}>
              Save Event
            </button>
        </form>
    )

}