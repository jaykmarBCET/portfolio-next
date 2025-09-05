import React from "react";
import { GiSkills } from "react-icons/gi";
import { IoIosContact,IoMdDocument } from "react-icons/io";
import { FaLanguage,FaRegUser,FaAward} from "react-icons/fa";
import { MdOutlineSocialDistance,MdCastForEducation,MdWorkHistory,MdMusicNote   } from "react-icons/md";
import { GoProjectSymlink } from "react-icons/go";
import { FcViewDetails } from "react-icons/fc";


export const AllEndPoint = {
  // ✅ Awards
  apiAwards: "/api/awards",
  apiAwardsPublic: "/api/awards/public",
  // Contact
  apiContact:"/api/contact",
  apiContactPublic:"/api/contact/public",
  // ✅ Languages
  apiLanguages: "/api/languages",
  apiLanguagesPublic: "/api/languages/public",

  // ✅ Social Media
  apiSocialMedia: "/api/social-media",
  apiSocialMediaPublic: "/api/social-media/public",

  // ✅ Education
  apiEducation: "/api/education",
  apiEducationPublic: "/api/education/public",

  // ✅ Experience
  apiExperience: "/api/experience",
  apiExperiencePublic: "/api/experience/public",

  // ✅ Projects
  apiProjects: "/api/projects",
  apiProjectsPublic: "/api/projects/public",

  // ✅ Skills
  apiSkills: "/api/skills",
  apiSkillsPublic: "/api/skills/public",

  // ✅ Certifications
  apiCertification: "/api/certification",
  apiCertificationsPublic: "/api/certification/public",

  // ✅ User (Profile, etc.)
  apiUser: "/api/user",
  apiUserPublic: "/api/user/public",
  // Interest
  apiInterest:"/api/interest",
  apiInterestPublic:"/api/interest/public",

  // Resume
  apiResume:"/api/resume",
  apiResumePublic:"/api/resume/public",
};

export const AllPrivatePage: {
  name: string;
  pageRoot: string;
  icon: React.ElementType;
  description: string;
}[] = [
  {
    name: "Skills",
    pageRoot: "/private/skills",
    icon: GiSkills,
    description: "Showcase and manage your technical and professional skills."
  },
  {
    name: "Contacts",
    pageRoot: "/private/contact",
    icon: IoIosContact,
    description: "Save and organize important contact details."
  },
  {
    name: "Languages",
    pageRoot: "/private/languages",
    icon: FaLanguage,
    description: "List languages you know with proficiency levels."
  },
  {
    name: "Social Media",
    pageRoot: "/private/social-media",
    icon: MdOutlineSocialDistance,
    description: "Link and manage your social media profiles."
  },
  {
    name: "Education",
    pageRoot: "/private/education",
    icon: MdCastForEducation,
    description: "Record your academic background and achievements."
  },
  {
    name: "Experience",
    pageRoot: "/private/experience",
    icon: MdWorkHistory,
    description: "Document your work history and professional experience."
  },
  {
    name: "Projects",
    pageRoot: "/private/projects",
    icon: GoProjectSymlink,
    description: "Highlight personal and professional projects."
  },
  {
    name: "Certifications",
    pageRoot: "/private/certification",
    icon: IoMdDocument,
    description: "Track certifications, licenses, and completed courses."
  },
  {
    name: "User",
    pageRoot: "/private/user",
    icon: FaRegUser,
    description: "Manage your profile and account information."
  },
  {
    name: "Interest",
    pageRoot: "/private/interest",
    icon: MdMusicNote,
    description: "Add your hobbies and personal interests."
  },
  {
    name: "Resume",
    pageRoot: "/private/resume",
    icon: FcViewDetails,
    description: "Generate and customize your resume."
  },
  {
    name: "Awards",
    pageRoot: "/private/awards",
    icon: FaAward,
    description: "Showcase honors, prizes, and awards received."
  }
];

export const technologies = [
  "JavaScript", "TypeScript", "Python", "Java", "C", "CPlusPlus", "Csharp", "Go",
  "Rust", "PHP", "Ruby", "Swift", "Kotlin", "Scala", "R", "Dart",

  // Frontend
  "React", "Nextjs", "Angular", "Vuejs", "Svelte", "SolidJS",
  "TailwindCSS", "Bootstrap", "MaterialUi", "ChakraUi","Shadcn",

  // Backend
  "Nodejs", "Express", "NestJS", "Spring", "Django", "Flask",
  "FastAPI", "Ruby on Rails", "Laravel", "ASP.NET Core",

  // Databases
  "MySQL", "PostgreSQL", "MongoDB", "Redis", "SQLite", "OracleDB",
  "MariaDB", "Firebase Firestore", "Cassandra", "Neo4j", "DynamoDB",
  "CockroachDB", "PlanetScale", "Supabase", "Appwrite",

  // DevOps & Infra
  "Docker", "Kubernetes", "Jenkins", "GitHub Actions", "GitLab CI",
  "Ansible", "Terraform", "Vagrant", "NGINX", "Apache",

  // Cloud
  "AWS", "Azure", "Google Cloud (GCP)", "Firebase", "DigitalOcean", "Heroku",
  "Vercel", "Netlify", "Railway", "Render",

  // Tools
  "Git", "GitHub", "GitLab", "Bitbucket", "VS Code", "Postman", "Figma",
  "Jira", "Slack", "Notion", "Trello",

  // APIs / ORMs
  "GraphQL", "REST API", "tRPC", "Prisma", "Sequelize", "Mongoose",

  // Build Tools
  "Webpack", "Vite", "ESLint", "Prettier", "Babel",

  // AI / ML
  "TensorFlow", "PyTorch", "Scikit-learn", "Keras", "Pandas", "NumPy"
]

