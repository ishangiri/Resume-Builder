import axios from 'axios'

const fetchApi = axios.create({
    baseURL :  import.meta.env.VITE_API_URL,
})

export default fetchApi;

export const fetchApiPDF = axios.create({
    baseURL :  import.meta.env.VITE_PDF_URL,
})
