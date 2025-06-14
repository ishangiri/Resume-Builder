import fetchApi from "../lib/fetchUtil"
import type { GenericTheme } from "../types/GenericTheme"
import { useMutation } from "@tanstack/react-query"


interface updateResume {
      resume : {
            title : string,
            content : object,
          } ,
          theme : {
                 name : string | undefined,
                settings : GenericTheme | undefined
              }
}


interface UpdateResumeVariables {
    resumePayLoad: updateResume;
    id: number;
    userId: string | undefined;
}

interface deleteResumeVariables{
    id: number;
    userId: string | undefined
}

const updateResume = async ({ resumePayLoad, id, userId }: UpdateResumeVariables) => {
    try {
        const response = await fetchApi.put(`/resumes/${id}`,  resumePayLoad, {
            params:{
              user_id :  userId,
            } , 
               headers: {
          'Content-Type': 'application/json',
        },
        });
        return response.data;
    } catch (e) {
        console.log(e);
    }
};


const deleteResume = async({id, userId} : deleteResumeVariables) => {
    try{
        const response = await fetchApi.delete(`/resumes/${id}`, 
            {
           params : {user_id : userId}
         })
           return response
    }catch(e){
        console.log(e);
        
    }
}

export const useUpdateResume = () => {
    return useMutation({
        mutationFn: (variables: UpdateResumeVariables) =>
            updateResume(variables)
    });
};

export const useDeleteResume = () => {
    return useMutation({
        mutationFn: (variables : deleteResumeVariables) => 
            deleteResume(variables)
    }
)
}



