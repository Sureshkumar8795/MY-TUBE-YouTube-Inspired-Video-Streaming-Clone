import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import CategoryChips from './components/CategoryChips';
import VideoCard from './components/VideoCard';
import WatchPage from './components/WatchPage';
import EmptyState from './components/EmptyState';
import UploadModal from './components/UploadModal';
import { CATEGORIES, INITIAL_VIDEOS } from './data/mockData';
import { Home, Flame, Tv, User, Compass } from 'lucide-react';

export default function App() {
  const [videos, setVideos] = useState(INITIAL_VIDEOS);
  const [activeVideo, setActiveVideo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  // Stored state for interactions
  const [watchLaterIds, setWatchLaterIds] = useState(new Set());
  const [historyIds, setHistoryIds] = useState([]);

  // Sync theme to body class
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  // Toast notification helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? '' : current));
    }, 3200);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    showToast(isDarkMode ? 'Switched to Light Mode' : 'Switched to Dark Mode');
  };

  const handleLogoClick = () => {
    setActiveVideo(null);
    setActiveTab('home');
    setSelectedCategory('All');
    setSearchQuery('');
    setActiveSearch('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (query) => {
    setActiveSearch(query.trim());
    setActiveVideo(null);
    if (query.trim()) {
      setActiveTab('home');
    }
  };

  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    setActiveVideo(null);
    if (cat !== 'All') {
      setActiveTab('home');
    }
  };

  const handleVideoClick = (video) => {
    setActiveVideo(video);
    setHistoryIds((prev) => [video.id, ...prev.filter((id) => id !== video.id)]);
  };

  const handleToggleWatchLater = (video) => {
    setWatchLaterIds((prev) => {
      const next = new Set(prev);
      if (next.has(video.id)) {
        next.delete(video.id);
      } else {
        next.add(video.id);
      }
      return next;
    });
  };

  const handleUploadVideo = (newVideo) => {
    setVideos([newVideo, ...videos]);
    setActiveTab('home');
    setActiveVideo(null);
  };

  // Filter videos based on activeTab, category, and search query
  const displayedVideos = useMemo(() => {
    let result = [...videos];

    // Sidebar Tab filtering
    if (activeTab === 'subscriptions') {
      result = result.filter((v) => v.isSubscribed);
    } else if (activeTab === 'watch-later') {
      result = result.filter((v) => watchLaterIds.has(v.id));
    } else if (activeTab === 'liked') {
      result = result.filter((v) => v.isLiked);
    } else if (activeTab === 'history') {
      result = historyIds.map((id) => videos.find((v) => v.id === id)).filter(Boolean);
    } else if (activeTab === 'shorts') {
      result = result.filter((v) => v.duration.startsWith('1') || v.duration.startsWith('0'));
    } else if (activeTab === 'trending') {
      result = [...result].sort((a, b) => b.viewsCount - a.viewsCount);
    } else if (activeTab === 'music') {
      result = result.filter((v) => v.category === 'Music');
    } else if (activeTab === 'gaming') {
      result = result.filter((v) => v.category === 'Gaming');
    }

    // Category filter
    if (selectedCategory !== 'All' && activeTab === 'home') {
      if (selectedCategory === 'Recently uploaded') {
        result = [...result].sort((a, b) => a.id.localeCompare(b.id));
      } else {
        result = result.filter((v) => v.category.toLowerCase() === selectedCategory.toLowerCase());
      }
    }

    // Search query filter
    if (activeSearch) {
      const q = activeSearch.toLowerCase();
      result = result.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          v.channel.toLowerCase().includes(q) ||
          v.category.toLowerCase().includes(q)
      );
    }

    return result;
  }, [videos, activeTab, selectedCategory, activeSearch, watchLaterIds, historyIds]);

  const getHeadingTitle = () => {
    if (activeSearch) return `Search results for "${activeSearch}"`;
    switch (activeTab) {
      case 'subscriptions':
        return 'Subscriptions Feed';
      case 'watch-later':
        return 'Watch Later Playlist';
      case 'liked':
        return 'Liked Videos';
      case 'history':
        return 'Watch History';
      case 'shorts':
        return 'Shorts & Quick Clips';
      case 'trending':
        return 'Trending on MY TUBE';
      case 'music':
        return 'Music Feed';
      case 'gaming':
        return 'Gaming Central';
      default:
        return selectedCategory === 'All' ? 'Recommended' : `${selectedCategory} Videos`;
    }
  };

  return (
    <div className="app-container">
      {/* Top Navigation */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        onLogoClick={handleLogoClick}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onOpenUploadModal={() => setIsUploadModalOpen(true)}
        showToast={showToast}
      />

      <div className="main-wrapper">
        {/* Sidebar - only show on desktop if open, hidden during watch page for theater experience */}
        {!activeVideo && (
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            collapsed={!sidebarOpen}
            onSelectTab={() => {
              setActiveVideo(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Content Area */}
        <main className="content-area">
          {activeVideo ? (
            /* Watch Page View */
            <WatchPage
              video={activeVideo}
              allVideos={videos}
              onBackToHome={() => setActiveVideo(null)}
              onSelectVideo={handleVideoClick}
              showToast={showToast}
            />
          ) : (
            /* Main Feed View */
            <>
              {/* Category Filter Chips */}
              <CategoryChips
                categories={CATEGORIES}
                selectedCategory={selectedCategory}
                onSelectCategory={handleSelectCategory}
              />

              <div className="feed-container">
                <div className="section-heading-bar">
                  <h2 className="section-heading-title">{getHeadingTitle()}</h2>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                    {displayedVideos.length} {displayedVideos.length === 1 ? 'video' : 'videos'}
                  </span>
                </div>

                {displayedVideos.length === 0 ? (
                  <EmptyState
                    searchQuery={activeSearch || selectedCategory}
                    onReset={() => {
                      setActiveSearch('');
                      setSearchQuery('');
                      setSelectedCategory('All');
                      setActiveTab('home');
                    }}
                  />
                ) : (
                  <div className="video-grid">
                    {displayedVideos.map((video) => (
                      <VideoCard
                        key={video.id}
                        video={video}
                        onVideoClick={handleVideoClick}
                        onToggleWatchLater={handleToggleWatchLater}
                        isWatchLater={watchLaterIds.has(video.id)}
                        showToast={showToast}
                      />
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="mobile-bottom-nav">
        <button
          className={`mobile-bottom-nav-item ${activeTab === 'home' && !activeVideo ? 'active' : ''}`}
          onClick={handleLogoClick}
        >
          <Home size={20} />
          <span>Home</span>
        </button>
        <button
          className={`mobile-bottom-nav-item ${activeTab === 'shorts' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('shorts');
            setActiveVideo(null);
          }}
        >
          <Flame size={20} />
          <span>Shorts</span>
        </button>
        <button
          className={`mobile-bottom-nav-item ${activeTab === 'subscriptions' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('subscriptions');
            setActiveVideo(null);
          }}
        >
          <Tv size={20} />
          <span>Subscriptions</span>
        </button>
        <button
          className={`mobile-bottom-nav-item ${activeTab === 'liked' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('liked');
            setActiveVideo(null);
          }}
        >
          <User size={20} />
          <span>You</span>
        </button>
      </nav>

      {/* Upload Modal */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUploadVideo}
        showToast={showToast}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-banner">
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
