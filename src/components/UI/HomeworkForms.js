import React from "react";
import FormItem from "./Form";
import { useState } from "react";
import Form from "./Form";


const emptyHomework = {
    Details: "Write an essay",
    DueDay: "2023-03-23"
};
export default function HomeworkForm({ onDismiss, onSubmit, initialHomework=emptyHomework}) {
    //Initialisation--------------------------------
    const isValid = {
        Details: (name) => name.length > 10,
        DueDay:(date)=> date.length >= 10
    }
    const errorMessage = {
        Details: "Field to short",
        DueDay: "Invalid Day",
    }
    const [homework,errors,changeHandler,handleSubmit] = Form.useForm(initialHomework,{isValid,errorMessage},onDismiss,onSubmit);
    //View------------------------------------------
    return (
        <Form className="BorderedForm" onDismiss={onDismiss} onSubmit={handleSubmit}>
            <Form.Item className='items'
                label="Details"
                htmlFor="Details"
                error={errors.Details}>
                <input
                    type="text"
                    name="Details"
                    value={homework.Details}
                    onChange={changeHandler}
                />
            </Form.Item>
            <Form.Item className='items'
                label="Due day"
                htmlFor="DueDay"
                error={errors.DueDay}>
                <input
                    type="text"
                    name="DueDay"
                    value={homework.DueDay}
                    onChange={changeHandler}
                />
            </Form.Item>
        </Form>
    )
}