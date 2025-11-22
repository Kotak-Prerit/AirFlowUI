import { useState, useEffect, useCallback } from 'react';
import { componentService } from '../services/componentService';
import type { ComponentFilters, Component } from '../services/componentService';

interface UseComponentsOptions extends ComponentFilters {
  autoFetch?: boolean;
}

interface UseComponentsReturn {
  components: Component[];
  loading: boolean;
  error: string | null;
  pagination: any;
  fetchComponents: (overrides?: Partial<ComponentFilters>) => Promise<void>;
  refetch: () => Promise<void>;
  clearError: () => void;
}

export const useComponents = (options: UseComponentsOptions = {}): UseComponentsReturn => {
  const [components, setComponents] = useState<Component[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<any>(null);

  const fetchComponents = useCallback(async (overrides: Partial<ComponentFilters> = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const filters = { 
        ...options, 
        ...overrides,
        autoFetch: undefined // Remove autoFetch from API call
      };
      const response = await componentService.getComponents(filters);
      setComponents(response.data);
      setPagination(response.pagination || null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch components';
      setError(errorMessage);
      setComponents([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  }, [options]);

  const refetch = useCallback(() => {
    return fetchComponents();
  }, [fetchComponents]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    if (options.autoFetch !== false) {
      fetchComponents();
    }
  }, [fetchComponents, options.autoFetch]);

  return {
    components,
    loading,
    error,
    pagination,
    fetchComponents,
    refetch,
    clearError
  };
};

interface UseComponentOptions {
  language?: string;
  autoFetch?: boolean;
}

interface UseComponentReturn {
  component: Component | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  clearError: () => void;
}

export const useComponent = (
  componentId: string, 
  options: UseComponentOptions = {}
): UseComponentReturn => {
  const [component, setComponent] = useState<Component | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchComponent = useCallback(async () => {
    if (!componentId) {
      setComponent(null);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await componentService.getComponent(componentId, options.language);
      setComponent(response.data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch component';
      setError(errorMessage);
      setComponent(null);
    } finally {
      setLoading(false);
    }
  }, [componentId, options.language]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    if (options.autoFetch !== false) {
      fetchComponent();
    }
  }, [fetchComponent, options.autoFetch]);

  return {
    component,
    loading,
    error,
    refetch: fetchComponent,
    clearError
  };
};

interface UseSearchOptions {
  category?: string;
  language?: string;
  limit?: number;
}

interface UseSearchReturn {
  results: Component[];
  loading: boolean;
  error: string | null;
  search: (query: string) => Promise<void>;
  clearResults: () => void;
  clearError: () => void;
}

export const useSearch = (options: UseSearchOptions = {}): UseSearchReturn => {
  const [results, setResults] = useState<Component[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await componentService.searchComponents(query, options);
      setResults(response.data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Search failed';
      setError(errorMessage);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [options]);

  const clearResults = useCallback(() => {
    setResults([]);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    results,
    loading,
    error,
    search,
    clearResults,
    clearError
  };
};

// Hook for managing component pagination
interface UsePaginationOptions {
  initialPage?: number;
  pageSize?: number;
}

interface UsePaginationReturn {
  currentPage: number;
  pageSize: number;
  setPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
  reset: () => void;
}

export const usePagination = (
  totalPages: number = 1,
  options: UsePaginationOptions = {}
): UsePaginationReturn => {
  const { initialPage = 1, pageSize = 8 } = options;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const setPage = useCallback((page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
  }, [totalPages]);

  const nextPage = useCallback(() => {
    setPage(currentPage + 1);
  }, [currentPage, setPage]);

  const prevPage = useCallback(() => {
    setPage(currentPage - 1);
  }, [currentPage, setPage]);

  const reset = useCallback(() => {
    setCurrentPage(initialPage);
  }, [initialPage]);

  const canGoNext = currentPage < totalPages;
  const canGoPrev = currentPage > 1;

  return {
    currentPage,
    pageSize,
    setPage,
    nextPage,
    prevPage,
    canGoNext,
    canGoPrev,
    reset
  };
};