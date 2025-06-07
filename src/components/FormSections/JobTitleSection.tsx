import { useResumeStore } from '../../store/ResumeStore';

const JobTitleSection = () => {
  const summary = useResumeStore(state => state.jobTitle);
  const setJobTitle = useResumeStore(state => state.setJobTitle);

  return (
    <input
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200 bg-white"
      placeholder="Your Job Title"
      value={summary}
      onChange={e => setJobTitle(e.target.value)}
    />
  );
};

export default JobTitleSection;