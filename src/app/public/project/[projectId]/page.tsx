'use client';

import { useProject } from '@/context/project.context';
import { ProjectProvider } from '@/context/ProjectProvider';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Expand, X } from 'lucide-react';
import MarkDown from 'react-markdown';

function ProjectSinglePage() {
  const projectId = useParams().projectId as string;

  return (
    <ProjectProvider>
      <ProjectSingle projectId={projectId} />
    </ProjectProvider>
  );
}

export default ProjectSinglePage;

const ProjectSingle: React.FC<{ projectId: string }> = ({ projectId }) => {
  const { project, getProject } = useProject();
  const [isDialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    getProject(projectId);
  }, [getProject, projectId]);

  // 🔒 Prevent background scroll when fullscreen is open
  useEffect(() => {
    if (isDialogOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isDialogOpen]);

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-400">
        Loading project...
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">{project.title}</h1>

      {/* Project Preview */}
      <div className="relative aspect-video w-full rounded shadow overflow-hidden">
        <iframe
          src={project.liveUrl}
          className="absolute inset-0 w-full h-full border-none"
          allowFullScreen
        />
      </div>

      {/* Fullscreen Button */}
      <div className="mt-4 text-right">
        <Dialog.Root open={isDialogOpen} onOpenChange={setDialogOpen}>
          <Dialog.Trigger asChild>
            <button
              className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-700 transition"
              title="View in fullscreen"
            >
              <Expand size={18} /> Fullscreen
            </button>
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/70 z-40" />
            <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
              <div className="relative w-screen h-screen">
                <iframe
                  src={project.liveUrl}
                  className="w-full h-full border-none"
                  allowFullScreen
                />
                <Dialog.Close asChild>
                  <button
                    className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition"
                    title="Close"
                  >
                    <X size={20} />
                  </button>
                </Dialog.Close>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      {/* Description */}
      <div className="prose prose-invert mt-6 max-w-none">
        <MarkDown>{project.description}</MarkDown>
      </div>
    </div>
  );
};
