import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';
import {useThemeUpdate} from "../themeChange";


const SignedInLinks = (props) => {
    const toggleTheme = useThemeUpdate();

    return (
        <ul className="right">
            <li><NavLink to='/create'>New Case</NavLink></li>
            <li><a href='signIn' onClick={props.signOut}>Log Out</a></li>
            <button onClick={toggleTheme}>Theme change</button>

            {/*<li><NavLink to='/' className="btn btn-floating blue-grey lighten-3 black-text fontWeight 400px">*/}
            {/*    {props.profile.initials}*/}
            {/*</NavLink></li>*/}
        </ul>
    )
} 

const mapDispatchToProps = (dispatch) => {
    return{
      signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks);