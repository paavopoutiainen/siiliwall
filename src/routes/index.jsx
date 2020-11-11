import React, { useEffect } from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import ProjectPage from '../pages/ProjectPage'
import BoardPage from '../pages/BoardPage'

export default function Routes() {
    const boardMatch = useRouteMatch('/boards/:id')
    const { v4: uuid } = require('uuid')
    const eventId = uuid()

    useEffect(() => {
        window.localStorage.setItem('eventId', eventId)
    }, [eventId])

    return (
        <Switch>
            <Route exact path="/">
                <ProjectPage eventId={eventId} />
            </Route>

            { boardMatch && (
                <Route exact path="/boards/:id">
                    <BoardPage id={boardMatch.params.id} eventId={eventId} />
                </Route>
            )}
        </Switch>
    )
}
