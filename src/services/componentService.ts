// Frontend service for component API calls
interface ComponentFilters {
  category?: string;
  language?: string;
  tags?: string[];
  difficulty?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  pagination?: {
    current: number;
    pages: number;
    total: number;
    limit: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  meta?: any;
  message?: string;
}

interface Component {
  componentId: string;
  name: string;
  description: string;
  frameworks: Array<{
    language: string;
    code: string;
    dependencies: string[];
    notes?: string;
  }>;
  preview: {
    background: string;
    height: string;
    width: string;
    containerClass?: string;
  };
  category: string;
  subcategory?: string;
  tags: string[];
  difficulty: string;
  usage?: {
    downloadCount: number;
    bookmarkCount: number;
    viewCount: number;
  };
  createdAt: string;
  updatedAt: string;
}

class ComponentService {
  private baseURL = import.meta.env.VITE_API_URL || 'https://airflow-ob6u.onrender.com/api';
  private cache = new Map<string, { data: any; timestamp: number }>();
  private cacheTimeout = 5 * 60 * 1000; // 5 minutes

  private getCacheKey(endpoint: string, params: any): string {
    return `${endpoint}_${JSON.stringify(params)}`;
  }

  private isValidCache(timestamp: number): boolean {
    return Date.now() - timestamp < this.cacheTimeout;
  }

  async getComponents(filters: ComponentFilters = {}): Promise<ApiResponse<Component[]>> {
    const cacheKey = this.getCacheKey('components', filters);
    const cached = this.cache.get(cacheKey);
    
    if (cached && this.isValidCache(cached.timestamp)) {
      return cached.data;
    }

    try {
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            queryParams.append(key, value.join(','));
          } else {
            queryParams.append(key, value.toString());
          }
        }
      });

      const response = await fetch(`${this.baseURL}/components?${queryParams}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch components');
      }

      // Cache successful response
      this.cache.set(cacheKey, { data, timestamp: Date.now() });
      return data;
    } catch (error) {
      console.error('Error fetching components:', error);
      throw error;
    }
  }

  async getComponent(componentId: string, language?: string): Promise<ApiResponse<Component>> {
    const cacheKey = this.getCacheKey('component', { componentId, language });
    const cached = this.cache.get(cacheKey);
    
    if (cached && this.isValidCache(cached.timestamp)) {
      return cached.data;
    }

    try {
      const url = language 
        ? `${this.baseURL}/components/${componentId}?language=${language}`
        : `${this.baseURL}/components/${componentId}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Component not found');
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Component not found');
      }

      this.cache.set(cacheKey, { data, timestamp: Date.now() });
      return data;
    } catch (error) {
      console.error('Error fetching component:', error);
      throw error;
    }
  }

  async searchComponents(query: string, filters: Partial<ComponentFilters> = {}): Promise<ApiResponse<Component[]>> {
    if (!query.trim()) {
      throw new Error('Search query is required');
    }

    try {
      const queryParams = new URLSearchParams({ q: query });
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            queryParams.append(key, value.join(','));
          } else {
            queryParams.append(key, value.toString());
          }
        }
      });

      const response = await fetch(`${this.baseURL}/components/search?${queryParams}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Search failed');
      }

      return data;
    } catch (error) {
      console.error('Error searching components:', error);
      throw error;
    }
  }

  // Prefetch commonly used components
  async prefetchComponents(categories: string[]): Promise<void> {
    const prefetchPromises = categories.map(category => 
      this.getComponents({ category, limit: 10 }).catch(error => {
        console.warn(`Failed to prefetch ${category} components:`, error);
        return null;
      })
    );
    
    try {
      await Promise.all(prefetchPromises);
    } catch (error) {
      console.warn('Failed to prefetch some components:', error);
    }
  }

  clearCache(): void {
    this.cache.clear();
  }

  // Get cache statistics
  getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }
}

// Create and export singleton instance
export const componentService = new ComponentService();

// Export types for use in components
export type { Component, ComponentFilters, ApiResponse };