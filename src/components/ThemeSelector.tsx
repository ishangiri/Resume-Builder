import { useUnifiedThemeStore } from "../hooks/useUnifiedThemeStore";

interface template{
  template : string;
}


export const ThemeSelector = ({template} : template) => {
  //if template doesnt match the theme store return null
  const themeSetUp =  useUnifiedThemeStore(template);


  if(!themeSetUp){

    return (

      <div className="bg-slate-100 p-5 text-red-500">
       Themes not available for this template yet!
      </div>
      
      )
  }

  //hook call to get the specific theme values in the templateselector UI 
  const {store, presets} = themeSetUp;
  const {theme , setTheme} = store

//checking if the  preset theme is changed or not
 const presetThemeChanged = Object.values(presets).some(val => theme === val);
const activePreset = Object.entries(presets).find(([_, presetTheme]) => {
  // Deep comparison of objects
  return JSON.stringify(presetTheme) === JSON.stringify(theme);
})?.[0];

console.log(activePreset);
 

   const handleInput = (key: keyof typeof theme, value: string) => {
    setTheme({ ...theme, [key]: value } as typeof theme);
  };

 return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-100">
        <h2 className="text-base font-semibold text-gray-900">Theme Settings</h2>
        <p className="text-sm text-gray-600 mt-1">Customize your resume appearance</p>
      </div>
      
      <div className="p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-3">
            Quick Presets
          </label>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(presets).map(([name, val]) => (
              <button
                key={name}
                onClick={() => setTheme(val)}
                className={`group px-4 py-3 text-sm font-medium rounded-lg hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  activePreset === name
                    ? 'text-blue-700 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300'
                    : 'text-gray-700 bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 hover:from-blue-50 hover:to-blue-100 hover:border-blue-300 hover:text-blue-700'
                }`}
              >
                <span className="block font-medium">{name}</span>
              </button>
            ))}
            {!presetThemeChanged && !activePreset && (
              <button className="px-4 py-3 text-sm font-medium text-blue-700 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-lg shadow-sm">
                <span className="block font-medium">Custom Theme</span>
              </button>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-800 mb-3">
            Custom Properties
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(theme).map(([key, val]) => (
              <div key={key} className="group">
                <label className="block text-xs font-medium text-gray-700 mb-2 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={val}
                    onChange={(e) => handleInput(key, e.target.value)}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-300 transition-all duration-200 pr-8"
                    placeholder="Enter value..."
                  />
                  <div
                    className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 rounded border border-gray-300 shadow-sm"
                    style={{ backgroundColor: val }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};