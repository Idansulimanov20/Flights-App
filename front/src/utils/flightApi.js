const BASE = "http://localhost:3000/flight";
const apiCall = async (url, method, body) => {
    method = method || "GET";
    const options = {method,headers:{}};
    if(body){
        options.body = JSON.stringify(body);  
        options.headers["Content-Type"] = "application/json";
    }
    return fetch(BASE+url,options)
.then(res=>res.json())
.then(obj=>{
    if(obj.status === "success")
        return obj.data;
    throw new Error(obj.error);  
});

}

export const getAll = ()=> apiCall('/');
export const getById = (id)=> apiCall(`/${id}`);
export const addOne = (body)=> apiCall('/',"POST",body);
export const editOne = (id,body)=> apiCall(`/${id}`,"PATCH",body);
export const removeOne = (id)=> apiCall(`/${id}`,"DELETE");
