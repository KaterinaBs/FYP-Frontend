import React from "react";
import FormItem from './Form';
import Form from "./Form";

const emptyAnnouncement = {
    AnnouncementsTitle:"Assignment Title",
    AnnouncementsDetails: "Write an announcement here",
};
export default function AnnouncementsForm({ onDismiss, onSubmit, initialAnnouncement=emptyAnnouncement}) {
    //Initialisation--------------------------------
    
    const isValid = {
        // AnnouncementsTitle: () => null,
        // AnnouncementsDetails: ()=> null
        AnnouncementsTitle: (title) => title.length > 10,
        AnnouncementsDetails: (details) => details.length > 10
    }
    
    console.log(`AnnouncementsForm, isValid = ${JSON.stringify(isValid)}`)
    const errorMessage = {
        AnnouncementsTitle:'Field too short',
        AnnouncementsDetails: "Field to short"
    }

    const [announcement,errors,changeHandler,handleSubmit] = Form.useForm(initialAnnouncement,{isValid,errorMessage},onDismiss,onSubmit);
    //View------------------------------------------
    return (
        <Form className="AssignmentsBorderedForm" onDismiss={onDismiss} onSubmit={handleSubmit}>
            <label className="addAssignmentLabel"><h1>Add Annoumcement</h1></label>
            <Form.Item className='items'
                label="Title"
                htmlFor="Title"
                error={errors.AnnouncementsTitle}>
                <input
                    type="text"
                    name="AnnouncementsTitle"
                    value={announcement.AnnouncementsTitle}
                    onChange={changeHandler}
                />
            </Form.Item>
            <Form.Item className='items'
                label="Details"
                htmlFor="Details"
                error={errors.AnnouncementsDetails}>
                <input
                    type="text"
                    name="AnnouncementsDetails"
                    value={announcement.AnnouncementsDetails}
                    onChange={changeHandler}
                />
            </Form.Item>
        </Form>
    )
}
