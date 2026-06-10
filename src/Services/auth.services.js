import axios from "axios";


const authService = {

    register: async (formData) => {
    try {
        const response = await axios.post(
            'https://critterisle-back-2.onrender.com/api/auth/register',
            formData
        );
        return response.data;

    } catch (error) {
        if (error.response) {
            if (error.response.status === 409) {
                throw new Error("Cet utilisateur existe déjà (409)");
            }
            
            throw new Error(error.response.data?.message || "Erreur serveur");
        }

        throw new Error("Erreur de connexion au serveur");
    }
},
    login: async({email, password}) => {
        const response = await axios.post('https://critterisle-back-2.onrender.com/api/auth/login', {email, password}); 
        return response.data
    }
    
}; 
export default authService; 