import React from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { connect } from 'react-redux';
import {useTheme, useThemeUpdate} from "../themeChange";
import styles from '../../styles/header.module.css'

const Navbar = (props) => {

    const darkTheme = useTheme();
    const toggleTheme = useThemeUpdate();

    const themeStyles = {
        header: darkTheme ? `${styles.darkHeader}` : `${styles.lightHeader}`,
    }

    const { auth, profile } = props;
    const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />;
    return (
        <nav className={`${styles.header} ${themeStyles.header}`}>
            <div className={styles.linkContainer}>
                <Link to='/' className={styles.logo}>Water facilities</Link>
                <button type="submit" onClick={toggleTheme} className={styles.themeButton}>Theme change</button>
            </div>
            <div>{ auth.isLoaded && links }</div>
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