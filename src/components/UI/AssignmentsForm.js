import React from "react";
import Form from "./Form";
import FormItem from "./Form";

const emptyAssignment = {
    AssignmentTitle:"Assignment Title",
    Details: "Write an essay",
    Deadline: "2023-03-23"
};
export default function AssignmentsForm({ onDismiss, onSubmit, initialAssignment=emptyAssignment}) {
    //Initialisation--------------------------------
     const isValid = {  
        AssignmentTitle:(name) => name.length > 10,
        Details: (name) => name.length > 10,
        Deadline:(date) => date.length >= 10
    }
   const errorMessage = {
        AssignmentTitle:"Field too short",
        Details: "Field to short",
        Deadline: "Invalid Day"   
    }
    const [assignment,errors,changeHandler,handleSubmit] = Form.useForm(initialAssignment,{isValid,errorMessage},onDismiss,onSubmit);
    //View------------------------------------------
    return (
        <Form className="AssignmentsBorderedForm" onDismiss={onDismiss} onSubmit={handleSubmit}>
            <Form.Item className='items'
                label="Title"
                htmlFor="Title"
                error={errors.AssignmentTitle}>
                <input
                    type="text"
                    name="AssignmentTitle"
                    value={assignment.AssignmentTitle}
                    onChange={changeHandler}
                />
            </Form.Item>
            <Form.Item className='items'
                label="Details"
                htmlFor="Details"
                error={errors.Details}>
                <input
                    type="text"
                    name="Details"
                    value={assignment.Details}
                    onChange={changeHandler}
                />
            </Form.Item>
            <Form.Item className='items'
                label="Due day"
                htmlFor="Deadline"
                error={errors.Deadline}>
                <input
                    type="text"
                    name="Deadline"
                    value={assignment.Deadline}
                    onChange={changeHandler}
                />
            </Form.Item>
        </Form>
    )
}
