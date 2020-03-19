import React from "react";
import classNames from "classnames";

class MovieTabs extends React.Component {
  shouldComponentUpdate(nextProps, nestState) {
    if (nextProps.sort_by !== this.props.sort_by) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { sort_by, updateSortBy } = this.props;

    const handleClick = value => () => {
      updateSortBy(value);
    };

    const getClassLink = value =>
      classNames("nav-link", { active: sort_by === value });

    return (
      <ul className="tabs nav nav-pills">
        <li className="nav-item">
          <div
            className={getClassLink("popularity.desc")}
            onClick={handleClick("popularity.desc")}
          >
            Popularyty desc
          </div>
        </li>
        <li className="nav-item">
          <div
            className={getClassLink("revenue.desc")}
            onClick={handleClick("revenue.desc")}
          >
            Revenue desc
          </div>
        </li>
        <li className="nav-item">
          <div
            className={getClassLink("vote_average.desc")}
            onClick={handleClick("vote_average.desc")}
          >
            Vote average desc
          </div>
        </li>
      </ul>
    );
  }
}

export default MovieTabs;
