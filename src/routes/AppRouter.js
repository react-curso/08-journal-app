import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from 'react-router-dom'
import { useDispatch } from 'react-redux';

import { firebase } from '../firebase/firebase-config';
import { JournalScreen } from '../components/journal/JournalScreen'
import { AuthRouter } from './AuthRouter'
import { login } from '../actions/auth';
import { PublicRoutes } from './PublicRoutes';
import { PrivateRoutes } from './PrivateRoutes';
import { LoadingScreen } from '../components/LoadingScreen';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

    // [true is not Authenticated] [False is yes Authenticated];
    const [checking, setChecking] = useState(true);

    // [false is not Authenticated] [True is yes Authenticated]
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const dispatch = useDispatch();

    // Always change on auth change [Login]
    useEffect(() => {
        
        // State The Authentication User Change When Route Change
        firebase.auth().onAuthStateChanged( (user) => {
            if (user?.uid) {

                setIsLoggedIn(true); // User if exists

                dispatch( login(user.uid, user.displayName) ); // login user if exists

                dispatch( startLoadingNotes( user.uid ) ); // Add Notes in State Redux

            } else {
                setIsLoggedIn(false); // User doesn't exists
            }
            setChecking(false);
        })

    }, [dispatch])

    // Page checking authentication
    if (checking) {
        return (
            <LoadingScreen />
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                   
                    <PublicRoutes
                        path="/auth"
                        isLoggedIn={ isLoggedIn }
                        component= { AuthRouter }
                    />

                    <PrivateRoutes 
                        exact
                        path="/"
                        isLoggedIn={ isLoggedIn }
                        component= { JournalScreen }
                    />


                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
    )
}
