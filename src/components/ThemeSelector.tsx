import React, { useState } from "react";
import { useUnifiedThemeStore } from "../hooks/useUnifiedThemeStore";
import { harvardTheme } from "../store/themeStores/CreativeResumethemestore";
import { defaultTheme as defaultPro } from "../store/themeStores/ProfessionalthemeStore";
import { defaultTheme as defaultModern } from "../store/themeStores/ModernResumethemeStore";
import { defaultTheme as defaultLook } from "../store/themeStores/MinimalDesignthemestore";
import { defaultGraciousTheme } from "../store/themeStores/GraciousthemeStore";
import { defaultModerntheme } from "../store/themeStores/ModernLookthemestore";

const allThemes = [
  defaultGraciousTheme,
  defaultLook,
  defaultModern,
  defaultModerntheme,
  defaultPro,
  harvardTheme,
];

function getOptionsForKey(key: string): (string | number)[] {
  const options = new Set<string | number>();
  allThemes.forEach(theme => {
    if (theme[key]) options.add(theme[key]);
  });
  return Array.from(options);
}

const isColorValue = (key: string, value: any): boolean => {
  const colorKeys = ['color', 'background'];
  const hasColorKeyword = colorKeys.some(keyword =>
    key.toLowerCase().includes(keyword.toLowerCase())
  );
  const isHexColor = typeof value === 'string' && /^#[0-9A-F]{6}$/i.test(value);
  const isRgbColor = typeof value === 'string' && /^rgb\(/.test(value);
  const isHslColor = typeof value === 'string' && /^hsl\(/.test(value);
  return hasColorKeyword || isHexColor || isRgbColor || isHslColor;
};

interface ThemeSelectorProps {
  template: string;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ template }) => {
  const themeSetUp = useUnifiedThemeStore(template);
  const [customKeys, setCustomKeys] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<'presets' | 'colors' | 'properties'>('presets');

  if (!themeSetUp) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center min-w-[400px]">
        <div className="text-red-600 font-medium">Theme Configuration Unavailable</div>
        <p className="text-red-500 text-sm mt-1">Themes are not available for this template yet.</p>
      </div>
    );
  }

  const { store, presets } = themeSetUp;
  const { theme, setTheme } = store;

  // Find active preset
  const activePreset = Object.entries(presets).find(([_, presetTheme]) =>
    JSON.stringify(presetTheme) === JSON.stringify(theme)
  )?.[0];

  const handleThemeChange = (key: string, value: string) => {
    setTheme({ ...theme, [key]: value });
    setCustomKeys(prev => ({ ...prev, [key]: false }));
  };

  const handleCustomInput = (key: string, value: string) => {
    setTheme({ ...theme, [key]: value });
  };

  const handleCustomSelect = (key: string) => {
    setCustomKeys(prev => ({ ...prev, [key]: true }));
    setTheme({ ...theme, [key]: "" });
  };

  const resetToDefault = () => {
    const defaultTheme = Object.values(presets)[0];
    if (defaultTheme) {
      setTheme(defaultTheme);
      setCustomKeys({});
    }
  };

  // Separate color and non-color properties
  const colorProperties = Object.entries(theme).filter(([key, value]) =>
    isColorValue(key, value)
  );
  const otherProperties = Object.entries(theme).filter(([key, value]) =>
    !isColorValue(key, value)
  );

  return (
    <div
      className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden min-w-[400px] max-w-2xl mx-auto"
      style={{ transition: "min-width 0.3s" }}
    >
      {/* Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-slate-50 to-blue-50 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
              </svg>
              Theme Customizer
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Personalize your resume's visual appearance
            </p>
          </div>
          <button
            onClick={resetToDefault}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-white rounded-lg transition-all"
            title="Reset to default theme"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
            Reset
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="px-6 py-3 bg-gray-50 border-b border-gray-100">
        <div className="flex gap-1">
          {[
            { id: 'presets' as const, label: 'Presets', icon: '⚡' },
            { id: 'colors' as const, label: 'Colors', icon: '🎨' },
            { id: 'properties' as const, label: 'Properties', icon: '⚙️' }
          ].map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                activeTab === id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-white'
              }`}
            >
              <span>{icon}</span>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {/* Presets Tab */}
        {activeTab === 'presets' && (
          <div>
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-800 mb-3">Quick Theme Presets</h3>
              <p className="text-xs text-gray-600 mb-4">
                Choose from professionally designed themes or customize your own.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(presets).map(([name, presetTheme]) => {
                const isActive = JSON.stringify(presetTheme) === JSON.stringify(theme);
                return (
                  <button
                    key={name}
                    onClick={() => setTheme(presetTheme)}
                    className={`group p-4 text-left rounded-xl border-2 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${
                      isActive
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: presetTheme.primaryColor || presetTheme.color || '#3b82f6' }}
                      />
                      <div>
                        <h4 className="font-medium text-gray-900">{name}</h4>
                        <p className="text-xs text-gray-500">{presetTheme.fontFamily || 'Default'}</p>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-2">
                      {[
                        presetTheme.primaryColor || presetTheme.color,
                        presetTheme.secondaryColor,
                        presetTheme.accentColor
                      ].filter(Boolean).slice(0, 3).map((color, i) => (
                        <div
                          key={i}
                          className="w-3 h-3 rounded-full border border-gray-200"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    {isActive && (
                      <div className="text-xs text-blue-600 font-medium">Active Theme</div>
                    )}
                  </button>
                );
              })}
              {!activePreset && (
                <div className="p-4 border-2 border-blue-500 bg-blue-50 rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white shadow-sm" />
                    <div>
                      <h4 className="font-medium text-gray-900">Custom Theme</h4>
                      <p className="text-xs text-gray-500">Your personalized setup</p>
                    </div>
                  </div>
                  <div className="text-xs text-blue-600 font-medium">Active Theme</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Colors Tab */}
        {activeTab === 'colors' && (
          <div>
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-800 mb-3">Color Palette</h3>
              <p className="text-xs text-gray-600 mb-4">
                Customize your color scheme with our intuitive color pickers.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {colorProperties.map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={typeof value === "string" && value.match(/^#/) ? value : "#000000"}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCustomInput(key, e.target.value)}
                      className="w-12 h-10 border border-gray-200 rounded-lg cursor-pointer bg-white shadow-sm hover:shadow-md transition-shadow"
                      title={`Pick ${key} color`}
                    />
                    <input
                      type="text"
                      value={value || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCustomInput(key, e.target.value)}
                      className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="#000000"
                    />
                  </div>
                </div>
              ))}
            </div>
            {colorProperties.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-3">🎨</div>
                <p>No color properties found in the current theme</p>
              </div>
            )}
          </div>
        )}

        {/* Properties Tab */}
        {activeTab === 'properties' && (
          <div>
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-800 mb-3">Typography & Layout</h3>
              <p className="text-xs text-gray-600 mb-4">
                Fine-tune fonts, spacing, and layout properties.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {otherProperties.map(([key, value]) => {
                const options = getOptionsForKey(key);
                const isCustom = customKeys[key] || (!options.includes(value) && value !== "");
                return (
                  <div key={key} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    {!isCustom ? (
                      <select
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        value={options.includes(value) ? value : ""}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                          if (e.target.value === "__custom__") {
                            handleCustomSelect(key);
                          } else {
                            handleThemeChange(key, e.target.value);
                          }
                        }}
                      >
                        <option value="">Select...</option>
                        {options.map(option => (
                          <option key={String(option)} value={String(option)}>
                            {String(option)}
                          </option>
                        ))}
                        <option value="__custom__">Custom…</option>
                      </select>
                    ) : (
                      <input
                        type="text"
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        value={value || ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCustomInput(key, e.target.value)}
                        placeholder={`Custom ${key}`}
                        onBlur={() => {
                          if (!theme[key]) setCustomKeys(prev => ({ ...prev, [key]: false }));
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
            {otherProperties.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-3">⚙️</div>
                <p>No typography properties found in the current theme</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
