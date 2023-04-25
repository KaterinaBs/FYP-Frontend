import React, { useState } from 'react';
function MyAccount() {

    const [file, setFile] = useState(null);

    const handleFileInputChange = (event) =>{
        setFile(event.target.files[0]);
    };
    //Properties------------------------------
    //Hooks-----------------------------------
    //Context---------------------------------
    //Methods---------------------------------
    const handleUpload = async () =>{
        const formData = new FormData();
        formData.append('image',file);

        
    }
    //View------------------------------------
    return (
        <div className='profileImage'>
            <div className='App'> </div>
            <input type='file' onChange={handleFileInputChange}/>
            <button>Upload Image</button>
        </div>

    )



}
export default MyAccount