import React from 'react';
import './Card.css'

export function CardContainer ({children, className}){
    return (
        <div className={"CardContainer " + className}>
            {children}
        </div>
    )
}


export function Card ({children}){
    return (
        <div className={" Card " } >
            {children}
        </div>
    );

}