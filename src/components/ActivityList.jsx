import { useState, useEffect, useMemo } from 'react';
import { ActivityItem } from "./ActivityItem";

export const ActivityList = ({ activities, onSelect, onBook, people, date }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Calculamos los datos de paginación con useMemo para mejor rendimiento
  const paginationData = useMemo(() => {
    if (!activities) return null;
    
    const totalItems = activities.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = activities.slice(indexOfFirstItem, indexOfLastItem);
    
    return {
      totalItems,
      totalPages,
      currentItems,
      currentPage,
      hasPrev: currentPage > 1,
      hasNext: currentPage < totalPages,
      range: `${indexOfFirstItem + 1}-${Math.min(indexOfLastItem, totalItems)}`
    };
  }, [activities, currentPage, itemsPerPage]);

  // Resetear a página 1 cuando cambian las actividades
  useEffect(() => {
    setCurrentPage(1);
  }, [activities]);

  if (!activities || activities.length === 0) {
    return (
      <div className="alert alert-info text-center mt-4">
        No se han encontrado actividades.
      </div>
    );
  }

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > paginationData.totalPages) return;
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisible = 5; // Máximo de páginas visibles
    let startPage, endPage;

    if (paginationData.totalPages <= maxVisible) {
      startPage = 1;
      endPage = paginationData.totalPages;
    } else {
      const maxVisibleBeforeCurrent = Math.floor(maxVisible / 2);
      const maxVisibleAfterCurrent = Math.ceil(maxVisible / 2) - 1;
      
      if (currentPage <= maxVisibleBeforeCurrent) {
        startPage = 1;
        endPage = maxVisible;
      } else if (currentPage + maxVisibleAfterCurrent >= paginationData.totalPages) {
        startPage = paginationData.totalPages - maxVisible + 1;
        endPage = paginationData.totalPages;
      } else {
        startPage = currentPage - maxVisibleBeforeCurrent;
        endPage = currentPage + maxVisibleAfterCurrent;
      }
    }

    // Botón primera página
    if (startPage > 1) {
      pageNumbers.push(
        <li key={1} className="page-item">
          <button className="page-link" onClick={() => handlePageChange(1)}>
            1
          </button>
        </li>
      );
      if (startPage > 2) {
        pageNumbers.push(
          <li key="start-ellipsis" className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        );
      }
    }

    // Páginas intermedias
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
          <button className="page-link" onClick={() => handlePageChange(i)}>
            {i}
          </button>
        </li>
      );
    }

    // Botón última página
    if (endPage < paginationData.totalPages) {
      if (endPage < paginationData.totalPages - 1) {
        pageNumbers.push(
          <li key="end-ellipsis" className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        );
      }
      pageNumbers.push(
        <li key={paginationData.totalPages} className="page-item">
          <button 
            className="page-link" 
            onClick={() => handlePageChange(paginationData.totalPages)}
          >
            {paginationData.totalPages}
          </button>
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="activity-list-container">
      <h5 className="mt-4 text-success">
        Actividades disponibles ({paginationData.totalItems})
      </h5>
      
      <div className="activity-items mb-4">
        {paginationData.currentItems.map(activity => (
          <ActivityItem
            key={activity.id}
            activity={activity}
            people={people}
            onSelect={onSelect}
            onBook={onBook}
            date={date}
          />
        ))}
      </div>

      {paginationData.totalPages > 1 && (
        <div className="pagination-wrapper">
          <nav aria-label="Paginación de actividades">
            <ul className="pagination justify-content-center flex-wrap">
              <li className={`page-item ${!paginationData.hasPrev ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={!paginationData.hasPrev}
                  aria-label="Anterior"
                >
                  &laquo;
                </button>
              </li>

              {renderPageNumbers()}

              <li className={`page-item ${!paginationData.hasNext ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={!paginationData.hasNext}
                  aria-label="Siguiente"
                >
                  &raquo;
                </button>
              </li>
            </ul>
          </nav>
          
          <div className="text-center text-muted small mt-2">
            Mostrando {paginationData.range} de {paginationData.totalItems} actividades
          </div>
        </div>
      )}
    </div>
  );
};