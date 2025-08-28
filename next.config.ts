import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // --- Social Media ---
      { protocol: 'https', hostname: 'avatars.githubusercontent.com', pathname: '/**' }, // GitHub
      { protocol: 'https', hostname: 'pbs.twimg.com', pathname: '/**' }, // Twitter
      { protocol: 'https', hostname: 'abs.twimg.com', pathname: '/**' },
      { protocol: 'https', hostname: 'media.licdn.com', pathname: '/**' }, // LinkedIn
      { protocol: 'https', hostname: 'scontent.xx.fbcdn.net', pathname: '/**' }, // Facebook
      { protocol: 'https', hostname: '*.fna.fbcdn.net', pathname: '/**' },
      { protocol: 'https', hostname: '*.cdninstagram.com', pathname: '/**' }, // Instagram
      { protocol: 'https', hostname: '*.pinimg.com', pathname: '/**' }, // Pinterest
      { protocol: 'https', hostname: 'snapchat.com', pathname: '/**' }, // Snapchat
      { protocol: 'https', hostname: 'discordapp.com', pathname: '/**' }, // Discord
      { protocol: 'https', hostname: 'cdn.discordapp.com', pathname: '/**' },
      { protocol: 'https', hostname: 'redditstatic.com', pathname: '/**' }, // Reddit
      { protocol: 'https', hostname: 'preview.redd.it', pathname: '/**' },
      { protocol: 'https', hostname: 'gravatar.com', pathname: '/**' }, // Gravatar

      // --- Hosting / Deployments ---
      { protocol: 'https', hostname: '*.vercel.app', pathname: '/**' }, // Vercel
      { protocol: 'https', hostname: '*.netlify.app', pathname: '/**' }, // Netlify
      { protocol: 'https', hostname: '*.onrender.com', pathname: '/**' },

      // --- Video / Streaming ---
      { protocol: 'https', hostname: 'i.ytimg.com', pathname: '/**' }, // YouTube Thumbnails
      { protocol: 'https', hostname: 'yt3.ggpht.com', pathname: '/**' }, // YouTube Avatars
      { protocol: 'https', hostname: 'vimeo.com', pathname: '/**' }, // Vimeo
      { protocol: 'https', hostname: 'i.vimeocdn.com', pathname: '/**' },
      { protocol: 'https', hostname: 'dailymotion.com', pathname: '/**' }, // Dailymotion
      { protocol: 'https', hostname: 'dai.ly', pathname: '/**' },

      // --- Design / Inspiration ---
      
      { protocol: 'https', hostname: 'mir-s3-cdn-cf.behance.net', pathname: '/**' }, // Behance
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' }, // Unsplash
      { protocol: 'https', hostname: 'plus.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'staticflickr.com', pathname: '/**' }, // Flickr
      { protocol: 'https', hostname: 'live.staticflickr.com', pathname: '/**' },
      { protocol: 'https', hostname: '*.pexels.com', pathname: '/**' }, // Pexels
      { protocol: 'https', hostname: '*.pixabay.com', pathname: '/**' }, // Pixabay


      // --- Storage / CDN ---
      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/**' }, // Cloudinary
      { protocol: 'https', hostname: 'lh3.googleusercontent.com', pathname: '/**' }, // Google Photos/Drive
      { protocol: 'https', hostname: 'drive.google.com', pathname: '/**' },
      { protocol: 'https', hostname: 'dropbox.com', pathname: '/**' }, // Dropbox
      { protocol: 'https', hostname: 'dl.dropboxusercontent.com', pathname: '/**' },
      { protocol: 'https', hostname: 'onedrive.live.com', pathname: '/**' }, // OneDrive
      { protocol: 'https', hostname: 'graph.microsoft.com', pathname: '/**' },
      { protocol: 'https', hostname: '*.amazonaws.com', pathname: '/**' }, // AWS S3
      { protocol: 'https', hostname: '*.googleapis.com', pathname: '/**' }, // Firebase/CDN
      { protocol: 'https', hostname: 'storage.googleapis.com', pathname: '/**' },

      // --- Favicons / Misc ---
      { protocol: 'https', hostname: 'www.google.com', pathname: '/s2/favicons/**' }, // Google Favicon API
      { protocol: 'https', hostname: 'api.iconify.design', pathname: '/**' }, // Iconify
      { protocol: 'https', hostname: 'img.icons8.com', pathname: '/**' }, // Icons8
      
      { protocol: 'https', hostname: '*.githubusercontent.com', pathname: '/**' }, // GitHub CDN
      { protocol: 'https', hostname: '*.gitlab.com', pathname: '/**' }, // GitLab
      
    ],
  },
};

export default nextConfig;
