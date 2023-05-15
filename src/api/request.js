import axios from "axios";
const requests = axios.create({
    baseURL:'http://localhost:3000/',
    timeout:5000
})
// requests.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
export default requests;