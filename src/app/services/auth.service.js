import axios from "axios";

const httpAuth = axios.create({
    baseURL: `https://identitytoolkit.googleapis.com/v1/`,
    params: {
        key: "AIzaSyClG1I1CCUnIU4Bq_vxiGqpdNM00qlmMho"
    }
});

const authService = {
    register: async ({ email, password }) => {
        const { data } = await httpAuth.post(`accounts:signUp`, {
            email,
            password,
            returnSecureToken: true
        });
        return data;
    },
    login: async ({ email, password }) => {
        const { data } = await httpAuth.post(`accounts:signInWithPassword`, {
            email,
            password,
            returnSecureToken: true
        });
        return data;
    }
};

export default authService;
