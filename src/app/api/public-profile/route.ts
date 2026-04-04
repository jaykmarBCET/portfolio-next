import { NextResponse } from 'next/server';
import { dbConnect } from '@/connection/dbConnect';
import UserModel from '@/models/User.model';
import SkillModel from '@/models/Skills.model';
import ProjectModel from '@/models/Projects.model';
import EducationModel from '@/models/Education.model';
import ExperienceModel from '@/models/Experience.model';
import CertificationModel from '@/models/Certification.model';
import LanguageModel from '@/models/Language.model';
import InterestModel from '@/models/Interests.model';
import SocialMediaModel from '@/models/SocialLinks.model';
import ResumeModel from '@/models/Resume.model';
import AwardModel from '@/models/Awards.model';

export async function GET() {
  try {
    await dbConnect();

    // Fetch all data in parallel
    const [user, skills, projects, educationList, experiences, certifications, languages, interests, socialMedia, resumes, awards] = await Promise.all([
      UserModel.findOne().select('-password -email -__v').lean(),
      SkillModel.find().lean(),
      ProjectModel.find().lean(),
      EducationModel.find().lean(),
      ExperienceModel.find().lean(),
      CertificationModel.find().lean(),
      LanguageModel.find().lean(),
      InterestModel.find().lean(),
      SocialMediaModel.find().lean(),
      ResumeModel.find().lean(),
      AwardModel.find().lean(),
    ]);

    return NextResponse.json(
      {
        user,
        skills,
        projects,
        educationList,
        experiences,
        certifications,
        languages,
        interests,
        socialMedia,
        resumes,
        awards,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to fetch public profile:', error);
    return NextResponse.json(
      { message: 'Failed to fetch profile data' },
      { status: 500 }
    );
  }
}
