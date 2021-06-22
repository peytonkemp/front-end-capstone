//  ((score - rating) * 113 ) / slope = handicap

import { useContext, useEffect } from "react"
import { RoundContext } from "../rounds/RoundProvider"
import { CourseContext } from "./CourseProvider"


export const Handicap = ({ courseId }) => {
    const { courses, getCourses } = useContext(CourseContext)
    const { rounds, getRounds } = useContext(RoundContext)
    const currentUserId = parseInt(sessionStorage.getItem("app_user_id"))
    
    const userRounds = rounds.filter(round => round.userId === currentUserId)
    const userRoundsOnCourse = userRounds.filter(round => round.courseId === parseInt(courseId))
    const matchingCourse = courses.find(course => course.id === parseInt(courseId))
    
    const courseRating = matchingCourse?.rating
    const courseSlope = matchingCourse?.slope
    

    const arrOfScores = userRoundsOnCourse.map(userRoundOnCourse => userRoundOnCourse.score)
    

    let totalScore = 0
    arrOfScores.map(score => totalScore = totalScore + score)
    
    const avScore = totalScore / arrOfScores.length

    const scoreMinusRating = avScore - courseRating
    const multiply = scoreMinusRating * 113

    const handicap = multiply / courseSlope

    const roundedHandicap = Math.round(handicap)


    useEffect(() => {
        getRounds().then(getCourses)
    }, [courseId])

    return (
        <>
            <div className="handicapDiv">
                {roundedHandicap}
            </div>
        </>
    )
}