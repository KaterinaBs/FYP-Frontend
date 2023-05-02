import React from 'react';
import { useAuth } from '../auth/useAuth.js';
import { CardContainer } from '../UI/Card.js';
import ModuleCard from '../UI/ModuleCard.js';
import useLoad from '../api/useLoad.js';


export default function Home() {
    //Initialisation------------------------------
    const { loggedInUser } = useAuth();
    const endpoint = `/modules/teachers/${loggedInUser.TeacherId}`;
    //State-----------------------------------
    const [modules, ,loadingMessage,loadModules] = useLoad(endpoint);  //use state to store the modules [ name of the variable, function to set the varibles]
    //Context---------------------------------
    //Methods---------------------------------
    //View------------------------------------
    return (
        <section>
            {/* <div className='banner'><img src={Banner1} alt="bannerImage" /></div> */}
            <h1>My Modules</h1>
            {
                !modules // if modules have not been found
                    ? <p>{loadingMessage}</p> //display the loading message
                    : modules.length === 0 //when modules will load we check its length
                        ? <p>No modules found</p> // if its 0 modules not found
                        : <CardContainer>
                            {
                                modules.map((module) => //else print out modules code 
                                    <ModuleCard key={module.ModuleCode} module={module}/>
                                )
                                
                            }
                        </CardContainer>
            }
            

        </section>

    );
}
