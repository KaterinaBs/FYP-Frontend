import React from 'react';
import { useState} from 'react';
import API from '../api/API.js';
import AssignmentsForm from '../UI/AssignmentsForm.js';
import useLoad from '../api/useLoad.js';
import Modal from '../UI/modal.js';
import Panel from '../UI/Panel.js';
import '../UI/Panel.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useLocation } from 'react-router-dom'
import { useAuth } from '../auth/useAuth.js';

export default function Assignment() {
    const location = useLocation();
    const moduleId = location.state.moduleId;
    const { loggedInUser } = useAuth();
    const assignmentEndpoint = `/assignments/${loggedInUser.TeacherId}/${moduleId}`;
    const postAssignmentEndpoint = '/assignments';
    const putAssignmentEnpoint = '/assignments';
    const deleteAssignmentEndpoint = '/assignments';

    const [assignments, , loadingMessage, loadAssignment] = useLoad(assignmentEndpoint);
    const [showAssignmentsForm, setShowAssignmentsForm] = useState(false);
    const [showSelectedForm, setShowSelectedForm] = useState(0);
    const [openModal, setOpenModal] = useState(false)
    
    const handleAdd = (id) => {
        setShowAssignmentsForm(id);
        setOpenModal(true);
    }
    const handleSubmit = async (assignment) => {
        assignment.TeacherId = loggedInUser.TeacherId;
        assignment.ModuleId = moduleId;
        console.log(`the teacher and module id are ${assignment.TeacherId} and ${assignment.ModuleId} `)
        const response = await API.post(postAssignmentEndpoint, assignment);
        console.log(assignment)
        if (response.isSucces) {
            loadAssignment(assignmentEndpoint);
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
    const handleEditSubmit = async (assignment) => {
        console.log(assignment.AssignmentId)
        const response = await API.put(`${putAssignmentEnpoint}/${assignment.AssignmentId}`, assignment);
        if (response.isSucces) {
            setShowSelectedForm(0);
            loadAssignment(assignmentEndpoint);
        }
    };
    const handleEdit = (id) => {
        console.log(id)
        setShowSelectedForm(id === showSelectedForm ? 0 : id)
    };

    const handleDelete = async (id) => {
        console.log(id)
        console.log(`the id is${deleteAssignmentEndpoint}/${id}`)
        const response = await API.delete(`${deleteAssignmentEndpoint}/${id}`);
        if (response.isSucces) {
            loadAssignment(assignmentEndpoint);
        }
    }
    const handleClose = () => {
        setOpenModal(false);
    }
    return (
        <section>
            <div className='topSection'>
                <Modal open={openModal} onClose={handleClose} >
                    <AssignmentsForm onSubmit={handleSubmit} onDismiss={handleDismiss} />
                </Modal>
                <h1 className='pageHeader'> Assignments</h1>
                <button className='add' onClick={() => handleAdd(true)}> Add Assignments </button>
            </div>
            {
                !assignments
                    ? <p>{loadingMessage}</p>
                    : assignments.length === 0
                        ? <p>No assignments found</p>
                        : assignments.map((assignment) => (
                            <Panel
                                key={assignment.AssignmentId}
                                title={assignment.AssignmentTitle}
                            >

                                <div>You can find the Assignment Brief <a href={assignment.Details} target="_blank">here</a>:</div>
                                <div>Deadline: {new Date(assignment.Deadline).toLocaleDateString('en-UK', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                                 <DeleteIcon onClick={() => handleDelete(assignment.AssignmentId)}></DeleteIcon>
                                 <EditIcon onClick={() => handleEdit(assignment.AssignmentId)}></EditIcon>
                                {
                                    showSelectedForm === assignment.AssignmentId &&
                                    <AssignmentsForm className='editForm' onSubmit={handleEditSubmit} onDismiss={handleDismiss} initialAssignment={assignment} />
                                }


                            </Panel>






                        ))
            }

        </section>

    )
}

