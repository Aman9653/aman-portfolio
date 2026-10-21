import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiExpo,
  SiFirebase,
  SiNodedotjs,
  SiGit,
  SiGithub,
  SiMapbox,
  SiPhp,
  SiMysql,
  SiHtml5,
  SiCss,
  SiBootstrap,
  SiTailwindcss,
  SiMongodb,
  SiApache,
  SiPostman,
  SiDocker,
  SiFigma,
} from 'react-icons/si';
import {
  LuPalette,
  LuNetwork,
  LuDatabase,
  LuSmartphone,
  LuServer,
  LuGauge,
  LuCode,
  LuLayers,
  LuCloud,
  LuMonitor,
  LuKeyRound,
  LuGitPullRequest,
} from 'react-icons/lu';

/**
 * Single lookup for every technology / service glyph used on the site.
 * `data/site.js` refers to these by their string key.
 */
const ICONS = {
  react: SiReact,
  nextjs: SiNextdotjs,
  typescript: SiTypescript,
  javascript: SiJavascript,
  expo: SiExpo,
  firebase: SiFirebase,
  node: SiNodedotjs,
  git: SiGit,
  github: SiGithub,
  mapbox: SiMapbox,
  php: SiPhp,
  mysql: SiMysql,
  html5: SiHtml5,
  css: SiCss,
  bootstrap: SiBootstrap,
  tailwind: SiTailwindcss,
  mongodb: SiMongodb,
  apache: SiApache,
  postman: SiPostman,
  docker: SiDocker,
  database: SiMysql,
  figma: SiFigma,
  palette: LuPalette,
  api: LuNetwork,
  db: LuDatabase,
  phone: LuSmartphone,
  server: LuServer,
  gauge: LuGauge,
  code: LuCode,
  layers: LuLayers,
  cloud: LuCloud,
  monitor: LuMonitor,
  key: LuKeyRound,
  review: LuGitPullRequest,
};

export default function TechIcon({ name, className = '', ...props }) {
  const Icon = ICONS[name] ?? LuCode;
  return <Icon className={className} aria-hidden="true" {...props} />;
}

export { ICONS };
