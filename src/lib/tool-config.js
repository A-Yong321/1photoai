// Tool Configuration mapping slugs to specific prompts and settings
// Derived from 1.1photo网站整理.pdf

export const toolConfig = {
    // === Video AI Tools ===
    'image-to-video': {
        title: 'Image to Video',
        prompt: 'Animate this image, gentle motion, cinematic lighting',
        type: 'video',
        aspectRatio: '16:9',
        duration: 5,
        platform: 'kling',
        requiresUpload: true
    },
    'text-to-video': {
        title: 'Text to Video',
        prompt: 'Cinematic drone shot of a futuristic city, golden hour, high detail',
        type: 'video',
        aspectRatio: '16:9',
        duration: 5,
        platform: 'kling'
    },
    'reference-to-video': {
        title: 'Reference to Video',
        prompt: 'Video based on reference character, consistent style',
        type: 'video',
        aspectRatio: '16:9',
        duration: 5,
        platform: 'kling',
        requiresUpload: true
    },
    'video-to-video': {
        title: 'Video to Video',
        prompt: 'Transform video style to anime, vibrant colors',
        type: 'video',
        aspectRatio: '16:9',
        duration: 5,
        platform: 'kling' // Mapped to text2video as video input not fully supported by simple API
    },
    'animation-generator': {
        title: 'AI Animation',
        prompt: 'Japanese anime style, detailed background, expressive characters',
        type: 'video',
        aspectRatio: '16:9',
        duration: 5,
        platform: 'dreamina'
    },
    'photo-avatar': {
        title: 'Talking Photo',
        prompt: 'Talking head video, natural facial expressions',
        type: 'video',
        aspectRatio: '9:16',
        duration: 10,
        platform: 'heygen', // Explicitly supported in API doc
        requiresUpload: true
    },
    'music-video': {
        title: 'AI Music Video',
        prompt: 'Music video visualization, rhythmic motion, neon lights',
        type: 'video',
        aspectRatio: '16:9',
        duration: 10,
        platform: 'sora'
    },
    'shorts': {
        title: 'AI Shorts',
        prompt: 'Viral tiktok style video, fast paced, engaging',
        type: 'video',
        aspectRatio: '9:16',
        duration: 15,
        platform: 'dreamina'
    },
    'video-editor': {
        title: 'AI Video Editor',
        prompt: 'Edit this scene to have a sunset background',
        type: 'video',
        aspectRatio: '16:9',
        duration: 5,
        platform: 'kling'
    },
    'video-agent': {
        title: 'AI Video Agent',
        prompt: 'Automated video content creation',
        type: 'video',
        aspectRatio: '16:9',
        duration: 5,
        platform: 'hailuo'
    },

    // === Image AI Tools ===
    'text-to-image': {
        title: 'Text to Image',
        prompt: 'A creative masterpiece, high detail, 8k resolution',
        type: 'image',
        aspectRatio: '16:9',
        platform: 'grok',
        model: 'flux-dev'
    },
    'image-to-image': {
        title: 'Image to Image',
        prompt: 'Variation of the reference image, artistic style',
        type: 'image',
        aspectRatio: '16:9',
        platform: 'dreamina', // Dreamina often supports img2img better if available, else grok
        requiresUpload: true
    },
    'image-mixer': {
        title: 'Image Mixer',
        prompt: 'Blend of concepts, surreal art',
        type: 'image',
        aspectRatio: '1:1',
        platform: 'grok'
    },
    'upscaler': {
        title: 'Image Upscaler',
        prompt: 'High resolution upscaled version, sharp details',
        type: 'image',
        aspectRatio: '16:9',
        platform: 'krea',
        requiresUpload: true
    },
    'remove-background': {
        title: 'Remove Background',
        prompt: 'Object isolated on white background', // Conceptual, API might not support direct removal action
        type: 'image',
        aspectRatio: '1:1',
        platform: 'krea',
        requiresUpload: true
    },

    // === Audio Tools ===
    'text-to-music': {
        title: 'AI Music Generator',
        prompt: 'Upbeat pop song, summer vibes, catchy melody',
        type: 'music',
        duration: 180,
        platform: 'suno'
    },

    // Default fallback
    'default': {
        title: 'AI Creation Tool',
        prompt: '',
        type: 'image',
        aspectRatio: '1:1', // Corrected aspect ratio syntax
        platform: 'grok'
    }
};

export const getToolConfig = (slug) => {
    return toolConfig[slug] || toolConfig['default'];
};
