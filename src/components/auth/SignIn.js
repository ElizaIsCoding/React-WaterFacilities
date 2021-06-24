
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions';
import { Redirect } from 'react-router-dom';


 class SignIn extends Component {
     state = {
        email: '',
        password: ''
     }
     handleChange = (e) => {
         this.setState({
            [e.target.id]: e.target.value
         })
     }
     handleSubmit = (e) => {
         e.preventDefault();
         this.props.signIn(this.state)
    }
    render() {
        const { authError, auth } = this.props;
        if(auth.uid) return <Redirect to='/' />
        return (
            <div className="container row">
            <form onSubmit={this.handleSubmit} className="in white center-align z-depth-4">
                <h5 className="grey-text text-darken-3">Sign in</h5>
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" onChange={this.handleChange} />
                </div>
                <div className="input-field">
                    <label htmlFor="password">password</label>
                    <input type="password" id="password" onChange={this.handleChange } />
                </div>
                <div className="input-field">
                    <button className="btn z-depth-0">Log In</button>
                    <div className='center red-text'>
                        { authError ? <div className="error-msg">{authError}</div> : null }
                    </div>
                </div>
            </form>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
      authError: state.auth.authError,
      auth: state.firebase.auth
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (credentials) => dispatch(signIn(credentials))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);




