import API_URL from "./apiURL";

export const API = {};

API.get = (endpoint) => callFetch(endpoint, 'GET', null);
API.post = (endpoint, data) => callFetch(endpoint, 'POST', data);
API.put = (endpoint, data) => callFetch(endpoint, 'PUT', data);
API.delete = (endpoint, data) => callFetch(endpoint, 'DELETE', data);

const callFetch = async (endpoint, method, dataObject) => {

    // Built a request object
    let requestObj = { method: method };  // GET, POST,PU,DELETE
    if (dataObject) requestObj = {
        ...requestObj,
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(dataObject)

    };
    //Call the fetch and process the return
    try {
        const fullEndpoint = API_URL + endpoint;
        const response = await fetch(fullEndpoint, requestObj);
        const result = await response.json();
        return (response.status) >= 200 && (response.status < 300)
            ? { isSucces: true, result: result }
            : { isSucces: false, result: null, message: ` Error recovering records : status code ${response.status}` }

    }
    catch (error) {
        return { isSucces: false, message: error.message };

    }

}
export default API;


