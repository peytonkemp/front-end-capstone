// import statements
import { Route } from "react-router-dom";
import { RoundProvider } from "./rounds/RoundProvider";
import { RoundList } from "./rounds/RoundList";
import { RoundForm } from "./rounds/RoundForm";
import { CourseProvider } from "./courses/CourseProvider"


export const ApplicationViews = () => {
    return (
        <>
            <RoundProvider>
                <CourseProvider>

                    <Route exact path="/">
                        <RoundList />
                    </Route>

                    <Route exact path="/create">
                        <RoundForm />
                    </Route>

                    <Route exact path="/edit/:roundId(\d+)">
                        <RoundForm />
                    </Route>

                </CourseProvider>
            </RoundProvider>
        </>
    )
}