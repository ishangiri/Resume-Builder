import { useResumeStore } from '../../store/ResumeStore';

const ProjectsSection = () => {
  const projects = useResumeStore(state => state.projects);
  const setProjects = useResumeStore(state => state.setProjects);
  const hasProjects = useResumeStore(state => state.hasProjects);
  const setHasProjects = useResumeStore(state => state.setHasProjects)

  const updateProject = (index: number, field: 'name' | 'description', value: string) => {
    const newProjects = [...projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    setProjects(newProjects);
  };

  const addProject = () => {
    setProjects([...projects, { name: '', description: '' }]);
  };

  const removeProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Projects</h2>
       {hasProjects && projects.length === 0 && (
      <div className="mb-6 p-4 border border-yellow-300 bg-yellow-50 rounded-md">
        <p className="text-gray-700 mb-2">
          Don’t have any work projects to add right now?
        </p>
        <button
          type="button"
          onClick={() => setHasProjects(false)}
          className="px-4 py-2 bg-yellow-400 text-black font-medium rounded hover:bg-yellow-500 transition"
        >
          I don’t have projects
        </button>
      </div>
    )}

       {!hasProjects && projects.length === 0 && (
      <div className="mb-6 p-4 border border-yellow-300 bg-yellow-50 rounded-md">
        <p className="text-gray-700 mb-2">
          Don’t have any work projects to add right now?
        </p>
        <button
          type="button"
          onClick={() => setHasProjects(true)}
          className="px-4 py-2 bg-yellow-400 text-black font-medium rounded hover:bg-yellow-500 transition"
        >
          I have projects
        </button>
      </div>
    )}

      {projects.map((project, idx) => (
        <div key={idx} className="mb-6 p-4 border rounded-md bg-gray-50">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Project #{idx + 1}</h3>
            <button
              type="button"
              onClick={() => removeProject(idx)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>

          <input
            type="text"
            placeholder="Project Name"
            className="w-full mb-2 px-3 py-2 border rounded"
            value={project.name}
            onChange={e => updateProject(idx, 'name', e.target.value)}
          />
          <textarea
            placeholder="Project Description"
            className="w-full px-3 py-2 border rounded resize-none min-h-[80px]"
            value={project.description}
            onChange={e => updateProject(idx, 'description', e.target.value)}
          />
        </div>
      ))}

       {hasProjects &&  ( <button
          type="button"
          onClick={addProject}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Add Project
        </button>
    )}
    </div>
  );
};

export default ProjectsSection;

