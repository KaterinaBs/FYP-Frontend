import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/useAuth.js';
import useLoad from '../api/useLoad.js';
import { useState } from 'react';
import image from '../../assets/H.png';
import './signin.css';

function SignIn() {
    //Initialisation------------------------------
    const { logIn } = useAuth();
    const navigate = useNavigate();
    const { state } = useLocation();

    //State-----------------------------------
    const [teachers, , loadingTeacherMessage] = useLoad('/teachers');
    const [selectedUser, setSelectedUser] = useState(null);
    //Context---------------------------------
    //Methods---------------------------------
    const handleSubmit = (event) => {
        event.preventDefault();
        logIn(selectedUser);
        navigate(state?.path || '/');

    }
    const handleTeacherChange = (event) => setSelectedUser(teachers[parseInt(event.target.value)]);

    //View------------------------------------
    return (
        <section>
            <div className='outerContainer'>
                <div class="background">
                    <img className='image' src={image}></img>
                </div>
                <form onSubmit={handleSubmit}>
                    <h1> Sign In</h1>
                    <label> Choose your Email
                    </label>
                    {
                        !teachers
                            ? <p>{loadingTeacherMessage}</p>
                            : <>
                                <select onChange={handleTeacherChange}>
                                    <option value={null}>
                                        Select an Email
                                    </option>
                                    {
                                        teachers.map((user, index) =>
                                            <option key={user.TeacherId} value={index}>
                                                {`${user.Email}`}
                                            </option>
                                        )}
                                </select>
                            </>
                    }
                    <button className='signIn ' type="submit">Log In</button>
                </form>
            </div>
        </section>

    )
}

export default SignIn;