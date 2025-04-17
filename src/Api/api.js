import axios from "axios";


const instance = axios.create({
    baseURL : "https://social-network.samuraijs.com/api/1.0",
    withCredentials : true,
    headers : {
        "API-KEY" : '785cc19c-a104-459e-bb3e-4aee3bfc0d3b'
    }
})

export const SocialAPI = {
    getUsers(page = 1){
        return instance.get(`/users?page=${page}&count=100`)
    },
    getProfile(userId){
        return instance.get(`/profile/${userId}`)
    },
    setLogin(email, password){
        return instance.post(`/auth/login`, {email, password})
    },
    changePhoto(file){
        // debugger
        let formData = new FormData()
        formData.append('file', file)
        return instance.put(`/profile/photo`, formData)
    }
}

