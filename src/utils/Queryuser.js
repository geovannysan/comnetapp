import axios from 'axios';

export const autenticar =async()=>{
    try {
        let {data} = await axios.post("")
        return data
    } catch (error) {
        return error
    }
}