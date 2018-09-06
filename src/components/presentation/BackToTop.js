import React from 'react';

const BackToTop = props => {
  return (
    <div>
      <div className="btn-back-top">
        <a
          href="#"
          data-scroll
          id="back-top"
          className="btn-circle btn-circle-primary btn-circle-sm btn-circle-raised "
        >
          <i className="zmdi zmdi-long-arrow-up" />
        </a>
      </div>
    </div>
  );
};

export default BackToTop;
