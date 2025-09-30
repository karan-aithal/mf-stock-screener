import React, { useState } from 'react';
import NavBar from './NavBar';

interface WelcomeScreenProps {
    onNavigateToLogin: () => void;
    onNavigateToRegister: () => void;
}

const WelcomePage: React.FC = (props) => {




    return (

        <div>
            <NavBar></NavBar>
            {/* <button onClick={props.onNavigateToLogin}>Login</button>
            <button onClick={props.onNavigateToRegister}>Register</button> */}
        </div>
    );
};



export default WelcomePage;