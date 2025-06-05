interface ResumePreviewProps {
    src: string;
    chooseResume: () => void; 
}

const ResumePreview = ({ src, chooseResume} : ResumePreviewProps) => {

     const fileName = src.split('/').pop()?.split('.')[0] || '';
     const name = fileName
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <div>
           <div className="flex flex-col items-center gap-4 bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
             <div onClick={chooseResume}
                className="border border-gray-200 overflow-hidden rounded-l-xl  bg-white hover:scale-125 transition-transform cursor-pointer h-64 w-64 md:h-96 md:w-96"
                >
               <img 
                 src={src} 
                 alt="Template 1" 
                 className="w-full h-full object-contain"
               />
             </div>
             <div className="flex flex-col items-center gap-2">
               <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
             </div>
           </div>     
    </div>
  )
}

export default ResumePreview