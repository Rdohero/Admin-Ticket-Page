import axios from "axios";

const API_URL = "https://secure-sawfly-certainly.ngrok-free.app";

export const login = async (emailHandphone,password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            EmailHandphone: emailHandphone,
            password: password
        });

        if (response.status === 200) {
            return response.data.Token;
        } else {
            console.log(response.data.Error);
            return response.data.Error;
        }

    } catch (error) {
        throw new Error(`An error occurred during login: ${error.message}`);
    }
};