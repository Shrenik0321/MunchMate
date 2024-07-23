import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PaginationComponent = ({
  activePage,
  itemsPerPage,
  totalItemCount,
  onPageChange,
}: any) => {
  // Calculate total number of pages
  const totalPages = Math.ceil(totalItemCount / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <Pagination>
        <PaginationContent>
          {/* Previous Page */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => handlePageChange(activePage - 1)}
            />
          </PaginationItem>

          {/* Page Number Links */}
          {activePage > 1 && (
            <>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={() => handlePageChange(activePage - 1)}
                >
                  {activePage - 1}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          <PaginationItem>
            <PaginationLink href="#" isActive>
              {activePage}
            </PaginationLink>
          </PaginationItem>

          {activePage < totalPages && (
            <>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={() => handlePageChange(activePage + 1)}
                >
                  {activePage + 1}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          {/* Next Page */}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => handlePageChange(activePage + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
