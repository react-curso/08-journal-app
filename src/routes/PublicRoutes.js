import React from 'react'
import { Redirect, Route } from 'react-router-dom'

export const PublicRoutes = ({ isLoggedIn , component : Component , ...rest}) => {
    return (
        <div>
            <Route {...rest}
                component = { (props) => (
                        (!isLoggedIn)
                        ? <Component {...props} />  // Not authentication
                        : <Redirect to="/" /> // Yes authentication
                )}
            />
            
        </div>
    )
}
