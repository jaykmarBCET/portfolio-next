import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      // --- Social Media & Avatars ---
      { protocol: 'https', hostname: 'avatars.githubusercontent.com', pathname: '/**' },
      { protocol: 'https', hostname: 'pbs.twimg.com', pathname: '/**' },
      { protocol: 'https', hostname: 'abs.twimg.com', pathname: '/**' },
      { protocol: 'https', hostname: '*.fbcdn.net', pathname: '/**' }, // Facebook
      { protocol: 'https', hostname: '*.cdninstagram.com', pathname: '/**' },
      { protocol: 'https', hostname: '*.pinimg.com', pathname: '/**' },
      { protocol: 'https', hostname: 'gravatar.com', pathname: '/**' },
      { protocol: 'https', hostname: 'media.licdn.com', pathname: '/**' },

      // --- Hosting & Deployment ---
      { protocol: 'https', hostname: '*.vercel.app', pathname: '/**' },
      { protocol: 'https', hostname: '*.netlify.app', pathname: '/**' },
      { protocol: 'https', hostname: '*.onrender.com', pathname: '/**' },
      { protocol: 'https', hostname: '*.github.io', pathname: '/**' },

      // --- Video Platforms ---
      { protocol: 'https', hostname: 'i.ytimg.com', pathname: '/**' },
      { protocol: 'https', hostname: 'yt3.ggpht.com', pathname: '/**' },
      { protocol: 'https', hostname: '*.vimeocdn.com', pathname: '/**' },

      // --- Design & Stock Images ---
      { protocol: 'https', hostname: 'static.vecteezy.com', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'plus.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: '*.staticflickr.com', pathname: '/**' },
      { protocol: 'https', hostname: '*.pexels.com', pathname: '/**' },
      { protocol: 'https', hostname: '*.pixabay.com', pathname: '/**' },

      // --- Storage & CDN ---
      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/**' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com', pathname: '/**' },
      { protocol: 'https', hostname: 'drive.google.com', pathname: '/**' },
      { protocol: 'https', hostname: '*.googleusercontent.com', pathname: '/**' },
      { protocol: 'https', hostname: '*.dropboxusercontent.com', pathname: '/**' },
      { protocol: 'https', hostname: 'onedrive.live.com', pathname: '/**' },
      { protocol: 'https', hostname: '*.amazonaws.com', pathname: '/**' },
      { protocol: 'https', hostname: '*.googleapis.com', pathname: '/**' },
      { protocol: 'https', hostname: 'storage.googleapis.com', pathname: '/**' },

      // --- General & Common ---
      { protocol: 'https', hostname: '*.google.com', pathname: '/**' },
      { protocol: 'https', hostname: 'raw.githubusercontent.com', pathname: '/**' },
      { protocol: 'https', hostname: 'img.shields.io', pathname: '/**' },
      { protocol: 'https', hostname: '*.imgur.com', pathname: '/**' },

      // --- Portfolio & Personal ---
      { protocol: 'https', hostname: '*.wordpress.com', pathname: '/**' },
      { protocol: 'https', hostname: '*.blogspot.com', pathname: '/**' },

      // --- Development ---
      { protocol: 'http', hostname: 'localhost', pathname: '/**' },
      { protocol: 'http', hostname: '127.0.0.1', pathname: '/**' },

      // --- Icons & Favicons ---
      { protocol: 'https', hostname: 'api.iconify.design', pathname: '/**' },
      { protocol: 'https', hostname: 'img.icons8.com', pathname: '/**' },
      { protocol: 'https', hostname: '*.gitlab.com', pathname: '/**' },
    ],
  },
};

export default nextConfig;
