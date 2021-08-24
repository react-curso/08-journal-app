import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { LoginScreen } from '../components/auth/LoginScreen'
import { RegisterScreen } from '../components/auth/RegisterScreen'


export const AuthRouter = () => {
    return (
        <div className="auth_main">

            <div className="auth_box-container">
                <Switch>

                    {/* Login Screen */}
                    <Route exact path="/auth/login" component={LoginScreen} />

                    {/* Register Screen */}
                    <Route exact path="/auth/register" component={RegisterScreen} />

                    <Redirect to="/auth/login" />

                </Switch>
            </div>

        </div>
    )
}
