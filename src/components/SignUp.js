import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import axios from 'axios';
import UserForm from './userForm'

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false,
            hasError: false,
            errorMessage: ''
        }
        this.email = "sydney@fife";
        this.password = "pistol";
    }
    handleSignUp = async (event) => {
        event.preventDefault();
        let uEmail = event.target.email.value;
        let uPassword = event.target.password.value;
        if(uEmail !== this.email) {
            this.setState({
                hasError: true,
                errorMessage: "Cannot find an account with entered email id"
            })
        } else if (uPassword !== this.password) {
            this.setState({
                hasError: true,
                errorMessage: "Entered password is wrong"
            })
        } else {
            await axios.post('https://reqres.in/api/register', { email: uEmail, password: uPassword })
            .then(response => {
                // handle success
                console.log(response);
            })
            .catch(error => {
                console.log(error.response.data.error);
                this.setState({
                    hasError: true,
                    errorMessage: error.response.data.error
                })
                this.props.history.push("/search");
            })
        }
    }
    render() {
        return (
            <div className="card card-login">
                <h4 className="m-b-6">Create new account</h4>
                <UserForm location="signup" hasError={this.state.hasError} errorMessage={this.state.errorMessage} handleFormSubmit={(event) => this.handleSignUp(event)} />
            </div>
        )
    }
}

export default withRouter(SignUp);