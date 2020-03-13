import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Board from "../pages/Board"
import Home from "../pages/Home"
export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Board} />
            <Route path="/home" exact component={Home} />
        </Switch>
    );
}