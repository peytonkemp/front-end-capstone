// import statements
import { Route } from "react-router-dom";
import { RoundProvider } from "./rounds/RoundProvider";
import { RoundList } from "./rounds/RoundList";
import { RoundForm } from "./rounds/RoundForm";


export const ApplicationViews = () => {
    return (
        <>
            <RoundProvider>
                <CourseProvider>

                    <Route exact path="/">
                        <RoundList />
                    </Route>

                    <Route path="/create">
                        <RoundForm />
                    </Route>

                </CourseProvider>
            </RoundProvider>
        </>
    )
}