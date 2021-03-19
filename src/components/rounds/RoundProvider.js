import { useState, createContext } from "react";

export const RoundContext = createContext()

export const RoundProvider = (props) => {
    const [ round, setRound ] = useState([])

    const getRounds = () => {
        return fetch("http://localhost:8088/rounds")
        .then(response => response.json())
        .then(setRound)
    }

    const addRound = roundObj => {
        return fetch("http://localhost:8088/rounds", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(roundObj)
        })
        .then(getRounds)
    }

    const deleteRound = roundId => {
        return fetch(`http://localhost:8088/rounds/${roundId}`, {
            method: "DELETE"
        })
        .then(getRounds)
    }

    const updateRound = (roundObj) => {
        return fetch(`http://localhost:8088/rounds/edit/${roundObj.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          }, 
          body: JSON.stringify(roundObj)
        })
        .then(getRounds)
      }



    return (
        <RoundContext.Provider value={{
            round, getRounds, addRound, deleteRound, updateRound
        }}>
            {props.children}
        </RoundContext.Provider>
     )
}