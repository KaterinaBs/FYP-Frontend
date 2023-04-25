import './Footer.css';
import React from 'react';
import { useAuth } from '../auth/useAuth';


function Footer() {
    const { loggedInUser } = useAuth();
    return (
        loggedInUser &&
        <footer>
            <p>
                Developed by Aikaterini Basio
            </p>
        </footer>
    )
}

export default Footer;