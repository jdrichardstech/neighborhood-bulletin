import React from 'react';

const Header = props => {
  return (
    <div>
      <div
        className="modal modal-primary"
        id="ms-account-modal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
      >
        <div
          className="modal-dialog animated zoomIn animated-3x"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header shadow-2dp no-pb">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">
                  <i className="zmdi zmdi-close" />
                </span>
              </button>
              <div className="modal-title text-center">
                <span className="ms-logo ms-logo-white ms-logo-sm mr-1">
                  JD
                </span>
                <h3 className="no-m ms-site-title">
                  Neighborhood
                  <span>Bulletin Board</span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <header className="ms-header ms-header-white">
        <div className="container container-full">
          <div className="ms-title">
            <a href="index.html">
              <span className="ms-logo animated zoomInDown animation-delay-5">
                JD
              </span>
              <h1 className="animated fadeInRight animation-delay-6">
                Neighborhood
                <span>Bulletin Board</span>
              </h1>
            </a>
          </div>
        </div>
      </header>
      <nav className="navbar navbar-static-top yamm ms-navbar ms-navbar-primary">
        <div className="container container-full">
          <div className="navbar-header">
            <a className="navbar-brand" href="index.html">
              <span className="ms-logo ms-logo-sm">JD</span>
              <span className="ms-title">
                Neighborhood
                <strong>Bulletin Board</strong>
              </span>
            </a>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav" />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
