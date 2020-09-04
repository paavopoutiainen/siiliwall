import React from 'react';
import { Switch, Route } from 'react-router-dom';
import BoardView from "../pages/BoardView"
import Home from "../pages/Home"
export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={BoardView} />
            <Route path="/home" exact component={Home} />
        </Switch>
    );
}