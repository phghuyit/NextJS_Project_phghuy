// const token= "13|DiEGIBA7rJzH8pH3MV8ehJNXDWIb5DXouVjtdLJe37e439e7";
const API_CONFIG ={
    BASE_URL: process.env.NEXT_PUBLIC_API_URL??'http://127.0.0.1:8000/api',
    HEADERS: {
        "Content-Type": "application/json",
        "Accept":"application/json"
        // "Authorization": `Bearer ${token}`
    },
    TIMEOUT: 10000,
};

export default API_CONFIG;
