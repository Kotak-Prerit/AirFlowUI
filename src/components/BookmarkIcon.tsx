import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { BsBookmarkStar,BsBookmarkStarFill } from "react-icons/bs";

interface BookmarkIconProps {
  componentId: string;
  componentName: string;
  className?: string;
  onBookmarkChange?: (isBookmarked: boolean) => void;
}

const BookmarkIcon: React.FC<BookmarkIconProps> = ({ 
  componentId, 
  componentName, 
  className = "",
  onBookmarkChange 
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, token } = useAuth();

  // Check if component is bookmarked on mount
  useEffect(() => {
    if (user && token) {
      checkBookmarkStatus();
    }
  }, [componentId, user, token]);

  const checkBookmarkStatus = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/bookmarks/check/${componentId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setIsBookmarked(data.isBookmarked);
      }
    } catch (error) {
      console.error('Error checking bookmark status:', error);
    }
  };

  const handleBookmarkClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    // Redirect to login if not authenticated
    if (!user || !token) {
      window.location.href = '/signin';
      return;
    }

    setLoading(true);

    try {
      if (isBookmarked) {
        // Remove bookmark
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/bookmarks/${componentId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          setIsBookmarked(false);
          onBookmarkChange?.(false);
        }
      } else {
        // Add bookmark
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/bookmarks`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            componentId,
            componentName,
            componentDetails: {
              category: 'button' // This could be dynamic based on component type
            }
          })
        });

        if (response.ok) {
          setIsBookmarked(true);
          onBookmarkChange?.(true);
        }
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleBookmarkClick}
      disabled={loading}
      className={`p-2 rounded-lg transition-colors duration-200 ${
        loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-zinc-700'
      } ${className}`}
      title={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
    >
      {isBookmarked ? (
        // Filled bookmark icon
        <BsBookmarkStarFill />
      ) : (
        // Outline bookmark icon
        <BsBookmarkStar />
      )}
    </button>
  );
};

export default BookmarkIcon;