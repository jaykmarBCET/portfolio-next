import { create } from 'zustand';
import axios from 'axios';
import { AllEndPoint } from "@/constants/constant";
import {
    User,
    Award,
    Certification,
    Contact,
    Education,
    Experience,
    Interest,
    Language,
    Project,
    Resume,
    Skill,
    SocialMedia,
    UserStoreInfo,
    AwardStoreInfo,
    CertificationStoreInfo,
    ContactStoreInfo,
    EducationStoreInfo,
    ExperienceStoreInfo,
    InterestStoreInfo,
    LanguageStoreInfo,
    ProjectStoreInfo,
    ResumeStoreInfo,
    SkillStoreInfo,
    SocialMediaStoreInfo
} from "@/types/types";
import toast from 'react-hot-toast';

// Combine all store interfaces into a single type for a unified store
type CombinedStore =
    AwardStoreInfo &
    CertificationStoreInfo &
    ContactStoreInfo &
    EducationStoreInfo &
    ExperienceStoreInfo &
    InterestStoreInfo &
    LanguageStoreInfo &
    ProjectStoreInfo &
    ResumeStoreInfo &
    SkillStoreInfo &
    SocialMediaStoreInfo &
    UserStoreInfo;

// Create the Zustand store
export const useProfileStore = create<CombinedStore>((set, get) => ({
    // Initial state for all data types
    awards: [],
    certifications: [],
    contacts: [],
    educationList: [],
    experiences: [],
    interests: [],
    languages: [],
    projects: [],
    resumes: [],
    skills: [],
    socialMedia: [],
    user: null,

    // ----------------- User Actions -----------------
    registerAndLogin: async (user: User) => {
        try {
            await axios.post(AllEndPoint.apiUser, user);
        
            await get().getUser(); 
            toast.success("Login Successfully")
        } catch (error) {
            console.error("Failed to register user:", error);
            toast.error("Field")
        }
    },
    getUser: async () => {
        try {
            const response = await axios.get(AllEndPoint.apiUser);
            set({ user: response.data });
            
        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
    },
    updateUser: async (user: User) => {
        try {
            await axios.put(`${AllEndPoint.apiUser}`, user);
            
            await get().getUser();
        } catch (error) {
            console.error("Failed to update user:", error);
        }
    },
    // ----------------- Award Actions -----------------
    addAward: async (award: Award) => {
        try {
            await axios.post(AllEndPoint.apiAwards, award);
            console.log("Award added successfully");
            await get().getAwards(); // Refresh the list
        } catch (error) {
            console.error("Failed to add award:", error);
        }
    },
    getAwards: async () => {
        try {
            const response = await axios.get(AllEndPoint.apiAwards);
            set({ awards: response.data });
        } catch (error) {
            console.error("Failed to fetch awards:", error);
        }
    },
    updateAward: async (awardId: string, award: Award) => {
        try {
            await axios.put(`${AllEndPoint.apiAwards}`, award,{params:{awardId}});
            console.log(`Award ${awardId} updated successfully`);
            await get().getAwards();
        } catch (error) {
            console.error("Failed to update award:", error);
        }
    },
    deleteAward: async (awardId: string) => {
        try {
            await axios.delete(`${AllEndPoint.apiAwards}`,{params:{awardId}});
            console.log(`Award ${awardId} deleted successfully`);
            await get().getAwards();
        } catch (error) {
            console.error("Failed to delete award:", error);
        }
    },

    // ----------------- Certification Actions -----------------
    addCertification: async (certification: Certification) => {
        try {
            await axios.post(AllEndPoint.apiCertification, certification);
            console.log("Certification added successfully");
            await get().getCertifications();
        } catch (error) {
            console.error("Failed to add certification:", error);
        }
    },
    getCertifications: async () => {
        try {
            const response = await axios.get(AllEndPoint.apiCertification);
            set({ certifications: response.data });
        } catch (error) {
            console.error("Failed to fetch certifications:", error);
        }
    },
    updateCertification: async (certificationId: string, certification: Certification) => {
        try {
            await axios.put(`${AllEndPoint.apiCertification}`, certification,{params:{certificationId}});
            console.log(`Certification ${certificationId} updated successfully`);
            await get().getCertifications();
        } catch (error) {
            console.error("Failed to update certification:", error);
        }
    },
    deleteCertification: async (certificationId: string) => {
        try {
            await axios.delete(`${AllEndPoint.apiCertification}`,{params:{certificationId}});
            console.log(`Certification ${certificationId} deleted successfully`);
            await get().getCertifications();
        } catch (error) {
            console.error("Failed to delete certification:", error);
        }
    },

    // ----------------- Contact Actions -----------------
    addContact: async (contact: Contact) => {
        try {
            await axios.post(AllEndPoint.apiContact, contact);
            console.log("Contact added successfully");
            await get().getContacts();
        } catch (error) {
            console.error("Failed to add contact:", error);
        }
    },
    getContacts: async () => {
        try {
            const response = await axios.get(AllEndPoint.apiContact);
            set({ contacts: response.data });
        } catch (error) {
            console.error("Failed to fetch contacts:", error);
        }
    },
    updateContact: async (contactId: string, contact: Contact) => {
        try {
            await axios.put(`${AllEndPoint.apiContact}`, contact,{params:{contactId}});
            console.log(`Contact ${contactId} updated successfully`);
            await get().getContacts();
        } catch (error) {
            console.error("Failed to update contact:", error);
        }
    },
    deleteContact: async (contactId: string) => {
        try {
            await axios.delete(`${AllEndPoint.apiContact}`,{params:{contactId}});
            console.log(`Contact ${contactId} deleted successfully`);
            await get().getContacts();
        } catch (error) {
            console.error("Failed to delete contact:", error);
        }
    },

    // ----------------- Education Actions -----------------
    addEducation: async (education: Education) => {
        try {
            await axios.post(AllEndPoint.apiEducation, education);
            console.log("Education added successfully");
            await get().getEducation();
        } catch (error) {
            console.error("Failed to add education:", error);
        }
    },
    getEducation: async () => {
        try {
            const response = await axios.get(AllEndPoint.apiEducation);
            set({ educationList: response.data });
        } catch (error) {
            console.error("Failed to fetch education:", error);
        }
    },
    updateEducation: async (educationId: string, education: Education) => {
        try {
            await axios.put(`${AllEndPoint.apiEducation}`, education,{params:{educationId}});
            console.log(`Education ${educationId} updated successfully`);
            await get().getEducation();
        } catch (error) {
            console.error("Failed to update education:", error);
        }
    },
    deleteEducation: async (educationId: string) => {
        try {
            await axios.delete(`${AllEndPoint.apiEducation}/`,{params:{educationId}});
            console.log(`Education ${educationId} deleted successfully`);
            await get().getEducation();
        } catch (error) {
            console.error("Failed to delete education:", error);
        }
    },

    // ----------------- Experience Actions -----------------
    addExperience: async (experience: Experience) => {
        try {
            await axios.post(AllEndPoint.apiExperience, experience);
            console.log("Experience added successfully");
            await get().getExperiences();
        } catch (error) {
            console.error("Failed to add experience:", error);
        }
    },
    getExperiences: async () => {
        try {
            const response = await axios.get(AllEndPoint.apiExperience);
            set({ experiences: response.data });
        } catch (error) {
            console.error("Failed to fetch experiences:", error);
        }
    },
    updateExperience: async (experienceId: string, experience: Experience) => {
        try {
            await axios.put(`${AllEndPoint.apiExperience}`, experience,{params:{experienceId}});
            console.log(`Experience ${experienceId} updated successfully`);
            await get().getExperiences();
        } catch (error) {
            console.error("Failed to update experience:", error);
        }
    },
    deleteExperience: async (experienceId: string) => {
        try {
            await axios.delete(`${AllEndPoint.apiExperience}`,{params:{experienceId}});
            console.log(`Experience ${experienceId} deleted successfully`);
            await get().getExperiences();
        } catch (error) {
            console.error("Failed to delete experience:", error);
        }
    },

    // ----------------- Interest Actions -----------------
    addInterest: async (interest: Interest) => {
        try {
            await axios.post(AllEndPoint.apiInterest, interest);
            console.log("Interest added successfully");
            await get().getInterests();
        } catch (error) {
            console.error("Failed to add interest:", error);
        }
    },
    getInterests: async () => {
        try {
            const response = await axios.get(AllEndPoint.apiInterest);
            set({ interests: response.data });
        } catch (error) {
            console.error("Failed to fetch interests:", error);
        }
    },
    updateInterest: async (interestId: string, interest: Interest) => {
        try {
            await axios.put(`${AllEndPoint.apiInterest}`, interest,{params:{interestId}});
            console.log(`Interest ${interestId} updated successfully`);
            await get().getInterests();
        } catch (error) {
            console.error("Failed to update interest:", error);
        }
    },
    deleteInterest: async (interestId: string) => {
        try {
            await axios.delete(`${AllEndPoint.apiInterest}`,{params:{interestId}});
            console.log(`Interest ${interestId} deleted successfully`);
            await get().getInterests();
        } catch (error) {
            console.error("Failed to delete interest:", error);
        }
    },

    // ----------------- Language Actions -----------------
    addLanguage: async (language: Language) => {
        try {
            await axios.post(AllEndPoint.apiLanguages, language);
            console.log("Language added successfully");
            await get().getLanguages();
        } catch (error) {
            console.error("Failed to add language:", error);
        }
    },
    getLanguages: async () => {
        try {
            const response = await axios.get(AllEndPoint.apiLanguages);
            set({ languages: response.data });
        } catch (error) {
            console.error("Failed to fetch languages:", error);
        }
    },
    updateLanguage: async (languageId: string, language: Language) => {
        try {
            await axios.put(`${AllEndPoint.apiLanguages}`, language,{params:{languageId}});
            console.log(`Language ${languageId} updated successfully`);
            await get().getLanguages();
        } catch (error) {
            console.error("Failed to update language:", error);
        }
    },
    deleteLanguage: async (languageId: string) => {
        try {
            await axios.delete(`${AllEndPoint.apiLanguages}`,{params:{languageId}});
            console.log(`Language ${languageId} deleted successfully`);
            await get().getLanguages();
        } catch (error) {
            console.error("Failed to delete language:", error);
        }
    },

    // ----------------- Project Actions -----------------
    addProject: async (project: Project) => {
        try {
            await axios.post(AllEndPoint.apiProjects, project);
            console.log("Project added successfully");
            await get().getProjects();
        } catch (error) {
            console.error("Failed to add project:", error);
        }
    },
    getProjects: async () => {
        try {
            const response = await axios.get(AllEndPoint.apiProjects);
            set({ projects: response.data });
        } catch (error) {
            console.error("Failed to fetch projects:", error);
        }
    },
    updateProject: async (projectId: string, project: Project) => {
        try {
            await axios.put(`${AllEndPoint.apiProjects}`, project,{params:{projectId}});
            console.log(`Project ${projectId} updated successfully`);
            await get().getProjects();
        } catch (error) {
            console.error("Failed to update project:", error);
        }
    },
    deleteProject: async (projectId: string) => {
        try {
            await axios.delete(`${AllEndPoint.apiProjects}`,{params:{projectId}});
            console.log(`Project ${projectId} deleted successfully`);
            await get().getProjects();
        } catch (error) {
            console.error("Failed to delete project:", error);
        }
    },

    // ----------------- Resume Actions -----------------
    addResume: async (resume: Resume) => {
        try {
            await axios.post(AllEndPoint.apiResume, resume);
            console.log("Resume added successfully");
            await get().getResumes();
        } catch (error) {
            console.error("Failed to add resume:", error);
        }
    },
    getResumes: async () => {
        try {
            const response = await axios.get(AllEndPoint.apiResume);
            set({ resumes: response.data });
        } catch (error) {
            console.error("Failed to fetch resumes:", error);
        }
    },
    updateResume: async (resumeId: string, resume: Resume) => {
        try {
            await axios.put(`${AllEndPoint.apiResume}`, resume,{params:{resumeId}});
            console.log(`Resume ${resumeId} updated successfully`);
            await get().getResumes();
        } catch (error) {
            console.error("Failed to update resume:", error);
        }
    },
    deleteResume: async (resumeId: string) => {
        try {
            await axios.delete(`${AllEndPoint.apiResume}`,{params:{resumeId}});
            console.log(`Resume ${resumeId} deleted successfully`);
            await get().getResumes();
        } catch (error) {
            console.error("Failed to delete resume:", error);
        }
    },

    // ----------------- Skill Actions -----------------
    addSkill: async (skill: Skill) => {
        try {
            await axios.post(AllEndPoint.apiSkills, skill);
            console.log("Skill added successfully");
            await get().getSkills();
        } catch (error) {
            console.error("Failed to add skill:", error);
        }
    },
    getSkills: async () => {
        try {
            const response = await axios.get(AllEndPoint.apiSkills);
            set({ skills: response.data });
        } catch (error) {
            console.error("Failed to fetch skills:", error);
        }
    },
    updateSkill: async (skillId: string, skill: Skill) => {
        try {
            await axios.put(`${AllEndPoint.apiSkills}/`, skill,{params:{skillId}});
            console.log(`Skill ${skillId} updated successfully`);
            await get().getSkills();
        } catch (error) {
            console.error("Failed to update skill:", error);
        }
    },
    deleteSkill: async (skillId: string) => {
        try {
            await axios.delete(`${AllEndPoint.apiSkills}/`,{params:{skillId}});
            console.log(`Skill ${skillId} deleted successfully`);
            await get().getSkills();
        } catch (error) {
            console.error("Failed to delete skill:", error);
        }
    },

    // ----------------- Social Media Actions -----------------
    addSocialMedia: async (social: SocialMedia) => {
        try {
            await axios.post(AllEndPoint.apiSocialMedia, social);
            console.log("Social media added successfully");
            await get().getSocialMedia();
        } catch (error) {
            console.error("Failed to add social media:", error);
        }
    },
    getSocialMedia: async () => {
        try {
            const response = await axios.get(AllEndPoint.apiSocialMedia);
            set({ socialMedia: response.data });
        } catch (error) {
            console.error("Failed to fetch social media:", error);
        }
    },
    updateSocialMedia: async (socialId: string, social: SocialMedia) => {
        try {
            await axios.put(`${AllEndPoint.apiSocialMedia}`, social,{params:{socialId}});
            console.log(`Social media ${socialId} updated successfully`);
            await get().getSocialMedia();
        } catch (error) {
            console.error("Failed to update social media:", error);
        }
    },
    deleteSocialMedia: async (socialId: string) => {
        try {
            await axios.delete(`${AllEndPoint.apiSocialMedia}`,{params:{socialId}});
            console.log(`Social media ${socialId} deleted successfully`);
            await get().getSocialMedia();
        } catch (error) {
            console.error("Failed to delete social media:", error);
        }
    },
}));

