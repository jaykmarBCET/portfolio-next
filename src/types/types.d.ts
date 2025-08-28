// ---------- Award ----------
export interface Award {
    userId: string;
    title: string;
    issuer: string;
    date: Date;
    description?: string;
}

export interface AwardStoreInfo {
    awards: Award[];
    addAward?: (award: Award) => Promise<void>;
    getAwards: () => Promise<void>;
    updateAward?: (awardId: string, award: Award) => Promise<void>;
    deleteAward?: (awardId: string) => Promise<void>;
}

// ---------- Certification ----------
export interface Certification {
    _id?:string;
    title: string;
    issuer: string;
    dateIssued: string;
    credentialUrl?: string;
}

export interface CertificationStoreInfo {
    certifications: Certification[];
    addCertification?: (certification: Certification) => Promise<void>;
    getCertifications: () => Promise<void>;
    updateCertification?: (certificationId: string, certification: Certification) => Promise<void>;
    deleteCertification?: (certificationId: string) => Promise<void>;
}

// ---------- Contact ----------
export interface Contact {
    _id?: string;
    name: string;
    email: string;
    message: string;
    dateSent: string;
}

export interface ContactStoreInfo {
    contacts: Contact[];
    addContact?: (contact: Contact) => Promise<void>;
    getContacts: () => Promise<void>;
    updateContact?: (contactId: string, contact: Contact) => Promise<void>;
    deleteContact?: (contactId: string) => Promise<void>;
}

// ---------- Education ----------
export interface Education {
    _id?:string;
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: Date;
    endDate: Date;
    grade?: string;
    description?: string;
}

export interface EducationStoreInfo {
    educationList: Education[];
    addEducation?: (education: Education) => Promise<void>;
    getEducation: () => Promise<void>;
    updateEducation?: (educationId: string, education: Education) => Promise<void>;
    deleteEducation?: (educationId: string) => Promise<void>;
}

// ---------- Experience ----------
export interface Experience {
    _id?: string;
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    description?: string;
}

export interface ExperienceStoreInfo {
    experiences: Experience[];
    addExperience?: (experience: Experience) => Promise<void>;
    getExperiences: () => Promise<void>;
    updateExperience?: (experienceId: string, experience: Experience) => Promise<void>;
    deleteExperience?: (experienceId: string) => Promise<void>;
}

// ---------- Interest ----------
export interface Interest {
    _id?: string;
    name: string;
    description?: string;
}

export interface InterestStoreInfo {
    interests: Interest[];
    addInterest?: (interest: Interest) => Promise<void>;
    getInterests: () => Promise<void>;
    updateInterest?: (interestId: string, interest: Interest) => Promise<void>;
    deleteInterest?: (interestId: string) => Promise<void>;
}

// ---------- Language ----------
export interface Language {
    _id?: string;
    name: string;
    fluency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Native';
}

export interface LanguageStoreInfo {
    languages: Language[];
    addLanguage?: (language: Language) => Promise<void>;
    getLanguages: () => Promise<void>;
    updateLanguage?: (languageId: string, language: Language) => Promise<void>;
    deleteLanguage?: (languageId: string) => Promise<void>;
}

// ---------- Project ----------
export interface Project {
    _id?:string;
    title: string;
    description: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
    imageUrl?:string
}

export interface ProjectStoreInfo {
    projects: Project[];
    addProject?: (project: Project) => Promise<void>;
    getProjects: () => Promise<void>;
    updateProject?: (projectId: string, project: Project) => Promise<void>;
    deleteProject?: (projectId: string) => Promise<void>;
}

// ---------- Resume ----------
export interface Resume {
    _id?: string;
    fileUrl: string;
    uploadedAt: Date;
    fileName?: string;
    fileType?: string | "PDF" | "IMAGE"
}

export interface ResumeStoreInfo {
    resumes: Resume[];
    addResume?: (resume: Resume) => Promise<void>;
    getResumes: () => Promise<void>;
    updateResume?: (resumeId: string, resume: Resume) => Promise<void>;
    deleteResume?: (resumeId: string) => Promise<void>;
}

// ---------- Skill ----------
export interface Skill {
    _id?: string;
    name: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
    iconName?:string;
}

export interface SkillStoreInfo {
    skills: Skill[];
    addSkill?: (skill: Skill) => Promise<void>;
    getSkills: () => Promise<void>;
    updateSkill?: (skillId: string, skill: Skill) => Promise<void>;
    deleteSkill?: (skillId: string) => Promise<void>;
}

// ---------- Social Media ----------
export interface SocialMedia {
    _id?: string;
    platform: string;   // e.g., "GitHub", "LinkedIn"
    url: string;        // full profile URL
    icon?: string;      // optional icon
    username?: string;  // optional display name
}

export interface SocialMediaStoreInfo {
    socialMedia: SocialMedia[];
    addSocialMedia?: (social: SocialMedia) => Promise<void>;
    getSocialMedia: () => Promise<void>;
    updateSocialMedia?: (socialId: string, social: SocialMedia) => Promise<void>;
    deleteSocialMedia?: (socialId: string) => Promise<void>;
}

// ---------- User ----------
export interface User {
    _id?:string;
    name?: string;
    email: string;
    password: string;
    avatarUrl?: string;
    bio?: string;
    createdAt?: Date;
}

export interface UserStoreInfo {
    user: User | null;
    registerAndLogin?: (user: User) => Promise<void>;
    getUser: () => Promise<void>;
    updateUser?: (user: User) => Promise<void>;
}


