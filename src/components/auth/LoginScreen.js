import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {

    // Called to Dispatch
    const dispatch = useDispatch();

    const { loading } = useSelector(state => state.ui);

    const { handleChange, reset, formValue: { email, password } } = useForm({
        email: 'kevin@gmail.com',
        password: '123456'
    })

    //  Login Normal
    const handleSubmit = e => {
        e.preventDefault();

        // reducer Normal from ./action/auth
        dispatch(startLoginEmailPassword(email, password));

        reset();
    }

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin());
    }

    return (
        <div>
            <h3 className="auth_title mb-5">Login</h3>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth_input mb-5"
                    autoComplete="off"
                    onChange={handleChange}
                    value={email}
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth_input mb-5"
                    onChange={handleChange}
                    value={password}
                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={ loading }
                >
                    Login
                </button>

                <hr />

                <div className="auth_social-network">
                    <p></p>
                    <div
                        className="google-btn"
                        onClick={handleGoogleLogin}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text" >
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link to="/auth/register" className="link">
                    Create new account
                </Link>

            </form>
        </div>
    )
}
