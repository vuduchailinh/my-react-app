export function generatePageNumbers(currentPage: number, totalPages: number , maxPagesToShow: number = 4) {
    const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);
    let startPage = Math.max(1, currentPage - halfMaxPagesToShow);
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    const pages : (number | string)[] = [];
    const hasLeftEllipsis = startPage > 1;
    const hasRightEllipsis = endPage < totalPages;

    if (hasLeftEllipsis) {
        pages.push(1);
        if (startPage > 2) {
            pages.push('...');
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    if (hasRightEllipsis) {
        if (endPage < totalPages - 1) {
            pages.push('...');
        }
        pages.push(totalPages);
    }

    return pages;
}