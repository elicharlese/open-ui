import React, { useState } from "react";

import { Link } from "react-router-dom";

// reactstrap
import { Row, Col, Modal, Button, Form } from "reactstrap";

const Header = props => {
  const [isSearch, setSearch] = useState(false);
  const [connect_wallet_modal, setconnect_wallet_modal] = useState(false);

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  function tog_connect_wallet() {
    setconnect_wallet_modal(!connect_wallet_modal);
    removeBodyCss();
  }

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box">
              <Link to="/" className="logo logo-dark">
                <span className="logo-sm">
                  <strong style={{ color: 'white', fontSize: '22px', fontWeight: '600' }}>Hashstack</strong>
                </span>
                <span className="logo-lg">
                  <strong style={{ color: 'white', fontSize: '19px', fontWeight: '600' }}>Hashstack</strong>
                </span>
              </Link>

              <Link to="/" className="logo logo-light">
                <span className="logo-sm">
                  <strong style={{ color: 'white', fontSize: '22px', fontWeight: '600' }}>Hashstack</strong>
                </span>
                <span className="logo-lg">
                  <strong style={{ color: 'white', fontSize: '19px', fontWeight: '600' }}>Hashstack</strong>
                </span>
              </Link>
            </div>

            {/* <button
              type="button"
              className="btn btn-sm px-3 font-size-16 d-lg-none header-item"
              data-toggle="collapse"
              onClick={() => {
                props.toggleLeftmenu(!props.leftMenu);
              }}
              data-target="#topnav-menu-content"
            >
              <i className="fa fa-fw fa-bars" />
            </button> */}

            <form className="app-search d-none d-lg-block">
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                />
                <span className="bx bx-search-alt" />
              </div>
            </form>
          </div>

          <div className="d-flex">
            <div className="dropdown d-inline-block d-lg-none ms-2">
              <button
                type="button"
                className="btn header-item noti-icon "
                id="page-header-search-dropdown"
                onClick={() => setSearch(!isSearch)}
              >
                <i className="mdi mdi-magnify" />
              </button>
              <div
                className={
                  isSearch
                    ? "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0 show"
                    : "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                }
                aria-labelledby="page-header-search-dropdown"
              >
                <form className="p-3">
                  <div className="form-group m-0">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder={"Search..."}
                        aria-label="Recipient's username"
                      />
                      <div className="input-group-append">
                        <button className="btn btn-primary" type="submit">
                          <i className="mdi mdi-magnify" />
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="d-flex flex-wrap gap-4">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                tog_connect_wallet();
              }}
            >
              <i className="fas fa-wallet font-size-16 align-middle me-2"></i>{" "}
              Connect
            </button>
            <Modal
              isOpen={connect_wallet_modal}
              toggle={() => {
                tog_connect_wallet();
              }}
              centered
            >
              <div className="modal-body">
                <Form>
                  <h5 style={{ textAlign: "center" }}>Connect to Wallet</h5>
                  <hr />
                  <div className="row mb-4">
                    <Col sm={6}>
                      <Button
                        type="submit"
                        className="btn-block btn-lg"
                        color="light"
                        outline
                      >
                        Bitcoin
                      </Button>
                    </Col>
                    <Col sm={6}>
                      <Button
                        type="submit"
                        className="btn-block btn-lg"
                        color="light"
                        outline
                      >
                        Binance
                      </Button>
                    </Col>
                  </div>
                  <div className="row mb-4">
                    <Col sm={6}>
                      <Button
                        type="submit"
                        color="light"
                        className="btn-block btn-lg"
                        outline
                      >
                        USDC
                      </Button>
                    </Col>
                    <Col sm={6}>
                      <Button
                        type="submit"
                        color="light"
                        className="btn-block btn-lg"
                        outline
                      >
                        USDT
                      </Button>
                    </Col>
                  </div>
                </Form>
              </div>
            </Modal>

            <div className="form-check form-switch" style={{ margin: "0" }}>
              <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked />
              <label className="form-check-label">Dark</label>
            </div>
          </div>

        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;