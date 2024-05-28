import { SiHtml5, SiJavascript, SiCss3, SiMarkdown } from "react-icons/si";
import { FaNpm } from "react-icons/fa";

import { IoLogoJavascript } from "react-icons/io";

export const data = [
  {
    id: "1",
    name: "public",
    children: [
      {
        id: "c1-1",
        name: "index.html",
        icon: SiHtml5,
        iconColor: "#42a5f5",
      },
    ],
  },
  {
    id: "2",
    name: "src",
    children: [
      {
        id: "c2-1",
        name: "App.js",
        icon: IoLogoJavascript,
        iconColor: "#42a5f5",
      },
      {
        id: "c2-2",
        name: "index.js",
        icon: IoLogoJavascript,
        iconColor: "#42a5f5",
      },
      { id: "c2-3", name: "styles.css", icon: SiCss3, iconColor: "#42a5f5" },
    ],
  },
  { id: "3", name: "package.json", icon: FaNpm, iconColor: "#42a5f5" },
  { id: "4", name: "README.md", icon: SiMarkdown, iconColor: "#42a5f5" },
];
