'use client'

import React from 'react'
import { usePublicProfileStore } from '@/store/public.store'

function SkillsCard() {
  const { skills } = usePublicProfileStore();

  if (!skills?.length) return null;

  // Taking first 4 skills to maintain the bento aesthetic
  const displaySkills = skills.slice(0, 4);

  const getSkillIcon = (skillName: string) => {
    const iconMap: { [key: string]: string } = {
      'TypeScript': 'javascript',
      'React': 'polyline',
      'Node.js': 'terminal',
      'JavaScript': 'code',
      'Python': 'architecture',
      'Java': 'coffee',
      'C++': 'memory',
      'Go': 'rocket_launch',
      'Rust': 'build',
      'Docker': 'container',
      'AWS': 'cloud',
      'Kubernetes': 'hub',
      'MongoDB': 'storage',
      'PostgreSQL': 'database',
      'Redis': 'speed',
      'GraphQL': 'share',
      'REST API': 'api',
      'Git': 'account_tree',
      'CI/CD': 'alt_route',
      'Testing': 'verified_user'
    };
    return iconMap[skillName] || 'code';
  };

  const getProficiencyStyle = (level: string) => {
    switch (level?.toLowerCase()) {
      case 'expert':
      case 'advanced':
        return 'bg-[#2fd9f4]/10 text-[#2fd9f4] border-[#2fd9f4]/20';
      case 'intermediate':
        return 'bg-[#98cbff]/10 text-[#98cbff] border-[#98cbff]/20';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <section>
      <div className="flex items-center gap-2 mb-6">
        <div className="h-1 w-8 bg-[#2fd9f4] rounded-full" />
        <h3 className="text-[#dae2fd] font-bold tracking-tight uppercase text-sm">Core Stack</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {displaySkills.map((skill, index) => (
          <div 
            key={skill._id} 
            className="group relative overflow-hidden bg-[#1a2133] border border-white/5 hover:border-[#2fd9f4]/30 p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1"
          >
            {/* Background Glow Effect on Hover */}
            <div className="absolute -inset-px bg-gradient-to-br from-[#2fd9f4]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex flex-col justify-between h-32">
              <div className="flex justify-between items-start">
                <div className={`p-2 rounded-lg bg-black/20 border border-white/5 group-hover:scale-110 transition-transform duration-300`}>
                  <span className={`material-symbols-outlined text-2xl ${index % 2 === 0 ? 'text-[#2fd9f4]' : 'text-[#98cbff]'}`}>
                    {getSkillIcon(skill.name)}
                  </span>
                </div>
                
                {/* Minimalist level indicator (Dot) */}
                <div className="flex gap-1">
                    <span className={`h-1.5 w-1.5 rounded-full ${getProficiencyStyle(skill.level).split(' ')[1]}`} />
                </div>
              </div>

              <div>
                <h4 className="text-[#dae2fd] font-semibold text-lg mb-1">{skill.name}</h4>
                <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold uppercase tracking-widest ${getProficiencyStyle(skill.level)}`}>
                  {skill.level}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SkillsCard;