// Real API Client for 1photo AI
// Connects to ai-studio.me API

const API_BASE = '/api/proxy'; // Use local proxy to avoid CORS
const API_KEY = 'sk-VVcGEpwwm4Thtra20N4ppN48xQJ4A7lh'; // Test account key

const request = async (endpoint, options = {}) => {
    // Strip '/api' prefix from endpoint if present, because proxy mounts at /api/proxy
    // and forwards to /api/...
    // If endpoint is /api/grok/images, we want /api/proxy/grok/images

    const cleanEndpoint = endpoint.startsWith('/api') ? endpoint.substring(4) : endpoint;
    const url = `${API_BASE}${cleanEndpoint}`;

    const headers = {
        'Authorization': `Bearer ${API_KEY}`,
        ...options.headers
    };

    // Auto-add Content-Type for JSON unless it's FormData (which sets its own boundary)
    if (!(options.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(url, {
        ...options,
        headers
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error?.message || data.message || 'API Request Failed');
    }

    return data;
};

export const apiClient = {
    /**
     * Create a generation task
     * @param {string} type - 'image', 'video', 'music'
     * @param {object} params - { prompt, platform, image_url, aspect_ratio, duration, ... }
     */
    createTask: async (type, params) => {
        console.log(`[API] Creating ${type} task on ${params.platform}`, params);

        let endpoint = '';
        let body = {};
        const platform = params.platform || 'grok';

        if (type === 'image') {
            endpoint = `/api/${platform}/images`;
            // Map aspect_ratio to size if necessary, or pass params
            // Start with simple defaults if size not provided
            let size = '1024x1024';
            if (params.aspect_ratio === '16:9') size = '1280x720'; // Approx
            else if (params.aspect_ratio === '9:16') size = '720x1280';

            body = {
                prompt: params.prompt,
                model: params.model,
                size: params.size || size,
                count: 1
            };
        } else if (type === 'video') {
            endpoint = `/api/${platform}/videos`;
            const action = params.image_url ? 'image2video' : 'text2video';

            body = {
                action,
                prompt: params.prompt,
                model: params.model,
                duration: params.duration || 5,
                aspect_ratio: params.aspect_ratio || '16:9'
            };

            if (action === 'image2video') {
                body.image_url = params.image_url;
            }
        } else if (type === 'music') {
            endpoint = `/api/suno/music`;
            // Music specific params
            body = {
                prompt: params.prompt,
                style: params.style, // Assuming params might have style
                lyrics: params.lyrics
            };
        } else {
            throw new Error(`Unsupported task type: ${type}`);
        }

        const result = await request(endpoint, {
            method: 'POST',
            body: JSON.stringify(body)
        });

        // Add platform to the result so it can be extracted later if needed
        return {
            ...result,
            platform
        };
    },

    /**
     * Get status of a task
     * @param {string} taskId 
     * @param {string} platform - Required for the URL
     */
    getTaskStatus: async (taskId, platform) => {
        if (!platform) {
            console.warn('[API] getTaskStatus called without platform. Using default "grok" or guessing.');
            platform = 'grok'; // Fallback
        }

        const endpoint = `/api/${platform}/tasks`;

        // The API expects POST with task_id for query
        const data = await request(endpoint, {
            method: 'POST',
            body: JSON.stringify({ task_id: taskId })
        });

        // Normalize the response to match what the UI expects
        // UI expects: { status: 'succeeded' | 'processing' | 'failed', progress: number, result: { url, type } }

        const mappedResult = {
            task_id: data.task_id,
            status: data.status, // pending, processing, succeeded, failed
            progress: data.status === 'succeeded' ? 100 : (data.status === 'processing' ? 50 : 0) // Fake progress if not provided
        };

        if (data.status === 'succeeded') {
            if (data.images && data.images.length > 0) {
                mappedResult.result = { type: 'image', url: data.images[0].url };
            } else if (data.video) {
                mappedResult.result = { type: 'video', url: data.video.url };
            } else if (data.music && data.music.length > 0) {
                mappedResult.result = { type: 'audio', url: data.music[0].url };
            }
        }

        // Handle error
        if (data.status === 'failed') {
            console.error('Task failed:', data.error);
        }

        return mappedResult;
    },

    /**
     * Upload a file
     * @param {File} file 
     */
    uploadFile: async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        const data = await request('/api/upload/file', {
            method: 'POST',
            body: formData
        });

        if (data.success && data.data && data.data.length > 0) {
            return {
                url: data.data[0].url,
                file_id: data.data[0].filename // or some id
            };
        }
        throw new Error('Upload failed');
    },

    /**
     * Get account balance
     */
    getBalance: async () => {
        return request('/api/account/balance', { method: 'POST' });
    }
};
