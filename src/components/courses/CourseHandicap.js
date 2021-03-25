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
    const matchingCourse = courses.find(course => course.id === parseInt(courseId))
    // console.log(matchingCourse)
    // debugger
    const courseRating = matchingCourse?.rating
    const courseSlope = matchingCourse?.slope
    // console.log(courseRating)
    // console.log(courseSlope)

    const arrOfScores = userRoundsOnCourse.map(userRoundOnCourse => userRoundOnCourse.score)
    // console.log(arrOfScores)

    let totalScore = 0
    arrOfScores.map(score => totalScore = totalScore + score)
    // console.log(totalScore)

    const avScore = totalScore/arrOfScores.length
    // console.log(avScore)

    const scoreMinusRating = avScore - courseRating
    const multiply = scoreMinusRating * 113
    const handicap = multiply / courseSlope

    const roundedHandicap = Math.round(handicap)
    console.log('roundedHandicap: ', roundedHandicap);



    useEffect(() => {
        getRounds().then(getCourses)
    }, [courseId])

    return (
        <>
            {roundedHandicap}
        </>
    ) 
}