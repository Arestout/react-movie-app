import React from "react";

class Pagination extends React.Component {
  render() {
    const { moveToNextPage, moveToPrevPage, page, totalPages } = this.props;
    return (
      <div>
        <nav aria-label="Page navigation">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => moveToPrevPage()}>
                Prev Page
              </button>
            </li>

            <li className="page-item">
              <button className="page-link" onClick={() => moveToNextPage()}>
                Next Page
              </button>
            </li>
          </ul>
          <div className="center">
            {page} of {totalPages}
          </div>
        </nav>
      </div>
    );
  }
}

export default Pagination;
