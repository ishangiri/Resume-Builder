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
           <div className="flex flex-col items-center gap-4 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
             <div onClick={chooseResume} className="w-96 h-96 border border-gray-200 overflow-hidden bg-white hover:scale-150 transition-transform cursor-pointer">
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