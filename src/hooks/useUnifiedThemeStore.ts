import { useThemeStore as useProfessional , defaultTheme as defaultPro, elegantTheme} from "../store/themeStores/ProfessionalthemeStore";
import { useThemeStore as useModern, defaultTheme, executiveSlateTheme, corporateEmeraldTheme, modernCharcoalTheme} from "../store/themeStores/ModernResumethemeStore";
import { useThemeStore as useGracious, defaultGraciousTheme, elegantGraciousDark } from "../store/themeStores/GraciousthemeStore";

//takes one template argument
export function useUnifiedThemeStore(template : string) {
 
  const professional = useProfessional();
  const modern = useModern();
  const gracious = useGracious();

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
         "Elegant Theme" : elegantTheme
        }
        
      }
    default:
   return null;
  }
}