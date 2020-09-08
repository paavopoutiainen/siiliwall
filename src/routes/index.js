import React from 'react'
import { Switch, Route } from 'react-router-dom'
//import BoardView from "../pages/BoardView"
import LandingPage from '../pages/LandingPage'

export default function Routes() {
    return (
        <Switch>
            <Route path="/" component={LandingPage} />
        </Switch>
    )
}