import apiCall from "./apiCall";

export const getAll = ()=> apiCall('/users');
export const register = (name,email,password)=> apiCall(`/users/register`,"POST",{name,email,password});
export const login = (email,password)=> apiCall('/users/login',"POST",{email,password});
export const updateAdmin = (id,isAdmin)=> apiCall(`/users/${id}`,"PATCH",{isAdmin});
export const logout = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('user');
} 
export const currentUser = ()=>{
    const userJson = localStorage.getItem('user');
    if(userJson)
        return JSON.parse(userJson);
   
};
