import axios from "axios";


const authService = {

    register: async(formData) => {
        const response = await axios.post('http://localhost:3000/api/auth/register', formData); 
        return response.data;
    }, 
    login: async({email, password}) => {
        const response = await axios.post('http://localhost:3000/api/auth/login', {email, password}); 
        return response.data
    }
    
}; 
export default authService; 