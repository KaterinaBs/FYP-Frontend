import React from 'react';
import'./Form.css';
import { useState } from 'react';

export default function Form({children,onSubmit,onDismiss}){
     return (
        <div className="BorderedForm" >
            <div>
                {
                    children
                }
            </div>
            <div className='formButtons'>
            <button className = 'button1' onClick={onSubmit}>Submit</button>
            <button   className = 'button2' onClick={onDismiss}>Cancel</button>
            </div>
            
        </div>
    );
}

 function Item({children,label,htmlFor,error}){
    return(
        <div className="FormItem">
            <label className="FormLabel" htmlFor={htmlFor}> {label}</label>
            {
                children
            }
            {
                error && <p className="FormError">{error}</p>
            }
        </div>
    );

}
function useForm(initialRecord,{isValid,errorMessage},onDismiss,onSubmit){
    //State
    const [record, setRecord] = useState(initialRecord);
    const [errors, setErrors] = useState(               //reusable errors
        Object.keys(initialRecord).reduce(            //array of objects which has the record attributes
            (accum, key) => ({ ...accum, [key]: null }),{}) //loops through attributes and assign null to them
    );
    //Handlers
     const changeHandler = (event) => {    //is called whenever form is updated
        const {name, value } = event.target;
        setRecord({ ...record, [name]: value }); 
        setErrors({ ...errors, [name]: isValid[name](value) ? null : errorMessage[name] });
    };
    const isValidRecord = (record) => {  
        let isRecordValid = true;
        Object.keys(isValid).forEach((key) => {//chek if all individual values are corrent
            if (isValid[key](record[key])) { 
                errors[key] = null;    //***if all correct isRecordValid remials true
            } else {                                //if any of them is wrong set the isRecordValid false
                errors[key] = errorMessage[key];
                isRecordValid = false;
            }
        });
        return isRecordValid;
    }
    const handleSubmit = () => { 
        isValidRecord(record)&&  
        onSubmit(record) && onDismiss();//if form is valid then submit 
        setErrors({ ...errors });   // if not then populate some errors
    };
    return [record,errors,changeHandler,handleSubmit];
}
//Compose Form Object
Form.Item = Item;
Form.useForm = useForm;