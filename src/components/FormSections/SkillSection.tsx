import { useResumeStore } from '../../store/ResumeStore';
import { Plus, Sparkles, Trash2 } from 'lucide-react';

const SkillsSection = () => {
  const skills = useResumeStore((state) => state.skills);
  const setSkills = useResumeStore((state) => state.setSkills);

  const updateCategory = (index: number, field: 'category' | 'skills', value: string) => {
    const updatedSkills = [...skills];
    if (field === 'category') {
      updatedSkills[index].category = value;
    } else {
      updatedSkills[index].skills = [value];
    }
    setSkills(updatedSkills);
  };

  const addCategory = () => {
    setSkills([...skills, { category: '', skills: [''] }]);
  };

  const removeCategory = (index: number) => {
    const filtered = skills.filter((_, i) => i !== index);
    setSkills(filtered);
  };

  const generateSkills = () => {
    console.log('Generating skills...');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Skills</h2>

      <div className="space-y-5">
        {skills.map((cat, idx) => (
          <div
            key={idx}
            className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm space-y-3"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium text-gray-700">Category #{idx + 1}</h3>
              <button
                type="button"
                onClick={() => removeCategory(idx)}
                className="text-red-500 hover:text-red-700 text-xs flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" /> Remove
              </button>
            </div>

            <input
              type="text"
              placeholder="e.g., Programming Languages"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
              value={cat.category}
              onChange={(e) => updateCategory(idx, 'category', e.target.value)}
            />

            <input
              type="text"
              placeholder="e.g., JavaScript, TypeScript, Python"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
              value={cat.skills[0] || ''}
              onChange={(e) => updateCategory(idx, 'skills', e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full mt-4">
        <button
          type="button"
          onClick={addCategory}
          className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white text-sm rounded-md font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>

        <button
          type="button"
          onClick={generateSkills}
          className="w-full sm:w-auto px-4 py-2 bg-purple-600 text-white text-sm rounded-md font-medium flex items-center justify-center gap-2 hover:bg-purple-700 transition-colors"
        >
          <Sparkles className="w-4 h-4" />
          Generate AI Skills
        </button>
      </div>
    </div>
  );
};

export default SkillsSection;
