import React, {Component} from 'react';
import UserForm from './userForm'

class SignUp extends Component {
    render() {
        return (
            <div className="card card-login">
                <h4 className="m-b-6">Login to your account</h4>
                <UserForm location="signup" />
            </div>
        )
    }
}

export default SignUp;