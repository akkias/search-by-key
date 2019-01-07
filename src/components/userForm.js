import React from 'react';
import {Link} from 'react-router-dom';

const UserForm = (props) => {
    return(
        <form onSubmit={props.handleFormSubmit}>
        {props.hasError && props.errorMessage}
            <input className="m-b-4" placeholder="Enter your email" type="email" name="email" />
            <input className="m-b-4" placeholder="Enter your password" type="password" name="password" />
            <div className="login-actions">
            {props.location === "signin" ?
                <Link to="/signup">Create new account</Link>
                :
                <>
                Have an account?
                <Link to="/signin" className="m-l-1">Sign in</Link>
                </>
            }
                <button className="btn-submit m-l-a p-x-4 p-y-2" type="submit">
            {props.location === "signin" ?
                "Sign in" : "Sign up"
            }
                </button>
            </div>
        </form>
    )
}

export default UserForm;