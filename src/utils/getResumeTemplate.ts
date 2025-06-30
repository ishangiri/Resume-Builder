import React from "react";
import ReactDOMServer from "react-dom/server";
import {
  ProfessionalTemplate,
  ModernTemplate,
  ModernLook,
  MinimalDesign,
  GraciousLook,
  AcademicResume,
  HarvardResume
} from '../ServerTemplates';

import type { serverData } from '../types/fetchedData';
import type { GenericTheme } from '../types/GenericTheme';

interface props {
  resumeData: serverData,
  theme: GenericTheme | undefined,
  templateID: string
}

//a util to render a resume to HTML based on the selected template and theme
// This is used for server-side rendering of resumes
export function RenderResumeToHTML({templateID, resumeData, theme} : props){
  let Component;
 

  switch (templateID) {
    case "Professional":
      Component = ProfessionalTemplate;
      break;
    case "Modern":
      Component = ModernTemplate;
      break;
    case "Creative":
      Component = HarvardResume;
      break;
    case "Minimal":
      Component = MinimalDesign;
      break;
    case "Gracious":
      Component = GraciousLook;
      break;
    case "ModernLook":
      Component = ModernLook;
      break;
    case "Academic":
      Component = AcademicResume;
      break;
    default:
      return "<div>Template not found</div>";
  }

  // Ensure theme is always of type GenericTheme
  const safeTheme = theme as GenericTheme;

  return ReactDOMServer.renderToString(
    React.createElement(Component, { resumeData, theme: safeTheme })
  );
}
