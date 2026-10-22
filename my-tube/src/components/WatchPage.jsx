import React, { useState, useRef, useEffect } from 'react';
import {
  ThumbsUp,
  ThumbsDown,
  Share2,
  Bookmark,
  ArrowLeft,
  Check,
  Bell,
  MessageSquare,
  Sparkles
} from 'lucide-react';

export default function WatchPage({
  video,
  allVideos,
  onBackToHome,
  onSelectVideo,
  showToast
}) {
  const [isLiked, setIsLiked] = useState(video.isLiked || false);
  const [likesCount, setLikesCount] = useState(video.likesCount || 12000);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(video.isSubscribed || false);
  const [subscribers, setSubscribers] = useState(video.subscribers || "1.2M");
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [comments, setComments] = useState(video.comments || []);
  const [newCommentText, setNewCommentText] = useState("");
  const videoRef = useRef(null);

  // Scroll to top whenever video changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsLiked(video.isLiked || false);
    setLikesCount(video.likesCount || 12000);
    setIsDisliked(false);
    setIsSubscribed(video.isSubscribed || false);
    setComments(video.comments || []);
  }, [video]);

  const handleLikeToggle = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikesCount(prev => prev - 1);
      showToast("Removed like");
    } else {
      setIsLiked(true);
      setLikesCount(prev => prev + 1);
      if (isDisliked) setIsDisliked(false);
      showToast("Added to Liked videos");
    }
  };

  const handleDislikeToggle = () => {
    if (isDisliked) {
      setIsDisliked(false);
    } else {
      setIsDisliked(true);
      if (isLiked) {
        setIsLiked(false);
        setLikesCount(prev => prev - 1);
      }
      showToast("Feedback noted");
    }
  };

  const handleSubscribeToggle = () => {
    if (isSubscribed) {
      setIsSubscribed(false);
      showToast(`Unsubscribed from ${video.channel}`);
    } else {
      setIsSubscribed(true);
      showToast(`Subscribed to ${video.channel}!`);
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
    }
    showToast("Video link copied to clipboard!");
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment = {
      id: "c-" + Date.now(),
      author: "Alex (You)",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop",
      time: "Just now",
      text: newCommentText.trim(),
      likes: 0
    };

    setComments([newComment, ...comments]);
    setNewCommentText("");
    showToast("Comment posted!");
  };

  const recommendedVideos = allVideos.filter(v => v.id !== video.id);

  return (
    <div className="watch-page-container">
      {/* Primary Column: Player, Meta, Comments */}
      <div className="watch-primary-column">
        {/* Return Button */}
        <button className="return-home-btn" onClick={onBackToHome}>
          <ArrowLeft size={18} />
          <span>Back to Feed</span>
        </button>

        {/* Video Player Box */}
        <div className="player-wrapper">
          <video
            ref={videoRef}
            src={video.videoUrl}
            poster={video.thumbnail}
            controls
            autoPlay
            playsInline
            className="video-player-element"
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Title */}
        <h1 className="watch-video-title">{video.title}</h1>

        {/* Action Row */}
        <div className="watch-actions-bar">
          {/* Channel Info & Subscribe */}
          <div className="channel-info-row">
            <img
              src={video.channelAvatar}
              alt={video.channel}
              className="watch-channel-avatar"
            />
            <div className="watch-channel-meta">
              <h3>{video.channel}</h3>
              <p>{subscribers} subscribers</p>
            </div>
            <button
              className={`subscribe-btn ${isSubscribed ? 'subscribed' : 'subscribe'}`}
              onClick={handleSubscribeToggle}
            >
              {isSubscribed ? (
                <>
                  <Bell size={16} />
                  <span>Subscribed</span>
                </>
              ) : (
                <span>Subscribe</span>
              )}
            </button>
          </div>

          {/* Actions: Like, Dislike, Share */}
          <div className="action-buttons-group">
            <div className="like-dislike-pill">
              <button
                className={`like-btn ${isLiked ? 'active' : ''}`}
                onClick={handleLikeToggle}
                title="Like this video"
              >
                <ThumbsUp size={18} fill={isLiked ? "currentColor" : "none"} />
                <span>{likesCount.toLocaleString()}</span>
              </button>
              <div className="pill-divider" />
              <button
                className={`dislike-btn ${isDisliked ? 'active' : ''}`}
                onClick={handleDislikeToggle}
                title="Dislike"
              >
                <ThumbsDown size={18} fill={isDisliked ? "currentColor" : "none"} />
              </button>
            </div>

            <button className="action-pill-btn" onClick={handleShare} title="Share video">
              <Share2 size={18} />
              <span>Share</span>
            </button>

            <button
              className="action-pill-btn"
              onClick={() => showToast("Saved to offline playlist")}
              title="Save"
            >
              <Bookmark size={18} />
              <span>Save</span>
            </button>
          </div>
        </div>

        {/* Description Box */}
        <div
          className="description-box"
          onClick={() => setIsDescExpanded(!isDescExpanded)}
        >
          <div className="description-header">
            <span>{video.views} views</span>
            <span>•</span>
            <span>{video.timestamp}</span>
            <span>•</span>
            <span style={{ color: '#ff0000', fontWeight: 600 }}>#{video.category}</span>
          </div>

          <p className="description-text">
            {isDescExpanded
              ? video.description
              : video.description.slice(0, 160) + (video.description.length > 160 ? "..." : "")}
          </p>
          <div className="show-more-toggle">
            {isDescExpanded ? "Show less" : "...more"}
          </div>
        </div>

        {/* Comments Section */}
        <div className="comments-section">
          <div className="comments-header">
            <span className="comments-count">{comments.length} Comments</span>
            <button className="sort-btn">
              <Sparkles size={16} />
              <span>Top comments</span>
            </button>
          </div>

          {/* Add Comment Input */}
          <form className="add-comment-form" onSubmit={handleAddComment}>
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop"
              alt="My avatar"
              className="comment-user-avatar"
            />
            <div className="comment-input-box">
              <input
                type="text"
                className="comment-input"
                placeholder="Add a comment to MY TUBE..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
              />
              {newCommentText.trim() && (
                <div className="comment-actions-row">
                  <button
                    type="button"
                    className="cancel-comment-btn"
                    onClick={() => setNewCommentText("")}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="post-comment-btn">
                    Comment
                  </button>
                </div>
              )}
            </div>
          </form>

          {/* Comments List */}
          <div className="comments-list">
            {comments.map((c) => (
              <div key={c.id} className="comment-item">
                <img src={c.avatar} alt={c.author} className="comment-user-avatar" />
                <div className="comment-content">
                  <div className="comment-author-row">
                    <span className="comment-author">{c.author}</span>
                    <span className="comment-time">{c.time}</span>
                  </div>
                  <p className="comment-body">{c.text}</p>
                  <div className="comment-actions">
                    <button
                      className="comment-like-btn"
                      onClick={() => showToast("Liked comment")}
                    >
                      <ThumbsUp size={14} />
                      <span>{c.likes > 0 ? c.likes : ""}</span>
                    </button>
                    <button
                      className="comment-reply-btn"
                      onClick={() => showToast("Reply feature activated")}
                    >
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Secondary Column: Recommended Videos */}
      <div className="watch-secondary-column">
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Recommended for you</h3>
        <div className="recommended-list">
          {recommendedVideos.map((rec) => (
            <div
              key={rec.id}
              className="recommended-card"
              onClick={() => onSelectVideo(rec)}
            >
              <div className="rec-thumbnail-container">
                <img
                  src={rec.thumbnail}
                  alt={rec.title}
                  className="rec-thumbnail-img"
                  loading="lazy"
                />
                <span className="video-duration-badge" style={{ fontSize: 10, padding: '1px 4px' }}>
                  {rec.duration}
                </span>
              </div>
              <div className="rec-info">
                <h4 className="rec-title">{rec.title}</h4>
                <p className="rec-channel">{rec.channel}</p>
                <p className="rec-stats">
                  {rec.views} • {rec.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
