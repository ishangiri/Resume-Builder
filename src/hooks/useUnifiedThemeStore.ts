import { useThemeStore as useProfessional , defaultTheme as defaultPro, elegantTheme, Soothing, freshTheme} from "../store/themeStores/ProfessionalthemeStore";
import { useThemeStore as useModern, defaultTheme, executiveSlateTheme, corporateEmeraldTheme, modernCharcoalTheme} from "../store/themeStores/ModernResumethemeStore";
import { useThemeStore as useGracious, defaultGraciousTheme, elegantGraciousDark } from "../store/themeStores/GraciousthemeStore";
import { useMinimalThemeStore, defaultTheme as defaultMinimal } from "../store/themeStores/MinimalDesignthemestore";
import { useModernLookthemeStore, defaultModerntheme, corporateBlueTheme, sophisticatedSerifTheme, elegantGrayTheme } from "../store/themeStores/ModernLookthemestore";


//takes one template argument
export function useUnifiedThemeStore(template : string) {
 
  const professional = useProfessional();
  const modern = useModern();
  const gracious = useGracious();
  const minimal = useMinimalThemeStore()
  const modernLook = useModernLookthemeStore();

  //switch to select the theme according to template
  switch (template) {
    case 'Gracious':
      return {
        store : gracious,
       presets: {
          "Default Light": defaultGraciousTheme,
          "Elegant Dark": elegantGraciousDark,
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
          "Default Theme" : defaultMinimal
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