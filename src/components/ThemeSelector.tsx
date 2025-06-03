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


  const handleInput = (key: keyof typeof theme, value: string) => {
    setTheme({ ...theme, [key]: value } as typeof theme);
  };


return   (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="px-4 py-3 border-b border-gray-100">
        <h2 className="text-sm font-semibold text-gray-900">Theme Settings</h2>
        <p className="text-xs text-gray-500 mt-1">Customize your resume appearance</p>
      </div>

      <div className="p-4 space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">
            Quick Presets
          </label>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(presets).map(([name, val]) => (
              <button
                key={name}
                onClick={() => setTheme(val)}
                className="px-3 py-2 sm:text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Properties Section */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">
            Custom Properties
          </label>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(theme).map(([key, val]) => (
              <div key={key} className="space-y-1">
                <label className="block text-xs font-medium text-gray-600 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={val}
                    onChange={(e) => handleInput(key as keyof typeof theme, e.target.value)}
                    className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded-md bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-150"
                    placeholder="Enter value..."
                  />
                  {/* Color preview for hex values */}
                 
                    <div 
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-sm border border-gray-300"
                      style={{ backgroundColor: val }}
                    />
                 
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
};