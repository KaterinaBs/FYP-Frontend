import React from 'react';
import { useState, useEffect } from 'react';
import API from '../api/API.js';
import HomeworkForm from '../UI/HomeworkForms.js';
import './homework.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useLoad from '../api/useLoad.js';
import Modal from '../UI/modal.js';
import { useLocation } from 'react-router-dom'
import { useAuth } from '../auth/useAuth.js';


export default function Homework() {
    //Initialisation------------------------------
    const location = useLocation();
    const moduleId = location.state.moduleId;

    const { loggedInUser } = useAuth();
    const homeworkEndpoint = `/homework/${loggedInUser.TeacherId}/${moduleId}`;
    const postHomeworkEndpoint = '/homework';
    const putHomeworkEndpoint = '/homework';
    const deleteHomeworkEndpoint = '/homework';

    const [homeworks, , loadingMessage, loadHomework] = useLoad(homeworkEndpoint);
    const [showHomeworkForm, setShowHomeworkForm] = useState(false);
    const [showSelectedForm, setShowSelectedForm] = useState(0);
    const [openModal, setOpenModal] = useState(false)

    const handleAdd = (id) => {
        setShowHomeworkForm(id);
        setOpenModal(true);

    }
    const SubmitHandler = async (homework) => {
        homework.TeacherId = loggedInUser.TeacherId;
        homework.ModuleId = moduleId;
        const response = await API.post(postHomeworkEndpoint, homework);
        if (response.isSucces) {
            loadHomework(homeworkEndpoint);
            setOpenModal(false);
            return true;
        } else {
            return false;
        }
    }
    const handleDismiss = () => {
        setShowSelectedForm(0)
        setOpenModal(false)
    }
    const handleEditSubmit = async (homework) => {
        const response = await API.put(`${putHomeworkEndpoint}/${homework.HomeworkId}`, homework);
        if (response.isSucces) {
            setShowSelectedForm(0);
            loadHomework(homeworkEndpoint);
        }
    };
    const handleEdit = (id) => setShowSelectedForm(id === showSelectedForm ? 0 : id);
    const handleDelete = async (id) => {
        const response = await API.delete(`${deleteHomeworkEndpoint}/${id}`);
        if (response.isSucces) {
            loadHomework(homeworkEndpoint);
        }
    }
    const handleClose = () => {
        setOpenModal(false);

    }
    //View------------------------------------
    return (
        <section>
            <div className='topSection'>
                <Modal open={openModal} onClose={handleClose}>
                    <HomeworkForm className="form" onSubmit={SubmitHandler} onDismiss={handleDismiss} />
                </Modal>
                <h1 className='homework'> Homework</h1>
                <button className='add' onClick={() => handleAdd(true)} >Add Homework</button>
            </div>
            {

                !homeworks
                    ? <p>{loadingMessage}</p>
                    : homeworks.length === 0
                        ? <p>No homework found</p>
                        : homeworks.map((homework) =>
                            <ul className='homeworks' key={homework.HomeworkId}>
                                <div className='delete-edit-icons'>
                                    &nbsp;<b>Details:</b> {homework.Details}
                                    &nbsp;&nbsp;&nbsp;Deadline: {new Date(homework.DueDay).toLocaleDateString('en-UK', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </div>

                                <div className='icons'>
                                    <DeleteIcon className='delete' onClick={() => handleDelete(homework.HomeworkId)}> Delete</DeleteIcon>
                                    <EditIcon className='edit' onClick={() => handleEdit(homework.HomeworkId)}> Edit</EditIcon>
                                </div>
                                {
                                    showSelectedForm === homework.HomeworkId &&
                                    (<HomeworkForm className='editForm' onSubmit={handleEditSubmit} onDismiss={handleDismiss} initialHomework={homework} />)
                                }
                            </ul>
                        )


            }

        </section>

    );
}