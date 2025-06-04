import fetchApi from "../lib/fetchUtil";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { GenericTheme } from "../types/GenericTheme";

export interface ResumeData{
    
      user : {
        user_id : string | undefined,
        email : string | null | undefined,
        },
        resume : {
          title : string,
          content : object,
        } ,
        theme : {
               name : string | undefined,
              settings : GenericTheme | undefined
            }
      
}

type SaveResumeResponse = { message: string };


export const useSaveResume = (options?: UseMutationOptions<SaveResumeResponse, unknown, ResumeData>) => {
   return useMutation({
        mutationFn: (resumePayload : ResumeData) => 
             fetchApi.post('/save-resume', resumePayload).then(res => res.data),
        ...options
    })
}

