import React from "react";
//import { useState } from "react";
import HomeworkForm from "./HomeworkForms";
import './modal.css'
import CloseIcon from '@mui/icons-material/Close';

const Modal  = ({open,onClose,children})=>{
    if(!open) return null
    return (
        <div className = 'overlay'>
            <div className='modalContainer'>
                <div className="modalRight">
                <div><CloseIcon onClick={onClose} className='closeModalForm'> Close </CloseIcon></div>
                </div>
                {children}
            </div>
        </div>

    )
}
export default Modal;
