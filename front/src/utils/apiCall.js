const BASE = "http://localhost:3000";
const apiCall = async (url, method, body) => {
    method = method || "GET";
    const options = {method,headers:{}};
    const token = localStorage.getItem('token');
    if (token)
        options.headers.authorization = `Bearer ${token}`
    if(body){
        options.body = JSON.stringify(body);  
        options.headers["Content-Type"] = "application/json";
    }
    return fetch(BASE+url,options)
.then(res=>res.json())
.then(obj=>{
    if(obj.token){
        localStorage.setItem('token',obj.token)
        localStorage.setItem('user',JSON.stringify(obj.data))
}
    if(obj.success === true)
        return obj.data;
    throw new Error(obj.message);  
});

}

export default apiCall;