import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Home from '../../page/Home';
import Group from '../../page/Group';
import User from '../../page/User';

const Routes = () => (
    <Switch>
        <Route path="/user" component={User} />
        <Route path="/group" component={Group} />
        <Route path="/" component={Home} />
    </Switch>
);

export default Routes