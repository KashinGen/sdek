import { debounce } from 'lodash';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useCallback } from 'react';
/**
 * Hook for changing search parameters when pagination and filtering change.
 * @param status - Status filter
 * @param page - Page number
 */
export const useFilterQuery = (status: string, page: number) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const updateQueryParams = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    if (status) {
      params.set('status', status);
    } else {
      params.delete('status');
    }
    if (page !== 1) {
      params.set('page', page.toString());
    } else {
      params.delete('page');
    }
    const query = params.toString() ? `?${params.toString()}` : '';
    router.push(`${pathname}${query}`, { scroll: false });
  }, [status, page, router, pathname, searchParams]);
  const debouncedUpdateQueryParams = useCallback(
    debounce(updateQueryParams, 300),
    [updateQueryParams],
  );

  useEffect(() => {
    debouncedUpdateQueryParams();
  }, [debouncedUpdateQueryParams]);
};
