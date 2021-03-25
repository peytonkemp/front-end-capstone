// ((score - rating) * 113) / slope = handicap

import { useContext, useEffect } from "react"
import { RoundContext } from "../rounds/RoundProvider"
import { CourseContext } from "./CourseProvider"


export const Handicap = ({courseId}) => {
    const { courses, getCourses } = useContext(CourseContext)
    const { rounds, getRounds } = useContext(RoundContext)
    const currentUserId = parseInt(sessionStorage.getItem("app_user_id"))
    // console.log(currentUserId)

    const userRounds = rounds.filter(round => round.userId === currentUserId)
    const userCourse = userRounds.filter(round => round.courseId === parseInt(courseId))
    // debugger
    console.log(userCourse)

    // console.log(userRounds)

    useEffect(() => {
        getRounds().then(getCourses)
    }, [courseId])

    return (
        <>
            
        </>
    ) 
}