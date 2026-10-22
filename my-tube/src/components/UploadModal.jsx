import React, { useState } from 'react';
import { X, UploadCloud, Film } from 'lucide-react';

export default function UploadModal({ isOpen, onClose, onUpload, showToast }) {
  const [title, setTitle] = useState('');
  const [channel, setChannel] = useState('Alex Creator');
  const [category, setCategory] = useState('Programming');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast("Please enter a video title");
      return;
    }

    const newVideo = {
      id: "yt-user-" + Date.now(),
      title: title.trim(),
      channel: channel.trim() || 'Alex Creator',
      channelAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
      subscribers: "12K",
      isSubscribed: false,
      views: "1 view",
      viewsCount: 1,
      timestamp: "Just now",
      duration: "03:45",
      category: category,
      thumbnail: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=640&h=360&fit=crop",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      likes: "1",
      likesCount: 1,
      isLiked: false,
      isDisliked: false,
      description: description.trim() || "Uploaded to MY TUBE video network.",
      comments: []
    };

    onUpload(newVideo);
    showToast("Video uploaded to MY TUBE successfully!");
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Film size={22} color="#ff0000" />
            <h2 className="modal-title">Upload to MY TUBE</h2>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="form-group">
            <label>Video Title *</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. My First Project Build with AI"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Channel Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Your Channel Name"
              value={channel}
              onChange={(e) => setChannel(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Programming">Programming</option>
              <option value="AI">AI</option>
              <option value="Gaming">Gaming</option>
              <option value="Music">Music</option>
              <option value="Podcasts">Podcasts</option>
              <option value="Live">Live</option>
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              rows={3}
              placeholder="Tell viewers about your video..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="cancel-comment-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="post-comment-btn" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <UploadCloud size={16} />
              <span>Publish Video</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
