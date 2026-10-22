import React, { useState } from 'react';
import { MoreVertical, Clock, Share2, EyeOff } from 'lucide-react';

export default function VideoCard({
  video,
  onVideoClick,
  onToggleWatchLater,
  isWatchLater,
  showToast
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleCardClick = (e) => {
    // Prevent triggering if clicked menu button
    if (e.target.closest('.card-menu-btn') || e.target.closest('.card-menu-dropdown')) {
      return;
    }
    onVideoClick(video);
  };

  const handleMenuAction = (action, e) => {
    e.stopPropagation();
    setMenuOpen(false);

    if (action === 'watch-later') {
      onToggleWatchLater(video);
      showToast(isWatchLater ? "Removed from Watch Later" : "Saved to Watch Later");
    } else if (action === 'share') {
      navigator.clipboard?.writeText(window.location.origin + '?v=' + video.id);
      showToast("Link copied to clipboard!");
    } else if (action === 'not-interested') {
      showToast("We will tune recommendations based on your choice");
    }
  };

  return (
    <div className="video-card" onClick={handleCardClick}>
      {/* Thumbnail */}
      <div className="thumbnail-container">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="video-thumbnail-img"
          loading="lazy"
        />
        <span className={`video-duration-badge ${video.duration === 'LIVE' ? 'live' : ''}`}>
          {video.duration}
        </span>
      </div>

      {/* Details */}
      <div className="video-card-details">
        <div className="channel-avatar-link" title={video.channel}>
          <img src={video.channelAvatar} alt={video.channel} />
        </div>

        <div className="video-card-meta">
          <h3 className="video-title" title={video.title}>
            {video.title}
          </h3>
          <div className="channel-name">
            <span>{video.channel}</span>
          </div>
          <div className="video-stats">
            <span>{video.views}</span>
            <span className="stat-dot">•</span>
            <span>{video.timestamp}</span>
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <button
            className="card-menu-btn"
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
            title="Options"
          >
            <MoreVertical size={16} />
          </button>

          {menuOpen && (
            <div className="card-menu-dropdown" onClick={(e) => e.stopPropagation()}>
              <button
                className="card-menu-item"
                onClick={(e) => handleMenuAction('watch-later', e)}
              >
                <Clock size={16} />
                <span>{isWatchLater ? "Remove Watch Later" : "Save to Watch Later"}</span>
              </button>
              <button
                className="card-menu-item"
                onClick={(e) => handleMenuAction('share', e)}
              >
                <Share2 size={16} />
                <span>Share</span>
              </button>
              <button
                className="card-menu-item"
                onClick={(e) => handleMenuAction('not-interested', e)}
              >
                <EyeOff size={16} />
                <span>Not interested</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
