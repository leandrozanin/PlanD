import React from 'react'
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom'

import { isAuthenticate } from './services/auth'
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Places from './pages/Places';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={ props => 
            isAuthenticate () ?  ( 
                <Component {...props} /> 
            ) : ( 
                <Redirect to={{ pathname: "/signin", state: { from : props.location } }} /> 
            )  
             
        }
    />
)

const Routes = () => 
    <BrowserRouter>
        <Switch>
            <PrivateRoute exact path="/" component={Home} /> 
            <Route exact path="/signin" component={SignIn} /> 
            <PrivateRoute exact path="/places" component={Places} /> 
            <Route exact path="*" component={ () => <h1>Page not found</h1> } /> 
        </Switch>
    </BrowserRouter>


export default Routes