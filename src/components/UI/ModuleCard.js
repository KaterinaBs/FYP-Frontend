import React from 'react';
import { Card } from './Card.js';
import './ModuleCard.css';
import { useLocation, useNavigate } from 'react-router-dom';


export default function ModuleCard({ module}) {

  const navigate = useNavigate();
  const state = useLocation()

  const navigate1 = (moduleId) => {
    console.log(`MODULE ID ${moduleId}`)
    navigate('/homework', { state: { moduleId: moduleId } })
  }
  const navigate2 = (moduleId) => {
    console.log(`MODULE ID ${moduleId}`)
    navigate('/assignments', { state: { moduleId: moduleId } })
  }


  return (
    <Card>
      <div className="cardContainer">
        <div className="cardLayout">
          <div className="cardImg">
            <img src={module.image} alt='cardImage' />
          </div>
          <div className="cardDetails">
            <h1>{module.ModuleName} </h1>
            <h1>({module.ModuleCode})</h1>
            <div className='CardButtons'>
              <button  className = 'viewHomework' onClick= {()=>navigate1(module.ModuleId)} > View Homework </button>
              <button className='assignmentskButton' onClick={()=>navigate2(module.ModuleId)}> View Assignments </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}