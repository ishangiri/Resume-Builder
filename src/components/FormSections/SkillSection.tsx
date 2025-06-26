import { useResumeData } from '../../hooks/useResumeData';
import fetchApi from '../../lib/fetchUtil';
import { useResumeStore } from '../../store/ResumeStore';
import { Plus, Trash2, X, Sparkles } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const SkillsSection = () => {
  const skills = useResumeStore((state) => state.skills);
  const setSkills = useResumeStore((state) => state.setSkills);
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
  const [suggestedSkills, setSuggestedSkills] = useState<{ [key: number]: string[] }>({});
  const [skillInputs, setSkillInputs] = useState<{ [key: number]: string }>({});
  const [showSuggestions, setShowSuggestions] = useState<{ [key: number]: boolean }>({});
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);
  const inputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});
  const [skillsCache, setSkillsCache] = useState<{ [key: string]: string[] }>({});

  const resumeJobTitle = useResumeData().JobTitle;

  const updateCategory = (index: number, value: string) => {
    const updated = [...skills];
    updated[index].category = value;
    setSkills(updated);
  };

  const addSkill = (index: number, skill: string) => {
    if (!skill.trim()) return;
    
    const updated = [...skills];
    const existing = new Set(updated[index].skills);
    existing.add(skill.trim());
    updated[index].skills = Array.from(existing);
    setSkills(updated);
    
    // Clear input and hide suggestions
    setSkillInputs(prev => ({ ...prev, [index]: '' }));
    setShowSuggestions(prev => ({ ...prev, [index]: false }));
  };

  const removeSkill = (categoryIndex: number, skillToRemove: string) => {
    const updated = [...skills];
    updated[categoryIndex].skills = updated[categoryIndex].skills.filter(skill => skill !== skillToRemove);
    setSkills(updated);
  };

  const addCategory = () => {
    setSkills([...skills, { category: '', skills: [] }]);
  };

  const removeCategory = (index: number) => {
    const filtered = skills.filter((_, i) => i !== index);
    setSkills(filtered);
    // Clean up related state
    const { [index]: _removedInput, ...restInputs } = skillInputs;
    const { [index]: _removedSuggestions, ...restSuggestions } = suggestedSkills;
    const { [index]: _removedShow, ...restShow } = showSuggestions;
    setSkillInputs(restInputs);
    setSuggestedSkills(restSuggestions);
    setShowSuggestions(restShow);
  };

  const generateSkills = async (index: number, inputValue: string) => {
    const category = skills[index]?.category || '';
    if (!resumeJobTitle || !category) return;
    
    // Create cache key based on job title, category, and input
    const cacheKey = `${resumeJobTitle.toLowerCase()}-${category.toLowerCase()}`;

    // Check if we have cached results
    if (skillsCache[cacheKey]) {
      const existingSkills = new Set(skills[index].skills.map((s: string) => s.toLowerCase()));
      const filteredSuggestions = skillsCache[cacheKey].filter((skill: string) => 
        !existingSkills.has(skill.toLowerCase())
      );
      setSuggestedSkills(prev => ({ ...prev, [index]: filteredSuggestions }));
      setShowSuggestions(prev => ({ ...prev, [index]: true }));
      return;
    }
    
    setLoadingIndex(index);
    try {
      const res = await fetchApi.post('/generate-skills', {
        JobTitle: resumeJobTitle,
        category: category,
        currentInput: inputValue // Send current input for context
      });
      const suggestions = res.data.skills || [];
      
      // Cache the raw suggestions
      setSkillsCache(prev => ({ ...prev, [cacheKey]: suggestions }));
      
      // Filter out skills that are already added
      const existingSkills = new Set(skills[index].skills.map((s: string) => s.toLowerCase()));
      const filteredSuggestions = suggestions.filter((skill: string) => 
        !existingSkills.has(skill.toLowerCase())
      );
      setSuggestedSkills(prev => ({ ...prev, [index]: filteredSuggestions }));
      setShowSuggestions(prev => ({ ...prev, [index]: true }));
    } catch (error) {
      console.error('AI generation failed', error);
    } finally {
      setLoadingIndex(null);
    }
  };

  const handleSkillInputChange = (index: number, value: string) => {
    setSkillInputs(prev => ({ ...prev, [index]: value }));
    
    // Clear previous timeout
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    
    // Set new timeout for API call
    if (value.trim() && value.length >= 2) { // Only search if 2+ characters
      const timeout = setTimeout(() => {
        generateSkills(index, value);
      }, 100); // Increased debounce to 100ms
      setDebounceTimeout(timeout);
    } else {
      setShowSuggestions(prev => ({ ...prev, [index]: false }));
    }
  };

  const handleSkillInputKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const value = skillInputs[index] || '';
      if (value.trim()) {
        addSkill(index, value);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(prev => ({ ...prev, [index]: false }));
    }
  };

  const handleSuggestionClick = (index: number, skill: string) => {
    addSkill(index, skill);
  };

  // Click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedOutside = Object.keys(inputRefs.current).every(key => {
        const ref = inputRefs.current[parseInt(key)];
        const suggestionDropdown = ref?.parentElement?.querySelector('.suggestions-dropdown');
        return ref && !ref.contains(target) && (!suggestionDropdown || !suggestionDropdown.contains(target));
      });
      
      if (clickedOutside) {
        setShowSuggestions({});
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
        <p className="text-sm font-bold text-blue-500 flex items-center">
           <Sparkles className='inline w-4 h-4'/> AI suggestions for skills will appear as you type.
          </p>

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
            onChange={(e) => updateCategory(idx, e.target.value)}
          />

          {/* Skills Input with Suggestions */}
          <div className="relative">
            <input
              ref={(el) => {
                inputRefs.current[idx] = el;
              }}
              type="text"
              placeholder="Type a skill and press Enter (e.g., JavaScript, React, Node.js)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
              value={skillInputs[idx] || ''}
              onChange={(e) => handleSkillInputChange(idx, e.target.value)}
              onKeyDown={(e) => handleSkillInputKeyDown(idx, e)}
            />
            
            {/* Loading indicator */}
            {loadingIndex === idx && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
              </div>
            )}

            {/* Suggestions dropdown */}
            {showSuggestions[idx] && suggestedSkills[idx] && suggestedSkills[idx].length > 0 && (
              <div className="suggestions-dropdown absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
                {suggestedSkills[idx].map((skill: string, i: number) => (
                  <button
                    key={i}
                    type="button"
                    className="w-full px-3 py-2 text-left text-sm hover:bg-blue-50 hover:text-blue-700 focus:bg-blue-50 focus:text-blue-700 focus:outline-none"
                    onMouseDown={(e) => {
                      e.preventDefault(); // Prevent input from losing focus
                      handleSuggestionClick(idx, skill);
                    }}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Display added skills as tags */}
          {cat.skills && cat.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-md">
              {cat.skills.map((skill, skillIdx) => (
                <span
                  key={skillIdx}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(idx, skill)}
                    className="text-blue-600 hover:text-blue-800 ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      ))}

      <div className="flex flex-col sm:flex-row gap-3 w-full mt-4">
        <button
          type="button"
          onClick={addCategory}
          className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white text-sm rounded-md font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>
    </div>
  );
};

export default SkillsSection;