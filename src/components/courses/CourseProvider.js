import { useState, createContext } from "react";

export const CourseContext = createContext()

export const CourseProvider = (props) => {
    const [ courses, setCourses ] = useState([])

    const getCourses = () => {
        return fetch("http://localhost:8088/courses")
        .then(response => response.json())
        .then(setCourses)
    }

    const addCourse = courseObj => {
        return fetch("http://localhost:8088/courses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(courseObj)
        })
        .then(getCourses)
    }


    return (
        <CourseContext.Provider value={{
            courses, getCourses, addCourse
        }}>
            {props.children}
        </CourseContext.Provider>
     )

}