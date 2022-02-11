import React, { useState, useContext, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Modal, Button, Form } from "reactstrap";
import { Web3ModalContext } from "../../contexts/Web3ModalProvider";
import { Web3WrapperContext } from "../../contexts/Web3WrapperProvider";
import { GetErrorText } from "../../blockchain/utils";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure({ autoClose: 4000 });


const Header = () => {
  const [get_token, setGet_token] = useState(false);

  const { connect, disconnect, account } = useContext(Web3ModalContext);
  const { web3Wrapper: wrapper } = useContext(Web3WrapperContext);

  
  useEffect(() => {
    wrapper?.getFaucetInstance().faucet.on("TokensIssued", onSuccessCallback);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleConnectWallet = useCallback(() => {
    connect();
  }, [connect]);

  const handleDisconnectWallet = useCallback(() => {
    disconnect();
  }, [disconnect]);

  async function handleGetToken (event: any) {
    try {
      await wrapper?.getFaucetInstance().getTokens(event.target.textContent);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        toast.error(`${GetErrorText(String(error.message))}`, { position: toast.POSITION.BOTTOM_RIGHT, closeOnClick: true});
      } else {
        toast.error(`${GetErrorText(String(error))}`, { position: toast.POSITION.BOTTOM_RIGHT, closeOnClick: true});
      }
      
    }
  }


  
  const onSuccessCallback = (data) => {
    toast.success(`${data.message || 'Tokens Received Successfully.'}`, { position: toast.POSITION.BOTTOM_RIGHT, closeOnClick: true});
  };

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  function tog_token() {
    setGet_token(!get_token);
    removeBodyCss();
  }

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box">
              <Link to="" className="logo logo-dark">
                <img src="./logo.png" style={{ width: '30px', height: '30px', marginRight: '0.5rem' }}></img>
                <span className="logo-sm">
                  <strong style={{ color: 'white', fontSize: '22px', fontWeight: '600' }}>Hashstack</strong>
                </span>
                <span className="logo-lg">
                  <strong style={{ color: 'white', fontSize: '19px', fontWeight: '600' }}>Hashstack</strong>
                </span>
              </Link>

              <Link to="" className="logo logo-light">
                <img src="./logo.png" style={{ width: '30px', height: '30px', marginRight: '0.5rem' }}></img>
                <span className="logo-sm">
                  <strong style={{ color: 'white', fontSize: '22px', fontWeight: '600' }}>Hashstack</strong>
                </span>
                <span className="logo-lg">
                  <strong style={{ color: 'white', fontSize: '19px', fontWeight: '600' }}>Hashstack</strong>
                </span>
              </Link>
            </div>
          </div>

          <div className="d-flex flex-wrap gap-4">
            <Button
              color="light"
              outline
              className="btn-outline"
              style={{ float: "right" }}
              disabled={account === null}
              onClick={() => {
                tog_token();
              }}
            >
              Get Tokens
            </Button>
            <Modal
              isOpen={get_token}
              toggle={() => {
                tog_token();
              }}
              centered
            >
              <div className="modal-body">
                <Form>
                  <h5 style={{ textAlign: "center" }}>Get Token</h5>
                  <hr />
                  <div className="row mb-4">
                    <Col sm={3}>
                      <Button
                        className="btn-block btn-lg"
                        color="light"
                        outline
                        onClick={handleGetToken}
                      >
                        Bitcoin
                      </Button>
                    </Col>
                    <Col sm={3}>
                      <Button
                        color="light"
                        className="btn-block btn-lg"
                        outline
                        onClick={handleGetToken}
                      >
                        BNB
                      </Button>
                    </Col>
                    <Col sm={3}>
                      <Button
                        color="light"
                        className="btn-block btn-lg"
                        outline
                        onClick={handleGetToken}
                      >
                        USDC
                      </Button>
                    </Col>
                    <Col sm={3}>
                      <Button
                        color="light"
                        className="btn-block btn-lg"
                        outline
                        onClick={handleGetToken}
                      >
                        USDT
                      </Button>
                    </Col>
                  </div>
                </Form>
              </div>
            </Modal>
            {account ?
              <>
                <Button
                  color="success"
                  outline
                  className="btn-outline"
                  onClick={handleDisconnectWallet}
                >
                  <i className="fas fa-wallet font-size-16 align-middle me-2"></i>{" "}
                  Disconnect
                </Button></>

              :

              <div>
                <Button
                  color="dark"
                  outline
                  className="btn-outline"
                  onClick={handleConnectWallet}
                >
                  <i className="fas fa-wallet font-size-16 align-middle me-2"></i>{" "}
                  Connect
                </Button>
              </div>
            }

            {/* <div className="form-check form-switch" style={{ margin: "0" }}>
              <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked />
              <label className="form-check-label">Dark</label>
            </div> */}
          </div>

        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;