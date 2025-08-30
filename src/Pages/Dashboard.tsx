import { useAuth } from '../contexts/AuthContext';
import Avatar from '../components/Avatar';

export default function Dashboard() {
  const { user, logout } = useAuth();

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
          <h2 className="text-xl font-semibold mb-6">Profile</h2>
          
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div className="flex flex-col items-center gap-3">
              <Avatar size="lg" editable={true} />
            </div>

            {/* User Info */}
            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Username</label>
                <div className="px-3 py-2 bg-zinc-800 rounded-lg border border-zinc-700">
                  {user.username}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Email</label>
                <div className="px-3 py-2 bg-zinc-800 rounded-lg border border-zinc-700">
                  {user.email}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Member Since</label>
                <div className="px-3 py-2 bg-zinc-800 rounded-lg border border-zinc-700">
                  {new Date().toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bookmarks Section */}
        <div className="bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Bookmarked Components</h2>
          <p className="text-zinc-400">You haven't bookmarked any components yet. Start exploring our component library!</p>
          
          <div className="mt-6">
            <a 
              href="/components" 
              className="inline-flex items-center px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-colors"
            >
              Browse Components
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}


