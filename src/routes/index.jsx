import React, { useEffect } from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import BoardPage from '../pages/BoardPage'

export default function Routes() {
    const match = useRouteMatch('/boards/:id')
    const { v4: uuid } = require('uuid')
    const eventId = uuid()

    useEffect(() => {
        window.localStorage.setItem('eventId', eventId)
    }, [eventId])

    return (
        <Switch>
            <Route exact path="/">
                <LandingPage />
            </Route>
            { match && (
                <Route exact path="/boards/:id">
                    <BoardPage id={match.params.id} eventId={eventId} />
                </Route>
            )}
        </Switch>
    )
}
