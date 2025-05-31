import { useResumeStore } from '../../store/ResumeStore';
const ExperienceSection = () => {
  const experience = useResumeStore(state => state.experience);
  const setExperience = useResumeStore(state => state.setExperience);
  const setHasExperience = useResumeStore(state => state.setHasExperience);
  const hasExperience = useResumeStore(state => state.hasExperience);

  // Handler for updating one field in an experience entry by index
  type Experience = {
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string[];
    location: string;
  };

  const updateExperience = (
    index: number,
    field: keyof Experience,
    value: string | string[]
  ) => {
    const newExperience = [...experience];
    newExperience[index] = {
      ...newExperience[index],
      [field]: value,
    };
    setExperience(newExperience);
  };

  // Add new empty experience, max 3
  const addExperience = () => {
    if (experience.length >= 3) return;
    setExperience([
      ...experience,
      { title: '', company: '', startDate: '', endDate: '', description: [''], location: '' },
    ]);
  };

  // Remove experience by index
  const removeExperience = (index: number) => {
    const newExperience = experience.filter((_, i) => i !== index);
    setExperience(newExperience);
  };

  // Update description array for an experience index
  const updateDescriptionLine = (expIndex: number, lineIndex: number, value: string) => {
    const newExperience = [...experience];
    const desc = [...newExperience[expIndex].description];
    desc[lineIndex] = value;
    newExperience[expIndex].description = desc;
    setExperience(newExperience);
  };

  // Add new description line for an experience index
  const addDescriptionLine = (expIndex: number) => {
    const newExperience = [...experience];
    newExperience[expIndex].description.push('');
    setExperience(newExperience);
  };

  // Remove description line for an experience index
  const removeDescriptionLine = (expIndex: number, lineIndex: number) => {
    const newExperience = [...experience];
    newExperience[expIndex].description = newExperience[expIndex].description.filter(
      (_, i) => i !== lineIndex
    );
    setExperience(newExperience);
  };

return (
  <div>
    <h2 className="text-xl font-bold mb-4">Experience</h2>

    {hasExperience && experience.length === 0 && (
      <div className="mb-6 p-4 border border-yellow-300 bg-yellow-50 rounded-md">
        <p className="text-gray-700 mb-2">
          Don’t have any work experience to add right now?
        </p>
        <button
          type="button"
          onClick={() => setHasExperience(false)}
          className="px-4 py-2 bg-yellow-400 text-black font-medium rounded hover:bg-yellow-500 transition"
        >
          I don’t have experience
        </button>
      </div>
    )}

    {!hasExperience && experience.length === 0 && (
      <div className="mb-6 p-4 border border-yellow-300 bg-yellow-50 rounded-md">
        <p className="text-gray-700 mb-2">
          Don’t have any work experience to add right now?
        </p>
        <button
          type="button"
          onClick={() => setHasExperience(true)}
          className="px-4 py-2 bg-yellow-400 text-black font-medium rounded hover:bg-yellow-500 transition"
        >
          I have experience
        </button>
      </div>
    )}

    {experience.map((exp, idx) => (
      <div key={idx} className="mb-6 p-4 border rounded-md bg-gray-50">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">Experience #{idx + 1}</h3>
          <button
            type="button"
            onClick={() => removeExperience(idx)}
            className="text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>

        <input
          type="text"
          placeholder="Job Title"
          className="w-full mb-2 px-3 py-2 border rounded"
          value={exp.title}
          onChange={e => updateExperience(idx, 'title', e.target.value)}
        />
        <input
          type="text"
          placeholder="Company"
          className="w-full mb-2 px-3 py-2 border rounded"
          value={exp.company}
          onChange={e => updateExperience(idx, 'company', e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          className="w-full mb-2 px-3 py-2 border rounded"
          value={exp.location}
          onChange={e => updateExperience(idx, 'location', e.target.value)}
        />
        <div className="flex gap-2 mb-2">
          <input
            type="month"
            className="w-1/2 px-3 py-2 border rounded"
            value={exp.startDate}
            onChange={e => updateExperience(idx, 'startDate', e.target.value)}
          />
          <input
            type="month"
            className="w-1/2 px-3 py-2 border rounded"
            value={exp.endDate}
            onChange={e => updateExperience(idx, 'endDate', e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Description</label>
          {exp.description.map((line, i) => (
            <div key={i} className="flex items-center gap-2 mb-1">
              <input
                type="text"
                className="flex-grow px-3 py-2 border rounded"
                value={line}
                onChange={e => updateDescriptionLine(idx, i, e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeDescriptionLine(idx, i)}
                className="text-red-500 hover:text-red-700"
                disabled={exp.description.length === 1}
                title="Remove description line"
              >
                &times;
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addDescriptionLine(idx)}
            className="mt-1 text-sm text-blue-600 hover:underline"
          >
            + Add description line
          </button>
        </div>
      </div>
    ))}

    {hasExperience && experience.length < 3 && (
      <button
        type="button"
        onClick={addExperience}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        + Add Experience
      </button>
    )}
  </div>
);
};

export default ExperienceSection;
