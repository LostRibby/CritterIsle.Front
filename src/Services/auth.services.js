import axios from "axios";


const authService = {

    register: async(formData) => {
        const response = await axios.post('https://critterisle-back-2.onrender.com/auth/register', formData); 
        return response.data;
    }, 
    login: async({email, password}) => {
        const response = await axios.post('https://critterisle-back-2.onrender.com/auth/login', {email, password}); 
        return response.data
    }
    
}; 
export default authService; 