import { useThemeStore as useProfessional , defaultTheme as defaultPro, elegantTheme, Soothing, freshTheme} from "../store/themeStores/ProfessionalthemeStore";
import { useThemeStore as useModern, defaultTheme, executiveSlateTheme, corporateEmeraldTheme, modernCharcoalTheme} from "../store/themeStores/ModernResumethemeStore";
import { useThemeStore as useGracious, defaultGraciousTheme, elegantGraciousDark, minimalCleanLight, vibrantModern } from "../store/themeStores/GraciousthemeStore";
import { useMinimalThemeStore, defaultTheme as defaultMinimal, softGreenTheme, warmSandTheme, elegantNightTheme} from "../store/themeStores/MinimalDesignthemestore";
import { useModernLookthemeStore, defaultModerntheme, corporateBlueTheme, sophisticatedSerifTheme, elegantGrayTheme } from "../store/themeStores/ModernLookthemestore";
import { useThemeStore as useGreenTheme, modernGreenTheme, elegantForestTheme, vibrantTealTheme, defaultResumeTheme } from "../store/themeStores/CreativeResumethemestore";

//takes one template argument
export function useUnifiedThemeStore(template : string) {
 
  const professional = useProfessional();
  const modern = useModern();
  const gracious = useGracious();
  const minimal = useMinimalThemeStore();
  const modernLook = useModernLookthemeStore();
  const greenTheme = useGreenTheme();

  //switch to select the theme according to template
  switch (template) {
       case "Creative": 
    return{
      store : greenTheme,
      presets : {
      "default Theme" : defaultResumeTheme,
      "Modern Green" : modernGreenTheme,
      "Modern Forest" : elegantForestTheme,
      "Teal Theme" : vibrantTealTheme,
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
    default:
   return null;
  }
}