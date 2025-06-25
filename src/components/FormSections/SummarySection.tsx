import { useResumeStore } from '../../store/ResumeStore';
import Button2 from '../ui/Button2';
import { Sparkles } from 'lucide-react';

const SummarySection = () => {
  const summary = useResumeStore(state => state.summary);
  const setSummary = useResumeStore(state => state.setSummary);

  const generateSummary = () => {
    console.log("Generating summary...");
    
  }

  return (
    <div>
    <textarea
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200 bg-white min-h-[120px]"
      placeholder="Write a brief summary about yourself"
      value={summary}
      onChange={e => setSummary(e.target.value)}
    />
    <div className='mt-4 flex flex-row justify-end'>
 <Button2
      onSubmit={generateSummary} 
      text={
        <div className="flex items-center gap-1">
          <span className='flex gap-1'>  <Sparkles className="w-4 h-4" /> Generate AI Summary</span>
        </div>
      } 
    />
    </div>
    </div>
  );
};

export default SummarySection;
