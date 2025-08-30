import React, { useState, useRef } from 'react';
import { toast } from 'sonner';
import { useAuth } from '../contexts/AuthContext';

interface AvatarProps {
  size?: 'sm' | 'md' | 'lg';
  editable?: boolean;
  showHoverEffect?: boolean;
}

export default function Avatar({ size = 'md', editable = false, showHoverEffect = true }: AvatarProps) {
  const { user, token, updateUser } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const API_BASE = import.meta.env.VITE_API_URL || 'https://airflow-ob6u.onrender.com/api';

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-lg',
    lg: 'w-16 h-16 text-xl'
  };

  const getInitials = (username: string) => {
    return username.charAt(0).toUpperCase();
  };

  const handleAvatarClick = () => {
    if (editable && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size (7MB)
    if (file.size > 7 * 1024 * 1024) {
      toast.error('File size must be less than 7MB');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setSelectedFile(file);
    setShowModal(true);
  };

  const handleUpload = async () => {
    if (!selectedFile || !token) return;

    try {
      setIsUploading(true);
      
      const formData = new FormData();
      formData.append('avatar', selectedFile);

      const response = await fetch(`${API_BASE}/user/avatar`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to upload avatar');
      }

      // Update user data in context
      updateUser({ avatarUrl: data.avatarUrl });
      
      toast.success('Avatar updated successfully');
      setShowModal(false);
      setPreviewUrl(null);
      setSelectedFile(null);
    } catch (error: any) {
      console.error('Avatar upload error:', error);
      toast.error(error.message || 'Failed to upload avatar');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (!user) return null;

  return (
    <>
      <div 
        className={`${sizeClasses[size]} relative rounded-full bg-zinc-800 flex items-center justify-center font-medium text-white border-2 border-zinc-700 overflow-hidden ${
          editable ? 'cursor-pointer group' : ''
        }`}
        onClick={handleAvatarClick}
      >
        {user.avatarUrl ? (
          <img 
            src={user.avatarUrl} 
            alt={`${user.username}'s avatar`}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{getInitials(user.username)}</span>
        )}
        
        {editable && showHoverEffect && (
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              <path 
                d="M12 20h9m-9-7l3-3 4 4m-6-6l2-2a2 2 0 1 1 3 3l-2 2m-7 7v3h3l9-9-3-3-9 9z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>

      {editable && (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileSelect}
        />
      )}

      {/* Preview Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-zinc-900 rounded-2xl p-6 max-w-md w-full mx-4 border border-zinc-800">
            <h3 className="text-lg font-semibold mb-4">Update Avatar</h3>
            
            {previewUrl && (
              <div className="mb-4 flex justify-center">
                <img 
                  src={previewUrl} 
                  alt="Avatar preview"
                  className="w-32 h-32 rounded-full object-cover border-2 border-zinc-700"
                />
              </div>
            )}
            
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="flex-1 px-4 py-2 rounded-xl border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors"
                disabled={isUploading}
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={isUploading}
                className="flex-1 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-colors disabled:opacity-50"
              >
                {isUploading ? 'Uploading...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
