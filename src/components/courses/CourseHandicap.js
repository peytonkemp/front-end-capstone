//  ((score - rating) * 113 ) / slope = handicap

import { useContext, useEffect } from "react"
import { RoundContext } from "../rounds/RoundProvider"
import { CourseContext } from "./CourseProvider"


export const Handicap = ({courseId}) => {
    const { courses, getCourses } = useContext(CourseContext)
    const { rounds, getRounds } = useContext(RoundContext)
    const currentUserId = parseInt(sessionStorage.getItem("app_user_id"))
    // console.log(currentUserId)
    // console.log(courseId)
    const userRounds = rounds.filter(round => round.userId === currentUserId)
    const userRoundsOnCourse = userRounds.filter(round => round.courseId === parseInt(courseId))

    const courseRating = courses.map(course => {
        if (course.id === parseInt(courseId)) {
           return course.rating
        }
    })
    const courseSlope = courses.map(course => {
        if (course.id === parseInt(courseId)) {
           return course.slope
        }
    })
    console.log(courseRating.find(r => r !== undefined))
    console.log(courseSlope.find(r => r !== undefined))
    // debugger
    // console.log(userCourse)

    // console.log(userRounds)

    useEffect(() => {
        getRounds().then(getCourses)
    }, [courseId])

    return (
        <>
            
        </>
    ) 
}