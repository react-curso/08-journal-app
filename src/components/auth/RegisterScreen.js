import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import validator from 'validator';
import { useForm } from '../../hooks/useForm'
import { removeError, setError } from '../../actions/ui';
import { startRegisterEmail } from '../../actions/auth';

export const RegisterScreen = () => {

    let message = '';

    const dispatch = useDispatch();

    const { msgError } = useSelector(state => state.ui);


    const { handleChange, formValue: { name, email, password, password2 } } = useForm({
        name: 'kevin david ',
        email: 'kevin@gmail.com',
        password: '123456',
        password2: '123456',
    })


    const handleRegister = e => {
        e.preventDefault();

        if (formValid()) {

            // Form validate true 
            dispatch( startRegisterEmail(email , password , name) );
            return;
        }

        dispatch(setError(message)); // Error Redux state [ui]
    }

    const formValid = () => {

        if (name.trim().length === 0) {
            message = 'Enter a name';
            return false;
        } else if (!validator.isEmail(email)) {
            message = 'Enter a email valid';
            return false;
        } else if (!validator.isLength(password, { min: 5 }) || !validator.isLength(password2, { min: 5 })) {
            message = 'Very weak password'
            return false;
        } else if (!validator.equals(password, password2)) {
            message = 'Passwords do not match'
            return false;
        }

        // Remove Error Redux state [ui]
        dispatch(removeError());

        return true;
    }

    return (
        <div>
            <h3 className="auth_title mb-5">Register</h3>

            <form onSubmit={handleRegister}>

                {
                    msgError  &&
                    <div className="auth_alert-error">
                        {msgError}
                    </div>
                }


                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth_input mb-5"
                    autoComplete="off"
                    value={name}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth_input mb-5"
                    autoComplete="off"
                    value={email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth_input mb-5"
                    value={password}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    className="auth_input mb-5"
                    value={password2}
                    onChange={handleChange}
                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"

                >
                    Register
                </button>



                <Link to="/auth/login" className="link mt-5">
                    Login
                </Link>

            </form>
        </div>
    )
}
