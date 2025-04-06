import { Pagination as BootstrapPagination } from 'react-bootstrap';
import { useEffect, useState } from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const generatePages = () => {
      const visiblePages = [];
      const maxVisible = 5;
      let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
      let endPage = Math.min(totalPages, startPage + maxVisible - 1);

      if (endPage - startPage + 1 < maxVisible) {
        startPage = Math.max(1, endPage - maxVisible + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        visiblePages.push(i);
      }

      return visiblePages;
    };

    setPages(generatePages());
  }, [currentPage, totalPages]);

  if (totalPages <= 1) return null;

  return (
    <BootstrapPagination className="justify-content-center mt-4">
      <BootstrapPagination.First 
        onClick={() => onPageChange(1)} 
        disabled={currentPage === 1} 
      />
      <BootstrapPagination.Prev 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1} 
      />

      {pages[0] > 1 && (
        <>
          <BootstrapPagination.Item 
            active={1 === currentPage} 
            onClick={() => onPageChange(1)}
          >
            1
          </BootstrapPagination.Item>
          {pages[0] > 2 && <BootstrapPagination.Ellipsis disabled />}
        </>
      )}

      {pages.map((page) => (
        <BootstrapPagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </BootstrapPagination.Item>
      ))}

      {pages[pages.length - 1] < totalPages && (
        <>
          {pages[pages.length - 1] < totalPages - 1 && (
            <BootstrapPagination.Ellipsis disabled />
          )}
          <BootstrapPagination.Item
            active={totalPages === currentPage}
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </BootstrapPagination.Item>
        </>
      )}

      <BootstrapPagination.Next
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
      <BootstrapPagination.Last
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      />
    </BootstrapPagination>
  );
};

export default Pagination;