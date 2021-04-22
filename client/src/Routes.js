import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import Signup from './auth/Signup';
import Signin from './auth/Signin';
import Activate from './auth/Activate';
import Forgot from './auth/Forgot';
import Reset from './auth/Reset';
import Posts from './user/Posts';
import UserPage from './user/UserPage';

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component= {App}/>
                <Route path="/signup" exact component= {Signup}/>
                <Route path="/signin" exact component= {Signin}/>
                <Route path="/auth/activate/:token" exact component={Activate} />
                <Route path="/auth/password-forgot" exact component={Forgot} />
                <Route path="/auth/password-reset/:token" exact component={Reset} />
                <Route path="/post" exact component= {Posts}/>
                <Route path="/:user" exact component= {UserPage}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;