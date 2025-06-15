import { useThemeStore as useProfessional , defaultTheme as defaultPro, elegantTheme, Soothing, freshTheme} from "../store/themeStores/ProfessionalthemeStore";
import { useThemeStore as useModern, defaultTheme, executiveSlateTheme, corporateEmeraldTheme, modernCharcoalTheme} from "../store/themeStores/ModernResumethemeStore";
import { useThemeStore as useGracious, defaultGraciousTheme, elegantGraciousDark, minimalCleanLight, vibrantModern } from "../store/themeStores/GraciousthemeStore";
import { useMinimalThemeStore, defaultTheme as defaultMinimal, softGreenTheme, warmSandTheme, elegantNightTheme} from "../store/themeStores/MinimalDesignthemestore";
import { useThemeStore as useModernLook, defaultModerntheme, corporateBlueTheme, sophisticatedSerifTheme, elegantGrayTheme } from "../store/themeStores/ModernLookthemestore";
import { useThemeStore as useHarvardTheme, harvardTheme, oxfordTheme, mitTheme, cambridgeTheme } from "../store/themeStores/CreativeResumethemestore";
import { useThemeStore as useAcademic, minimalistGreenTheme, modernBlueTheme, elegantDarkTheme, defaultTheme as defaultAcademic  } from "../store/themeStores/AcademicThemeStore";
//takes one template argument
export function useUnifiedThemeStore(template : string) {
 
  const professional = useProfessional();
  const modern = useModern();
  const gracious = useGracious();
  const minimal = useMinimalThemeStore();
  const modernLook = useModernLook();
  const greenTheme = useHarvardTheme();
  const academicStore = useAcademic();

  //switch to select the theme according to template
  switch (template) {
       case "Creative": 
    return{
      store : greenTheme,
      presets : {
      "default Theme" : harvardTheme,
      "Oxford Theme" : oxfordTheme,
      "MIT Theme" : mitTheme,
      "Cambridge Theme" : cambridgeTheme,
      }
    }
    case 'Gracious':
      return {
        store : gracious,
       presets: {
          "Default Light": defaultGraciousTheme,
          "Elegant Dark": elegantGraciousDark,
          "Clean" : minimalCleanLight,
          "Modern" : vibrantModern
        },
      }
    case 'Modern':
      return{
         store : modern,
         presets : {
          "Default Theme" : defaultTheme,
          "Slate Theme" : executiveSlateTheme,
          "Emerald Theme" : corporateEmeraldTheme,
          "Modern Charcoal" : modernCharcoalTheme
         }
      }
    case 'Professional':
      return{
        store : professional,
        presets : {
         "Default Theme" : defaultPro,
         "Elegant Theme" : elegantTheme,
         "Fresh" : freshTheme,
         "Soothing" : Soothing,
        }
        
      }
    case 'Minimal':
      return{
        store : minimal,
        presets : {
          "Default Theme" : defaultMinimal,
          "Dark Theme" : elegantNightTheme,
          "Sand Theme" : warmSandTheme,
          "Green Theme" : softGreenTheme
        }
      }

    case "ModernLook" : 
    return{
      store : modernLook,
      presets : {
        "Default Theme" : defaultModerntheme,
        "Blue Theme" : corporateBlueTheme,
        "Gray Theme" : elegantGrayTheme,
        "Serif Theme" : sophisticatedSerifTheme
      }
    }
    case "Academic" : 
    return{
      store : academicStore,
      presets : {
        "Default theme" : defaultAcademic,
        "Blue Theme" : modernBlueTheme,
        "Green Theme" : minimalistGreenTheme,
        "Dark Theme" : elegantDarkTheme
      }
    }
    default:
   return null;
  }
}