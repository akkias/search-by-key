import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import axios from 'axios';
import UserForm from './userForm'
class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false,
            hasError: false,
            errorMessage: ''
        }
        this.email = "peter@klaven";
        this.password = "cityslicka";
    }
    handleSignIn = async (event) => {
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
                isAuthenticated: true,
                hasError: true,
                errorMessage: "Entered password is wrong"
            })
        } else {
            await axios.post('https://reqres.in/api/login', { email: uEmail, password: uPassword })
            .then(response => {
                this.props.history.push("/search");
            })
            .catch(error => {
                console.log(error.response.data.error);
                this.setState({
                    hasError: true,
                    errorMessage: error.response.data.error
                })
            })
        }
    }
    render() {
        return (
            <div className="card card-login">
                <h4 className="m-b-6">Login to your account</h4>
                <UserForm location="signin" hasError={this.state.hasError} errorMessage={this.state.errorMessage} handleFormSubmit={(event) => this.handleSignIn(event)} />
            </div>
        )
    }
}

export default withRouter(SignIn);