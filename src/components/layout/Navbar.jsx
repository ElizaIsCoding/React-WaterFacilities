import React from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { connect } from 'react-redux';
import {useTheme} from "../themeChange";
import styles from '../../styles/header.module.css'
import globalStyles from '../../styles/global.module.css'

const Navbar = (props) => {

    const darkTheme = useTheme();

    const themeStyles = {
        header: darkTheme ? `${styles.darkHeader}` : `${styles.lightHeader}`,
    }

    const { auth, profile } = props;
    const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />;
    return (
        <nav className={globalStyles.container}>
            <div className={styles.link}>
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