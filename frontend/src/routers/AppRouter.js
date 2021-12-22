import React from 'react'
import {Switch, Route} from 'react-router-dom'

//pages
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import NotFoundPage from '../pages/NotFoundPage/index'
import NewEntry from '../pages/NewEntry'
import List from '../pages/List'
import EditEntry from '../pages/EditEntry' 
import Services from '../pages/Services'

//helpers
import routes from '../helpers/routes'


//public or private
import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'



export default function AppRouter() {
    return (
        <>
        <Switch>
            <PrivateRoute hasRole="user" exact path={routes.home} component={HomePage} />
            <PublicRoute exact path={routes.login} component={LoginPage} />
            <PrivateRoute hasRole="user" exact path={routes.new()} component={NewEntry} />
            <PrivateRoute hasRole="user" exact path={routes.edit()} component={EditEntry} />
            <PrivateRoute hasRole="user" exact path={routes.list} component={List} />
            <PrivateRoute hasRole="user" exact path={routes.services()} component={Services} />
            <Route exact path='*' component={NotFoundPage} />
        </Switch>

        </>
    )
}
