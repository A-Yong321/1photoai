"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { apiClient } from '@/lib/api-client';
import { getToolConfig } from '@/lib/tool-config';

const PLATFORMS = {
  image: [
    { id: 'grok', name: 'Grok', defaultModel: 'flux-dev' },
    { id: 'dreamina', name: 'Dreamina', defaultModel: '' },
    { id: 'kling', name: 'Kling', defaultModel: '' },
    { id: 'lovart', name: 'Lovart', defaultModel: '' },
    { id: 'krea', name: 'Krea', defaultModel: '' }
  ],
  video: [
    { id: 'sora', name: 'Sora', defaultModel: '' },
    { id: 'dreamina', name: 'Dreamina', defaultModel: '' },
    { id: 'kling', name: 'Kling', defaultModel: 'kling-v1' },
    { id: 'hailuo', name: 'Hailuo', defaultModel: 'hailuo-v1' },
    { id: 'higgsfield', name: 'Higgsfield', defaultModel: '' },
    { id: 'heygen', name: 'HeyGen', defaultModel: '' },
    { id: 'krea', name: 'Krea', defaultModel: '' }
  ],
  music: [
    { id: 'suno', name: 'Suno', defaultModel: '' }
  ]
};

// Model Selector Component
const ModelSelector = ({ type, selectedPlatform, onSelect }) => {
  const options = PLATFORMS[type] || [];
  const current = options.find(p => p.id === selectedPlatform) || options[0];

  return (
    <div className="model-selector-container">
      <div className="model-selector-wrapper">
        <div className="model-icon">
          {current?.id === 'kling' ? '🎬' : current?.id === 'sora' ? '🪐' : current?.id === 'dreamina' ? '✨' : '🎨'}
        </div>
        <div className="select-wrapper">
          <label className="model-label">Model</label>
          <div className="select-inner">
            <select
              className="native-select"
              value={selectedPlatform || ''}
              onChange={(e) => {
                console.log('Selected:', e.target.value);
                onSelect(e.target.value);
              }}
            >
              {options.map(opt => (
                <option key={opt.id} value={opt.id}>
                  {opt.name}
                </option>
              ))}
            </select>
            <div className="current-value">{current?.name || 'Select Model'}</div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .model-selector-wrapper {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 16px;
          position: relative;
        }
        .model-icon {
          font-size: 1.8rem;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.05);
          border-radius: 8px;
        }
        .select-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .select-inner {
            position: relative;
            width: 100%;
            height: 24px;
        }
        .model-label {
          font-size: 0.75rem;
          color: var(--text-secondary);
          margin-bottom: 2px;
        }
        .native-select {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0; /* Hide default UI but keep clickable */
          z-index: 10;
          cursor: pointer;
          font-size: 16px; /* Prevent zoom on iOS */
        }
        .current-value {
            font-size: 1rem;
            font-weight: 600;
            color: white;
            pointer-events: none;
            display: flex;
            align-items: center;
        }
        .current-value::after {
            content: '▼';
            font-size: 0.7em;
            margin-left: 8px;
            opacity: 0.7;
        }
        .native-select option {
          background: #1f2937;
          color: white;
          padding: 10px;
        }
      `}</style>
    </div>
  );
};

// Mock Gallery Data
const EXAMPLE_IMAGES = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1633511090164-b43840ea1607?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?q=80&w=200&auto=format&fit=crop",
];

export default function ToolPage() {
  const params = useParams();
  const slug = params.slug;
  const config = getToolConfig(slug);

  const [prompt, setPrompt] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [taskId, setTaskId] = useState(null);
  const [result, setResult] = useState(null);
  const [progress, setProgress] = useState(0);
  const [previewImage, setPreviewImage] = useState(null); // For gallery preview

  const [selectedPlatform, setSelectedPlatform] = useState(null);

  // Initialize from config
  useEffect(() => {
    if (config) {
      setPrompt(config.prompt || '');
      setSelectedPlatform(config.platform || 'grok');
    }
  }, [slug]); // DEPENDENCY CHANGE: Only run when slug changes

  // Polling logic
  useEffect(() => {
    let interval;
    if (taskId && isGenerating) {
      interval = setInterval(async () => {
        const currentPlatform = selectedPlatform || config.platform;
        const statusData = await apiClient.getTaskStatus(taskId, currentPlatform);

        if (statusData.status === 'succeeded') {
          setResult(statusData.result);
          setIsGenerating(false);
          setTaskId(null);
        } else {
          setProgress(statusData.progress || 0);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [taskId, isGenerating, selectedPlatform, slug]);

  const handleGenerate = async () => {
    if (!prompt) return;

    setIsGenerating(true);
    setResult(null);
    setProgress(0);

    try {
      let fileUrl = null;
      if (config.requiresUpload && selectedFile) {
        setIsUploading(true);
        const uploadResult = await apiClient.uploadFile(selectedFile);
        fileUrl = uploadResult.url;
        setIsUploading(false);
      }

      // Find the default model for the selected platform
      const type = config.type || 'image';
      const platformOptions = PLATFORMS[type] || [];
      const platformData = platformOptions.find(p => p.id === (selectedPlatform || config.platform));
      const model = platformData?.defaultModel || null;

      const task = await apiClient.createTask(config.type, {
        prompt,
        image_url: fileUrl,
        aspect_ratio: config.aspectRatio,
        duration: config.duration,
        platform: selectedPlatform || config.platform,
        model: model // Pass the model param
      });
      setTaskId(task.task_id);
    } catch (error) {
      console.error("Generation failed", error);
      setIsGenerating(false);
      setIsUploading(false);
    }
  };

  const handleDownload = async () => {
    if (!result) return;
    try {
      const urlToDownload = result.url;
      const link = document.createElement('a');
      link.href = urlToDownload;
      link.download = `creation-${slug}-${Date.now()}.png`; // Simple download simulation
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error("Download fail", e);
    }
  };

  return (
    <div className="tool-workspace container">
      <div className="workspace-header">
        <h1>{config.title}</h1>
        <p className="subtitle">Use advanced AI to generate and edit content.</p>
      </div>

      <div className="workspace-grid">
        {/* Left Panel - Configuration */}
        <div className="config-panel">

          <div className="panel-section">
            <ModelSelector
              type={config.type || 'image'}
              selectedPlatform={selectedPlatform || config.platform}
              onSelect={setSelectedPlatform}
            />
          </div>

          <div className="panel-section">
            <label className="input-label">Prompt <span className="required">*</span></label>
            <div className="textarea-wrapper">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your creation..."
                rows={6}
                className="custom-textarea"
              />
            </div>
          </div>

          <div className="panel-section">
            <label className="input-label">Reference Image {config.requiresUpload ? <span className="required">*</span> : ''}</label>
            <div className="upload-box" onClick={() => document.getElementById('file-upload').click()}>
              <input
                id="file-upload"
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => setSelectedFile(e.target.files[0])}
              />
              <div className="upload-content">
                <span className="upload-icon">🖼️</span>
                {selectedFile ? (
                  <span className="file-name">{selectedFile.name}</span>
                ) : (
                  <span className="upload-text">Drag reference image here or click to upload<br /><span className="sub-text">JPEG, PNG, WebP (Max 30MB)</span></span>
                )}
              </div>
            </div>
          </div>

          <div className="panel-section">
            <details className="advanced-settings">
              <summary>Advanced Settings</summary>
              <div className="settings-content">
                <div className="setting-row">
                  <label>Aspect Ratio</label>
                  <select className="setting-select">
                    <option>16:9</option>
                    <option>9:16</option>
                    <option>1:1</option>
                  </select>
                </div>
              </div>
            </details>
          </div>

          <div className="panel-footer">
            <div className="credits-info">
              <span className="credits-label">Cost</span>
              <span className="credits-value">🔥 6 Credits</span>
            </div>
            <button
              className="create-btn"
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              {isGenerating ? `Generating ${progress}%` : 'Create'}
            </button>
          </div>
        </div>

        {/* Right Panel - Preview & Gallery */}
        <div className="preview-panel">
          <div className="main-preview">
            <div className="preview-header">Example Image</div>
            <div className="preview-content">
              {result ? (
                config.type === 'video' ? (
                  <video src={result.url} controls autoPlay loop className="preview-media" />
                ) : (
                  <img src={result.url} alt="Result" className="preview-media" />
                )
              ) : (
                <img
                  src={previewImage || EXAMPLE_IMAGES[0]}
                  alt="Preview"
                  className="preview-media placeholder-img"
                />
              )}
            </div>
          </div>

          <div className="gallery-strip">
            <button className="gallery-nav prev">‹</button>
            <div className="gallery-items">
              {EXAMPLE_IMAGES.map((img, i) => (
                <div
                  key={i}
                  className={`gallery-item ${img === (previewImage || EXAMPLE_IMAGES[0]) && !result ? 'active' : ''}`}
                  onClick={() => {
                    setPreviewImage(img);
                    setResult(null);
                  }}
                >
                  <img src={img} alt={`Example ${i}`} />
                </div>
              ))}
              <div className="gallery-item create-new">
                <span>+</span>
              </div>
            </div>
            <button className="gallery-nav next">›</button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .tool-workspace {
            padding-top: var(--header-height);
            min-height: 100vh;
            color: #fff;
            display: flex;
            flex-direction: column;
        }

        .workspace-header {
            padding: 20px 0;
            border-bottom: 1px solid rgba(255,255,255,0.05);
            margin-bottom: 20px;
        }

        .workspace-header h1 {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 4px;
        }
        
        .subtitle {
            font-size: 0.9rem;
            color: var(--text-secondary);
        }

        .workspace-grid {
            display: grid;
            grid-template-columns: 400px 1fr;
            gap: 24px;
            flex: 1;
            padding-bottom: 40px;
        }

        /* Config Panel Style */
        .config-panel {
            background: #13141f; /* Darker panel background */
            border-radius: 16px;
            padding: 24px;
            display: flex;
            flex-direction: column;
            gap: 24px;
            height: fit-content;
            border: 1px solid rgba(255,255,255,0.05);
        }

        .model-selector-container {
            position: relative;
        }

        .model-selector {
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 12px;
            padding: 12px 16px;
            display: flex;
            align-items: center;
            gap: 12px;
            cursor: pointer;
            transition: 0.2s;
            position: relative;
        }
        .model-selector:hover {
            border-color: rgba(255,255,255,0.2);
            background: rgba(255,255,255,0.05);
        }

        .model-select-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
            z-index: 10;
        }

        .model-icon { font-size: 1.5rem; }
        .model-info { flex: 1; display: flex; flex-direction: column; }
        .model-name { font-weight: 600; font-size: 0.95rem; }
        .model-desc { font-size: 0.75rem; color: var(--text-secondary); }
        .chevron { color: var(--text-secondary); font-size: 0.8rem; }

        .input-label {
            display: block;
            font-size: 0.9rem;
            font-weight: 600;
            margin-bottom: 8px;
            color: #d1d5db; /* Light gray */
        }
        .required { color: #f59e0b; margin-left: 4px; }

        .textarea-wrapper {
            position: relative;
        }
        
        .custom-textarea {
            width: 100%;
            background: transparent;
            border: 1px solid #f59e0b; /* Orange border for active input as per screenshot */
            border-radius: 8px;
            padding: 12px;
            color: #fff;
            font-family: inherit;
            font-size: 0.9rem;
            line-height: 1.5;
            resize: vertical;
            outline: none;
            box-shadow: 0 0 0 1px rgba(245, 158, 11, 0.2);
        }

        .upload-box {
            border: 2px dashed rgba(255,255,255,0.15);
            border-radius: 12px;
            padding: 30px 20px;
            text-align: center;
            cursor: pointer;
            transition: 0.2s;
            background: rgba(255,255,255,0.02);
        }
        .upload-box:hover {
            border-color: rgba(255,255,255,0.3);
            background: rgba(255,255,255,0.04);
        }
        .upload-icon { font-size: 2rem; display: block; margin-bottom: 12px; opacity: 0.7; }
        .upload-text { font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5; }
        .sub-text { font-size: 0.75rem; color: var(--text-tertiary); }
        .file-name { color: #f59e0b; font-size: 0.9rem; }

        .advanced-settings {
            border-top: 1px solid rgba(255,255,255,0.05);
            padding-top: 16px;
        }
        .advanced-settings summary {
            cursor: pointer;
            color: var(--text-secondary);
            font-size: 0.9rem;
            user-select: none;
            list-style: none; /* Hide default triangle */
            display: flex;
            align-items: center;
        }
        .advanced-settings summary::before {
            content: '▶';
            font-size: 0.6rem;
            margin-right: 8px;
            transition: transform 0.2s;
        }
        .advanced-settings[open] summary::before {
            transform: rotate(90deg);
        }
        .settings-content {
            padding-top: 12px;
        }
        .setting-select {
            background: #000;
            border: 1px solid rgba(255,255,255,0.1);
            color: white;
            padding: 6px 12px;
            border-radius: 6px;
            width: 100%;
            margin-top: 4px;
        }

        .panel-footer {
            margin-top: auto;
            border-top: 1px solid rgba(255,255,255,0.05);
            padding-top: 20px;
        }

        .credits-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
            font-size: 0.9rem;
        }
        .credits-value { color: #f59e0b; font-weight: 600; display: flex; align-items: center; gap: 4px; }

        .create-btn {
            width: 100%;
            background: #f59e0b; /* Orange button */
            color: #000;
            font-weight: 700;
            padding: 12px;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            transition: 0.2s;
            font-size: 1rem;
        }
        .create-btn:hover:not(:disabled) {
            background: #d97706; /* Darker orange */
        }
        .create-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
            background: #78350f;
            color: rgba(255,255,255,0.5);
        }

        /* Preview Panel Style */
        .preview-panel {
            background: #13141f;
            border-radius: 16px;
            border: 1px solid rgba(255,255,255,0.05);
            padding: 24px;
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .preview-header {
            font-size: 0.9rem;
            color: var(--text-secondary);
            margin-bottom: 12px;
        }

        .main-preview {
            flex: 1;
            background: #000;
            border-radius: 12px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 400px;
            position: relative;
        }

        .preview-media {
            width: 100%;
            height: 100%;
            object-fit: contain;
            display: block;
        }
        
        .gallery-strip {
            display: flex;
            align-items: center;
            gap: 12px;
            height: 80px;
        }
        
        .gallery-items {
            flex: 1;
            display: flex;
            gap: 12px;
            overflow-x: auto;
            height: 100%;
            padding-bottom: 4px; /* Scrollbar space */
        }

        .gallery-item {
            min-width: 80px;
            height: 100%;
            border-radius: 8px;
            overflow: hidden;
            border: 2px solid transparent;
            cursor: pointer;
            position: relative;
        }
        .gallery-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .gallery-item.active {
            border-color: #f59e0b;
        }
        
        .gallery-nav {
            background: rgba(255,255,255,0.05);
            border: none;
            color: white;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 1.2rem;
        }
        .gallery-nav:hover { background: rgba(255,255,255,0.1); }

        .create-new {
            background: rgba(255,255,255,0.05);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            color: var(--text-secondary);
        }
        
        @media (max-width: 1024px) {
            .workspace-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
