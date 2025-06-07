import { professionalStore } from "../store/themeStores/ProfessionalthemeStore"
import { modernStore } from "../store/themeStores/ModernResumethemeStore"
import { modernLookStore } from "../store/themeStores/ModernLookthemestore"
import { minimalDesignStore } from "../store/themeStores/MinimalDesignthemestore"
import { graciousStore } from "../store/themeStores/GraciousthemeStore"
import { resumeThemeStore } from "../store/themeStores/CreativeResumethemestore"
export const getTemplateTheme = (template : string) => {
     switch(template){
        case "Professional":
            return professionalStore
        case "Modern":
            return modernStore
        case "Minimal":
            return minimalDesignStore
        case "Gracious":
            return graciousStore
        case "ModernLook":
            return modernLookStore
        case "Creative" : 
            return resumeThemeStore
     }         
}