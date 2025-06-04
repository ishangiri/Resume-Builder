import { useQuery } from "@tanstack/react-query";
import fetchApi from "../lib/fetchUtil"

const fetchResumes = async (user : string | undefined) => {
    try{
            const response = fetchApi.get('/get-resumes',{
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
    }


}

const useFetchResume = (user : string | undefined) => {
   return useQuery({
    queryKey : ['resumes', user],
    queryFn : () => fetchResumes(user),
    enabled : !!user
   })
}

export default useFetchResume