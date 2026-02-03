
export const menuData = [
    {
        title: "Video AI",
        key: "video-ai",
        items: [
            {
                title: "Image to Video",
                desc: "Turn static images into realistic dynamic videos.",
                icon: "🖼️", // Should be replaced with SVG in real project
                href: "/tool/image-to-video",
            },
            {
                title: "Text to Video",
                desc: "Generate stunning videos from simple text prompts.",
                icon: "📝",
                href: "/tool/text-to-video",
            },
            {
                title: "Reference to Video",
                desc: "Maintain character, object, or scene consistency throughout the video.",
                icon: "🔄",
                href: "/tool/reference-to-video",
            },
            {
                title: "Video to Video",
                desc: "Recreate existing videos in any creative animation style.",
                icon: "📹",
                href: "/tool/video-to-video",
            },
            {
                title: "AI Animation",
                desc: "Generate charming anime and cartoon videos in various styles.",
                icon: "🎨",
                href: "/tool/animation-generator",
            },
            {
                title: "Talking Photo",
                desc: "Create lifelike video avatars from a single photo.",
                icon: "🗣️",
                href: "/tool/photo-avatar",
            },
            {
                title: "AI Music Video",
                desc: "Transform your songs into mesmerizing MVs with AI in minutes.",
                icon: "🎵",
                href: "/tool/music-video",
            },
            {
                title: "AI Shorts",
                desc: "Create viral short videos without shooting or editing.",
                icon: "📱",
                href: "/tool/shorts",
            },
            {
                title: "AI Video Editor",
                desc: "Edit videos instantly with simple text prompts.",
                icon: "✂️",
                href: "/tool/video-editor",
            },
            {
                title: "AI Video Agent",
                desc: "Create and clone viral videos with zero editing.",
                icon: "🤖",
                href: "/tool/video-agent",
                badge: "Beta"
            }
        ],
        footer: {
            title: "Supported Video Models",
            models: [
                { name: "Pollo 2.5", badge: "New", color: "green" },
                { name: "Veo 3", badge: "Hot", color: "red" },
                { name: "Sora 2" },
                { name: "Kling AI" },
                { name: "Halluo AI" },
                { name: "PixVerse AI" },
                { name: "Runway" },
                { name: "Vidu AI" },
                { name: "Luma AI" },
                { name: "Pika AI" },
                { name: "Seedance" },
                { name: "Wan AI" },
                { name: "Hunyuan" },
                { name: "Midjourney" }
            ]
        }
    },
    {
        title: "Image AI",
        key: "image-ai",
        items: [
            {
                title: "Text to Image",
                desc: "Generate high-quality images using advanced models.",
                icon: "🎨",
                href: "/tool/text-to-image",
            },
            {
                title: "Image to Image",
                desc: "Generate new creative images based on reference images.",
                icon: "🖼️",
                href: "/tool/image-to-image",
            },
            {
                title: "Image Mixer",
                desc: "Seamlessly blend multiple images together.",
                icon: "🌪️",
                href: "/tool/image-mixer",
            },
            {
                title: "Image Upscaler",
                desc: "Enhance image resolution and quality.",
                icon: "✨",
                href: "/tool/upscaler",
            },
            {
                title: "Remove Background",
                desc: "Remove image backgrounds with one click.",
                icon: "🗑️",
                href: "/tool/remove-background",
            }
        ],
        footer: {
            title: "Supported Image Models",
            models: [
                { name: "Flux.1" },
                { name: "Midjourney V6" },
                { name: "Stable Diffusion 3" },
                { name: "DALL-E 3" },
                { name: "Ideogram" }
            ]
        }
    }
];
