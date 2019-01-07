import axios from 'axios';

export const debounce = (fn, time) => {
    let timeout;
  
    return function() {
      const functionCall = () => fn.apply(this, arguments);
      
      clearTimeout(timeout);
      timeout = setTimeout(functionCall, time);
    }
}

export const handleSignIn = async (event) => {
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