import React from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { connect } from 'react-redux';
import {useTheme, useThemeUpdate} from "../themeChange";

const Navbar = (props) => {

    const toggleTheme = useThemeUpdate();
    const darkTheme = useTheme();

    const themeStyles = {
        className: darkTheme ? 'darkTheme' : 'nav-bar blue lighten-2'
    }

    const { auth, profile } = props;
    const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />;
    return (
        <nav className={themeStyles.className}>
            <div className="container">
                <Link to='/' className="brand-logo">Water facilities</Link>
                { auth.isLoaded && links }
            </div>
        </nav>
    )
} 

const mapStateToProps = (state) => {
    return {
      auth: state.firebase.auth,
      profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Navbar);