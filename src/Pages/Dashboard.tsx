import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Avatar from '../components/Avatar';
import BookmarkIcon from '../components/BookmarkIcon';

interface Bookmark {
  _id: string;
  componentId: string;
  componentName: string;
  componentDetails: {
    category: string;
    frameworks: string[];
  };
  createdAt: string;
}

export default function Dashboard() {
  const { user, logout, token } = useAuth();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && token) {
      fetchBookmarks();
    }
  }, [user, token]);

  const fetchBookmarks = async () => {
    try {
      const response = await fetch('/api/bookmarks', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setBookmarks(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookmarkRemoved = (componentId: string) => {
    setBookmarks(prev => prev.filter(bookmark => bookmark.componentId !== componentId));
  };

  if (!user) {
    return (
      <div className="container-af py-16">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="text-zinc-400 mt-2">Please sign in to access your dashboard.</p>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <div className="container-af py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors"
          >
            Sign Out
          </button>
        </div>

        {/* User Profile Card */}
        <div className="bg-card p-6 mb-8">
          <h2 className="text-xl font-semibold mb-3 px-4">Profile</h2>
          <hr className='border-zinc-700'/>
          
          <div className="flex items-start gap-6 mt-4 px-4">
            {/* Avatar */}
            <div className="flex flex-col items-center gap-3">
              <Avatar size="lg" editable={true} />
            </div>

            {/* User Info */}
            <div className='flex justify-between w-full'>
              <div className="flex flex-col flex-grow">
                <div className="pt-2 capitalize rounded-lg ">
                  {user.username}
                </div>
                <div className="font-light text-zinc-400">
                  {user.email}
                </div>
              </div>

              <div>
                <div className="text-[#2B7FFF]">
                  {new Date().toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bookmarks Section */}
        <div className="bg-card pl-6 pt-6 pb-4 pr-4 flex flex-col w-full">
          <h2 className="text-xl font-semibold mb-2">Bookmarked Components</h2>
          
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : bookmarks.length === 0 ? (
            <>
              <p className="text-zinc-400">You haven't bookmarked any components yet. Start exploring our component library!</p>
              <div className="mt-6 self-end">
                <a
                  href="/components"
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                >
                  Browse Components
                </a>
              </div>
            </>
          ) : (
            <>
              <p className="text-zinc-400 mb-4">You have {bookmarks.length} bookmarked component{bookmarks.length !== 1 ? 's' : ''}.</p>
              
              {/* Bookmarked Components Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {bookmarks.map((bookmark) => (
                  <div
                    key={bookmark._id}
                    className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 relative group hover:bg-zinc-800 transition-colors"
                  >
                    {/* Bookmark Icon */}
                    <div className="absolute top-3 right-3">
                      <BookmarkIcon 
                        componentId={bookmark.componentId}
                        componentName={bookmark.componentName}
                        onBookmarkChange={(isBookmarked) => {
                          if (!isBookmarked) {
                            handleBookmarkRemoved(bookmark.componentId);
                          }
                        }}
                      />
                    </div>
                    
                    {/* Component Info */}
                    <div className="pr-12">
                      <h3 className="font-medium text-white mb-2">{bookmark.componentName}</h3>
                      <p className="text-sm text-zinc-400 mb-3">Category: {bookmark.componentDetails.category}</p>
                      
                      {/* Frameworks */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {bookmark.componentDetails.frameworks.map((framework) => (
                          <span
                            key={framework}
                            className="px-2 py-1 text-xs bg-zinc-700 text-zinc-300 rounded"
                          >
                            {framework}
                          </span>
                        ))}
                      </div>
                      
                      {/* Date bookmarked */}
                      <p className="text-xs text-zinc-500">
                        Bookmarked {new Date(bookmark.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    
                    {/* View Button */}
                    <div className="mt-4">
                      <a
                        href={`/components/button`} // This could be dynamic based on category
                        className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        View Component →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="self-end">
                <a
                  href="/components"
                  className="inline-flex items-center px-4 py-2 rounded-lg border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors"
                >
                  Browse More Components
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}


