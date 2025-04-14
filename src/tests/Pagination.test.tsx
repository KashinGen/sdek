import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '@/components/Pagination';

describe('Pagination', () => {
  const onPageChangeMock = jest.fn();

  beforeEach(() => {
    onPageChangeMock.mockClear();
  });

  it('renders pagination component correctly', () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />,
    );

    expect(screen.getByText('Previous')).toBeInTheDocument();

    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('disables Previous button on first page', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />,
    );

    const prevButton = screen.getByText('Previous');
    expect(prevButton).toBeDisabled();
    expect(prevButton).toHaveClass(
      'bg-gray-100 text-gray-400 cursor-not-allowed',
    );
  });

  it('disables Next button on last page', () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />,
    );

    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
    expect(nextButton).toHaveClass(
      'bg-gray-100 text-gray-400 cursor-not-allowed',
    );
  });

  it('calls onPageChange with correct value when Previous is clicked', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />,
    );

    fireEvent.click(screen.getByText('Previous'));
    expect(onPageChangeMock).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange with correct value when Next is clicked', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />,
    );

    fireEvent.click(screen.getByText('Next'));
    expect(onPageChangeMock).toHaveBeenCalledWith(4);
  });

  it('does not render when totalPages is less than 1', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={1}
        onPageChange={onPageChangeMock}
      />,
    );
    expect(screen.queryByText('Showing page')).toBeNull();
  });

  it('does not render when currentPage is less than 1', () => {
    render(
      <Pagination
        currentPage={0}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />,
    );
    expect(screen.queryByText('Showing page')).toBeNull();
  });

  it('does not render when currentPage is greater than totalPages', () => {
    const { container } = render(
      <Pagination
        currentPage={6}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />,
    );
    expect(container.firstChild).toBeNull();
  });

  it('does not call onPageChange when Previous button is disabled', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />,
    );

    fireEvent.click(screen.getByText('Previous'));
    expect(onPageChangeMock).not.toHaveBeenCalled();
  });

  it('does not call onPageChange when Next button is disabled', () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />,
    );

    fireEvent.click(screen.getByText('Next'));
    expect(onPageChangeMock).not.toHaveBeenCalled();
  });
});
