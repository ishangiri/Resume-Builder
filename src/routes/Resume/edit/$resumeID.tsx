import { createFileRoute } from '@tanstack/react-router'
import { useParams } from '@tanstack/react-router'

export const Route = createFileRoute('/Resume/edit/$resumeID')({
  component: RouteComponent,
})

function RouteComponent() {
 const params = useParams({from: '/Resume/edit/$resumeID'})
 console.log(params);
 
  
  return <div className='flex justify-center items-center h-screen bg-black text-white'>
    <p>
    Hello "/Resume/edit/$resumeID"!
    Please write api to fetch resume by id and fetch the resume here , you can use the same form components, just update the zustand store when you <br/>
    click the saved resume to come to this page. The zustand store should update the state based on fetched data.
    use params to fetch the resume with specific id. for example this resume's id is {params.resumeID}
    </p>
    </div>
}
