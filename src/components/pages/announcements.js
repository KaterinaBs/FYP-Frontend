import React, { useState } from "react";
import useLoad from "../api/useLoad";
import API from '../api/API';
import Panel from "../UI/Panel.js";
import Modal from '../UI/modal.js';
import AnnouncementsForm from "../UI/AnnouncementsForm";
import { useAuth } from '../auth/useAuth.js';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function Announcements(){
	const { loggedInUser }= useAuth();
	const announcementsEndpoint = `/announcements/${loggedInUser.TeacherId}`
	const deleteAnnouncementsEndpoint = `/announcements`
	const postAnnouncementsEndpoint = '/announcements';
    const putAnnouncementsEndpoint = '/announcements';

	const [announcements, , loadingMessage, loadAnnouncements] = useLoad(announcementsEndpoint);
    const [openModal, setOpenModal] = useState(false)
    const [showAnnouncementsForm, setAnnouncementsForm] = useState(false);
    const [showSelectedForm, setShowSelectedForm] = useState(0);

    const handleAdd = (id) => {
        setAnnouncementsForm(id);
        setOpenModal(true);
    }



    const handleSubmit = async (announcement) => {
        announcement.TeacherId = loggedInUser.TeacherId;
        console.log(`the teacher id = ${announcement.TeaherId}`)
        console.log(`the object is = ${JSON.stringify(announcement)}`)
        const response = await API.post(postAnnouncementsEndpoint, announcement);
        if (response.isSucces) {
            loadAnnouncements(announcementsEndpoint);
            setOpenModal(false);
            return true;
        } 
        else {
            return false;
        }
    }
    const handleDismiss = () => {
        setShowSelectedForm(0)
        setOpenModal(false)
    }
	const handleDelete = async (id) => {
        console.log(`${deleteAnnouncementsEndpoint}/${id}`);
        const response = await API.delete(`${deleteAnnouncementsEndpoint}/${id}`);
        loadAnnouncements(announcementsEndpoint);

    }
    const handleEditSubmit = async (announcement) => {
        console.log(`The edit id is ${announcement.AnnouncementsId}`)
        const response = await API.put(`${putAnnouncementsEndpoint}/${announcement.AnnouncementsId}`, announcement);
        if (response.isSucces) {
            setShowSelectedForm(0);
            loadAnnouncements(announcementsEndpoint);
        }
    };
    const handleEdit = (id) => {
        setShowSelectedForm(id === showSelectedForm ? 0 : id);
    }
    const handleClose = () => {
        setOpenModal(false);

    }

		return (
            <section>
                <Modal open={openModal} onClose={handleClose} >
                    <AnnouncementsForm onSubmit={handleSubmit} onDismiss={handleDismiss} />
                </Modal> 
                <h1 className='pageHeader'> Announcements </h1>
                <button className='add' onClick={() => handleAdd(true)}> Add Announcements </button>
                {
                !announcements
                    ? <p>{loadingMessage}</p>
                    : announcements.length === 0
                        ? <p>No announcements found</p>
                        : announcements.map((announcement) => (
                            <Panel 
                                key={announcement.AnnouncementsId}
                                title={announcement.AnnouncementsTitle}
                                >
                                <div>{announcement.AnnouncementsDetails}</div>
                                <DeleteIcon onClick={() => handleDelete(announcement.AnnouncementsId)}></DeleteIcon>
                                <EditIcon onClick={() => handleEdit(announcement.AnnouncementsId)}></EditIcon>
                                {
                                    showSelectedForm === announcement.AnnouncementsId &&
                                    <AnnouncementsForm className='editForm' onSubmit={handleEditSubmit} onDismiss={handleDismiss} initialAnnouncement={announcement} />
                                }
                                </Panel>
                            
                        ))
            }				
            </section>

                
	)
}