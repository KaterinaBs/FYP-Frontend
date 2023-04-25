import React from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import './Layout.css';

function Layout(props) {
    
    return (
        <div className='centrepane'>
            <Header />
            <main>
                {props.children}
            </main>
            <Footer />
        </div>
        
    )
}

export default Layout;