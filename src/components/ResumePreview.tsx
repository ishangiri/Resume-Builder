interface ResumePreviewProps {
    src: string;
    chooseResume: () => void; 
}

const ResumePreview = ({ src, chooseResume} : ResumePreviewProps) => {

  return (
    <div>
           <div className="flex flex-col items-center gap-4 bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
             <div onClick={chooseResume}
                className="border border-gray-200 overflow-hidden rounded-l-xl  bg-white hover:scale-125 transition-transform cursor-pointer h-64 w-64 md:h-96 md:w-96"
                >
               <img 
                 src={src} 
                 alt="Templates" 
                 className="w-full h-full object-contain"
               />
             </div>
             <div className="flex flex-col items-center gap-2">
             </div>
           </div>     
    </div>
  )
}

export default ResumePreview