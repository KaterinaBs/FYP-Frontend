import React from "react";
import { useState } from "react";


function Panel({children,title, onDelete,onEdit}){
    const [open,setOpen] = useState(false);

    const togglePanel = () =>{
        setOpen(!open);
    };
    return (
        <div className="wrapper">
            <div className="panels" >
                <div className="items">
                    <div className="title" onClick={togglePanel}>
                        <p className="panelTitle">{title}</p>
                        <span> {open ? '-' : '+'}</span>
                    </div>
                    {open && <main className="content">{children}</main>
                    }
                </div>
            </div>
        </div>
    );
}

export default Panel;

