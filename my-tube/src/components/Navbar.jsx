import React, { useState } from 'react';
import {
  Menu,
  Search,
  Mic,
  Video,
  Bell,
  Sun,
  Moon,
  X,
  CheckCircle,
  Play
} from 'lucide-react';

export default function Navbar({
  searchQuery,
  setSearchQuery,
  handleSearch,
  isDarkMode,
  toggleDarkMode,
  onLogoClick,
  sidebarOpen,
  setSidebarOpen,
  onOpenUploadModal,
  showToast
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const onSearchSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  const handleVoiceSearch = () => {
    setIsListening(true);
    showToast("Listening... (Speak now)");
    setTimeout(() => {
      setIsListening(false);
      setSearchQuery("Autonomous AI Agent");
      handleSearch("Autonomous AI Agent");
      showToast("Voice matched: 'Autonomous AI Agent'");
    }, 1800);
  };

  return (
    <header className="navbar">
      {/* Left: Hamburger & Logo */}
      <div className="nav-left">
        <button
          className="icon-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          title="Guide menu"
          aria-label="Toggle navigation menu"
        >
          <Menu size={20} />
        </button>

        <div className="brand-logo" onClick={onLogoClick} title="MY TUBE Home">
          <div className="brand-icon-box">
            <div className="brand-play-triangle" />
          </div>
          <span className="brand-text">
            MY<span className="brand-text-accent">TUBE</span>
          </span>
          <span className="country-code">PRO</span>
        </div>
      </div>

      {/* Center: Search Bar & Voice Input */}
      <div className="nav-center">
        <form className="search-form" onSubmit={onSearchSubmit}>
          <div className="search-input-wrapper">
            <input
              type="text"
              className="search-input"
              placeholder="Search MY TUBE"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => {
                  setSearchQuery('');
                  handleSearch('');
                }}
                title="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <button type="submit" className="search-submit-btn" title="Search">
            <Search size={18} />
          </button>
        </form>

        <button
          className="icon-btn mic-btn"
          onClick={handleVoiceSearch}
          title="Search with your voice"
          style={{ color: isListening ? '#ff0000' : 'inherit' }}
        >
          <Mic size={18} />
        </button>
      </div>

      {/* Right: Actions, Theme Toggle, Profile */}
      <div className="nav-right">
        <button
          className="create-btn"
          onClick={onOpenUploadModal}
          title="Create or upload video"
        >
          <Video size={18} />
          <span>Create</span>
        </button>

        <button
          className="icon-btn theme-toggle-btn"
          onClick={toggleDarkMode}
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? <Sun size={19} /> : <Moon size={19} />}
        </button>

        <div className="notification-wrapper">
          <button
            className="icon-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            title="Notifications"
          >
            <Bell size={20} />
            <span className="notif-badge">3</span>
          </button>

          {showNotifications && (
            <div className="notif-dropdown">
              <div className="notif-header">
                <span>Notifications</span>
                <CheckCircle size={15} color="#2ba640" />
              </div>
              <div
                className="notif-item"
                onClick={() => {
                  setShowNotifications(false);
                  showToast("Opening update from TechPulse Labs");
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
                  alt="avatar"
                  className="notif-thumb"
                />
                <div className="notif-info">
                  <p><strong>TechPulse Labs</strong> uploaded a new video on AI reasoning loops.</p>
                  <span className="notif-time">2 hours ago</span>
                </div>
              </div>
              <div
                className="notif-item"
                onClick={() => {
                  setShowNotifications(false);
                  showToast("Opening update from RetroWave Radio");
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100&h=100&fit=crop"
                  alt="avatar"
                  className="notif-thumb"
                />
                <div className="notif-info">
                  <p><strong>RetroWave Radio</strong> is live right now: Synthwave Sunset 24/7.</p>
                  <span className="notif-time">4 hours ago</span>
                </div>
              </div>
              <div
                className="notif-item"
                onClick={() => {
                  setShowNotifications(false);
                  showToast("Welcome to MY TUBE!");
                }}
              >
                <div className="brand-icon-box" style={{ width: 44, height: 32, flexShrink: 0 }}>
                  <div className="brand-play-triangle" />
                </div>
                <div className="notif-info">
                  <p>Welcome to <strong>MY TUBE</strong>! Enjoy watching and discovering top creators.</p>
                  <span className="notif-time">1 day ago</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <button
          className="user-avatar-btn"
          title="MY TUBE Account: Alex"
          onClick={() => showToast("Logged in as Alex (Creator Profile)")}
        >
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"
            alt="User avatar"
          />
        </button>
      </div>
    </header>
  );
}
