import React from "react"
import Turtle from "./turtle"
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom"

function TurtleComponent() {
    console.log("tc mount")
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Turtle} />
                <Route exact path="/:height" component={Turtle} />
            </Switch>
        </Router>
    )
}

export default TurtleComponent