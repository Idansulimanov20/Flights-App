import apiCall from "./apiCall";

export const getAll = ()=> apiCall('/flight');
export const getById = (id)=> apiCall(`/flight/${id}`);
export const addOne = (body)=> apiCall('/flight/',"POST",body);
export const editOne = (id,body)=> apiCall(`/flight/${id}`,"PATCH",body);
export const removeOne = (id)=> apiCall(`/flight/${id}`,"DELETE");
