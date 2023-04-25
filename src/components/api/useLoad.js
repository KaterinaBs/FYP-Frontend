import { useEffect, useState } from "react";
import API from "./API";


export default function useLoad(endpoint) {
//STATE
    const [records, setRecords] = useState(null);  //use state to store the modules [ name of the variable, function to set the varibles]
    const [loadingMessage, setLoadingMessage] = useState('Loading Records...')//letting user know the recrods are loading
//METHODS
    const loadRecords = async (endpoint) => {
        const response = await API.get(endpoint);
        setRecords(response.result)
        !response.isSucces && setLoadingMessage(response.message)
    };
    useEffect(() => {loadRecords(endpoint) }, [endpoint]);
// RETURN
return [records, setRecords, loadingMessage,loadRecords];

}