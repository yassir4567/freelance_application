import { BASE_URL , getToken } from "../config";

const updateClientProfile = async => (form) => {
    try {
        const token = getToken() 
        const response = await fetch(`${BASE_URL}/update-profile`, {
            method : 'PUT' , 
            headers : {
                Accept : 'application/json' , 
                // to complete 
            }
        })
    } catch (err) {
        return {
            success : false , 
            message : err.message || 'Network error' , 
            errors : err
        }
    }
} 