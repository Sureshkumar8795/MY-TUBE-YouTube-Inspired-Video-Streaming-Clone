import React from 'react';
import {
  Home,
  Compass,
  Tv,
  History,
  ListVideo,
  Clapperboard,
  Clock,
  ThumbsUp,
  Flame,
  Music2,
  Gamepad2,
  Settings,
  HelpCircle
} from 'lucide-react';

export default function Sidebar({
  activeTab,
  setActiveTab,
  collapsed,
  onSelectTab
}) {
  const mainNavItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'shorts', label: 'Shorts', icon: Flame },
    { id: 'subscriptions', label: 'Subscriptions', icon: Tv },
  ];

  const libraryNavItems = [
    { id: 'history', label: 'History', icon: History },
    { id: 'playlists', label: 'Playlists', icon: ListVideo },
    { id: 'your-videos', label: 'Your videos', icon: Clapperboard },
    { id: 'watch-later', label: 'Watch later', icon: Clock },
    { id: 'liked', label: 'Liked videos', icon: ThumbsUp },
  ];

  const exploreNavItems = [
    { id: 'trending', label: 'Trending', icon: Compass },
    { id: 'music', label: 'Music', icon: Music2 },
    { id: 'gaming', label: 'Gaming', icon: Gamepad2 },
  ];

  const handleItemClick = (id) => {
    setActiveTab(id);
    if (onSelectTab) {
      onSelectTab(id);
    }
  };

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Primary Navigation */}
      <div className="sidebar-section">
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => handleItemClick(item.id)}
              title={item.label}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Library Section */}
      <div className="sidebar-section">
        {!collapsed && <div className="sidebar-section-title">You</div>}
        {libraryNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => handleItemClick(item.id)}
              title={item.label}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Explore Section */}
      {!collapsed && (
        <div className="sidebar-section">
          <div className="sidebar-section-title">Explore</div>
          {exploreNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => handleItemClick(item.id)}
                title={item.label}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Footer */}
      {!collapsed && (
        <div className="sidebar-footer">
          <p>© 2026 MY TUBE LLC</p>
          <p>Created for high performance video streaming.</p>
        </div>
      )}
    </aside>
  );
}
