import { create } from 'zustand';
import axios, { AxiosError } from 'axios';
import { AllEndPoint } from "@/constants/constant";
import {
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
import { Contact } from 'mailtrap/dist/types/api/contacts';
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

// for publicUrl only GET Method

export const usePublicProfileStore = create<CombinedStore>((set) => ({
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
    getUser: async () => {
        const token = (await axios.get("/api/get-signature")).data
        try {
            const response = await axios.get(AllEndPoint.apiUserPublic,{
                headers:{
                    signature:token
                }
            });
            set({ user: response.data });
        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
    },
    getAwards: async () => {
        const token = (await axios.get("/api/get-signature")).data
        try {
            const response = await axios.get(AllEndPoint.apiAwardsPublic,{
                headers:{
                    signature:token
                }
            });
            set({ awards: response.data });
        } catch (error) {
            console.error("Failed to fetch awards:", error);
        }
    },
    getCertifications: async () => {
        const token = (await axios.get("/api/get-signature")).data
        try {
            const response = await axios.get(AllEndPoint.apiCertificationsPublic,{
                headers:{
                    signature:token
                }
            });
            set({ certifications: response.data });
        } catch (error) {
            console.error("Failed to fetch certifications:", error);
        }
    },
    getContacts: async () => {
        const token = (await axios.get("/api/get-signature")).data
        try {
            const response = await axios.get(AllEndPoint.apiContactPublic,{
                headers:{
                    signature:token
                }
            });
            set({ contacts: response.data });
        } catch (error) {
            console.error("Failed to fetch contacts:", error);
        }
    },
    addContact: async (contact) => {
        const token = (await axios.get("/api/get-signature")).data
        try {
            const response = await axios.post<Contact>(AllEndPoint.apiContactPublic, contact,{
                headers:{
                    signature:token
                }
            });
            if(response.status>400){
                return
            }
            toast.success("We will respond you later..")
            
        } catch (e) {
            const error = e as AxiosError<{message:string}>

            toast.error(error.response?.data.message as string)
        }

    },
    getEducation: async () => {
        const token = (await axios.get("/api/get-signature")).data
        try {
            const response = await axios.get(AllEndPoint.apiEducationPublic,{
                headers:{
                    signature:token
                }
            });
            set({ educationList: response.data });
        } catch (error) {
            console.error("Failed to fetch education:", error);
        }
    },

    getExperiences: async () => {
        const token = (await axios.get("/api/get-signature")).data
        try {
            const response = await axios.get(AllEndPoint.apiExperiencePublic,{
                headers:{
                    signature:token
                }
            });
            set({ experiences: response.data });
        } catch (error) {
            console.error("Failed to fetch experiences:", error);
        }
    },
    getInterests: async () => {
        const token = (await axios.get("/api/get-signature")).data
        try {
            const response = await axios.get(AllEndPoint.apiInterestPublic,{
                headers:{
                    signature:token
                }
            });
            set({ interests: response.data });
        } catch (error) {
            console.error("Failed to fetch interests:", error);
        }
    },
    getLanguages: async () => {
        const token = (await axios.get("/api/get-signature")).data
        try {
            const response = await axios.get(AllEndPoint.apiLanguagesPublic,{
                headers:{
                    signature:token
                }
            });
            set({ languages: response.data });
        } catch (error) {
            console.error("Failed to fetch languages:", error);
        }
    },
    getProjects: async () => {
        const token = (await axios.get("/api/get-signature")).data
        try {
            const response = await axios.get(AllEndPoint.apiProjectsPublic,{
                headers:{
                    signature:token
                }
            });
            set({ projects: response.data });
        } catch (error) {
            console.error("Failed to fetch projects:", error);
        }
    },
    getResumes: async () => {
        const token = (await axios.get("/api/get-signature")).data
        try {
            const response = await axios.get(AllEndPoint.apiResumePublic,{
                headers:{
                    signature:token
                }
            });
            set({ resumes: response.data });
        } catch (error) {
            console.error("Failed to fetch resumes:", error);
        }
    },
    getSkills: async () => {
        const token = (await axios.get("/api/get-signature")).data
        try {
            const response = await axios.get(AllEndPoint.apiSkillsPublic,{
                headers:{
                    signature:token
                }
            });
            set({ skills: response.data });
        } catch (error) {
            console.error("Failed to fetch skills:", error);
        }
    },
    getSocialMedia: async () => {
        const token = (await axios.get("/api/get-signature")).data
        try {
            const response = await axios.get(AllEndPoint.apiSocialMediaPublic,{
                headers:{
                    signature:token
                }
            });
            set({ socialMedia: response.data });
        } catch (error) {
            console.error("Failed to fetch social media:", error);
        }
    },

}))