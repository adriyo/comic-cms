import ReactPaginate from 'react-paginate';

type PaginationProps = {
  totalPage: number;
  onNextPage?: () => void;
  onPreviousPage?: () => void;
  onChangePage: (currentPage: number) => void;
  hidden?: boolean;
};

const Pagination = ({ totalPage, onChangePage, hidden }: PaginationProps) => {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={(item) => {
        onChangePage(item.selected + 1);
      }}
      pageRangeDisplayed={3}
      pageCount={totalPage}
      previousLabel="<"
      containerClassName={`join ${hidden ? 'hidden' : ''}`}
      previousClassName="join-item btn btn-sm"
      nextClassName="join-item btn btn-sm"
      pageClassName="join-item btn btn-sm"
      activeClassName="join-item btn btn-sm btn-active"
      breakClassName="join-item btn btn-sm"
      renderOnZeroPageCount={null}
      marginPagesDisplayed={1}
    />
  );
};

export default Pagination;
