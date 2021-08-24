import React from 'react'
import { Redirect, Route } from 'react-router-dom'

export const PrivateRoutes = ( {isLoggedIn , component : Component , ...rest} ) => {
    return (
        <div>
            <Route {...rest}
                component= { (props) => (
                    ( isLoggedIn )
                    ? <Component {...props} /> // Yes authentication
                    : <Redirect to="/auth" /> // Not authentication
                )}

            />
        </div>
    )
}
