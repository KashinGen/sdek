import { formatDate } from '@/utils/formatDate';
describe('formatDate', () => {
  it('should format valid date strings according to ru-RU locale', () => {
    // ISO format
    const isoDate = '2023-05-15T14:30:00Z';
    const expectedFormat = '15 мая 2023 г., 17:30';

    const result = formatDate(isoDate);

    expect(result).toBe(expectedFormat);
  });

  it('should return Invalid Date when provided with invalid date string', () => {
    const invalidDate = 'not-a-date';

    const result = formatDate(invalidDate);

    expect(result).toBe('Invalid Date');
  });
});
