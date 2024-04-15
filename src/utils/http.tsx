import axios, { AxiosInstance} from 'axios';
import { useSearchParams } from 'react-router-dom';

class Http {
    instance: AxiosInstance
    constructor() {
        this.instance = axios.create({
            baseURL: 'http://localhost:3001',
            timeout: 1000,
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }
}

const http = new Http().instance

const useQueryString = () => {
    const [searchParams] = useSearchParams()
    return Object.fromEntries([...searchParams])
}

export default http
export { useQueryString }
