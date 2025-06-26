import { useQuery } from "@tanstack/react-query";
import fetchApi from "../lib/fetchUtil"

const fetchResumes = async (user : string | undefined) => {
    try{
            const response = await fetchApi.get('/get-resumes',{
        params : {user}
    });
    return response;
    } catch(error: unknown){
        if (
            typeof error === "object" &&
            error !== null &&
            "response" in error &&
            (error as { response?: { status?: number } }).response?.status === 404
        ) {
            return [];
        }
        return error;
    }
}


export const fetchResumeById = async (id : number | undefined) => {
    try{
        const response = await fetchApi.get('/get-resumeById', {
            params : {id}
        })
        return response;
    } catch(error: unknown){
       if (
           typeof error === "object" &&
           error !== null &&
           "response" in error &&
           (error as { response?: { status?: number } }).response?.status === 404
       ) {
           return "Resume Not Found";
       }
       return error;
    }
}

export const useFetchResume = (user : string | undefined) => {
   return useQuery({
    queryKey : ['resumes', user],
    queryFn : () => fetchResumes(user),
    enabled : !!user //true when user is not undefined or null
   })
}


