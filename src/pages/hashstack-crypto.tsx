import React, { useState, useEffect, useContext } from "react";
import MetaTags from "react-meta-tags";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  CardBody,
  Button,
  Form,
  Input,
  Table,
  Modal,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Label,
  Spinner
} from "reactstrap";
import classnames from "classnames";
import { Web3ModalContext } from '../contexts/Web3ModalProvider';
import { Web3WrapperContext } from '../contexts/Web3WrapperProvider';
import {
  EventMap, CoinClassNames,
  SymbolsMap, DecimalsMap, DepositInterestRates, BorrowInterestRates, CommitMap, VariableDepositInterestRates
} from '../blockchain/constants';
import { BNtoNum, GetErrorText } from '../blockchain/utils';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure({
  autoClose: 4000
});


const HashstackCrypto = () => {

  const [isMenu, setIsMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeDepositsData, setActiveDepositsData] = useState([]);
  const [activeLoansData, setActiveLoansData] = useState([]);


  const [customActiveTab, setCustomActiveTab] = useState("1");
  const [passbookStatus, setPassbookStatus] = useState(false)
  const [modal_deposit1, setmodal_deposit1] = useState(false);
  const [modal_deposit2, setmodal_deposit2] = useState(false);
  const [modal_deposit3, setmodal_deposit3] = useState(false);
  const [modal_deposit4, setmodal_deposit4] = useState(false);
  const [modal_borrow1, setmodal_borrow1] = useState(false);
  const [modal_borrow2, setmodal_borrow2] = useState(false);
  const [modal_borrow3, setmodal_borrow3] = useState(false);
  const [modal_borrow4, setmodal_borrow4] = useState(false);
  const [modal_repay_loan, setmodal_repay_loan] = useState(false);
  const [modal_withdraw_loan, setmodal_withdraw_loan] = useState(false);
  const [modal_swap_loan, setmodal_swap_loan] = useState(false);
  const [modal_swap_to_loan, setmodal_swap_to_loan] = useState(false);
  const [modal_add_collateral, setmodal_add_collateral] = useState(false);
  const [modal_withdraw_collateral, setmodal_withdraw_collateral] = useState(false);
  const [modal_add_active_deposit, setmodal_add_active_deposit] = useState(false);
  const [modal_withdraw_active_deposit, setmodal_withdraw_active_deposit] = useState(false);

  const [loanOption, setLoanOption] = useState();
  const [swapOption, setSwapOption] = useState();
  const [collateralOption, setCollateralOption] = useState();
  const [depositInterestChange, setDepositInterestChange] = useState("NONE");
  const [borrowInterestChange, setBorrowInterestChange] = useState("NONE");

  let inputVal1 = 0;
  let inputVal2 = 0;

  const { account } = useContext(Web3ModalContext);
  const { web3Wrapper: wrapper } = useContext(Web3WrapperContext);


  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 100);

    account && axios({
      method: 'get',
      url: `getLoansByAccount?account=${account}`,
      withCredentials: false
    }).then(res => {
      setIsLoading(false);
      setActiveLoansData(res.data.data);
    })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      })
  }, [account]);

  useEffect(() => {
    account && axios({
      method: 'get',
      url: `getDepositsByAccount?account=${account}`,
      withCredentials: false
    }).then(res => {
      setIsLoading(false);
      setActiveDepositsData(res.data.data);
    })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      })

  }, [account])

  const toggleMenu = () => {
    setIsMenu(!isMenu);
  };
  const toggleCustom = tab => {
    if (customActiveTab !== tab) {
      setCustomActiveTab(tab);
    }
  };
  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }
  function tog_center1() {
    setmodal_deposit1(!modal_deposit1);
    removeBodyCss();
  }
  function tog_center2() {
    setmodal_deposit2(!modal_deposit2);
    removeBodyCss();
  }
  function tog_center3() {
    setmodal_deposit3(!modal_deposit3);
    removeBodyCss();
  }

  function tog_center4() {
    setmodal_deposit4(!modal_deposit4);
    removeBodyCss();
  }

  function tog_borrow1() {
    setmodal_borrow1(!modal_borrow1);
    removeBodyCss();
  }
  function tog_borrow2() {
    setmodal_borrow2(!modal_borrow2);
    removeBodyCss();
  }
  function tog_borrow3() {
    setmodal_borrow3(!modal_borrow3);
    removeBodyCss();
  }

  function tog_borrow4() {
    setmodal_borrow4(!modal_borrow4);
    removeBodyCss();
  }

  function tog_repay_loan() {
    setmodal_repay_loan(!modal_repay_loan);
    removeBodyCss();
  }
  function tog_withdraw_loan() {
    setmodal_withdraw_loan(!modal_withdraw_loan);
    removeBodyCss();
  }
  function tog_swap_loan() {
    setmodal_swap_loan(!modal_swap_loan);
    removeBodyCss();
  }
  function tog_swap_to_loan() {
    setmodal_swap_to_loan(!modal_swap_to_loan);
    removeBodyCss();
  }
  function tog_add_collateral() {
    setmodal_add_collateral(!modal_add_collateral);
    removeBodyCss();
  }
  function tog_withdraw_collateral() {
    setmodal_withdraw_collateral(!modal_withdraw_collateral);
    removeBodyCss();
  }
  function tog_add_active_deposit() {
    setmodal_add_active_deposit(!modal_add_active_deposit);
    removeBodyCss();
  }
  function tog_withdraw_active_deposit() {
    setmodal_withdraw_active_deposit(!modal_withdraw_active_deposit);
    removeBodyCss();
  }

  const DepositData1 = () => {

    const [commitPeriod1, setCommitPeriod1] = useState();

    useEffect(() => {
      wrapper?.getDepositInstance().deposit.on(EventMap.NEW_DEPOSIT, onDeposit);
      wrapper?.getDepositInstance().deposit.on(EventMap.DEPOSIT_ADDED, onDeposit);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDepositChange1 = (e) => {
      setCommitPeriod1(e.target.value)
    }

    const handleDeposit = async () => {
      try {
        const approveTransactionHash = await wrapper?.getMockBep20Instance().approve(SymbolsMap.USDT, inputVal1, DecimalsMap.USDT);
        console.log("Approve Transaction sent: ", approveTransactionHash);
        const _commitPeriod1: string | undefined =  commitPeriod1;
        await wrapper?.getDepositInstance().depositRequest(SymbolsMap.USDT, CommitMap[_commitPeriod1], inputVal1, DecimalsMap.USDT);
      } catch (err) {
        if (err instanceof Error) {
          toast.error(`${GetErrorText(String(err.message))}`, { position: toast.POSITION.BOTTOM_RIGHT, closeOnClick: true});
        } else {
          toast.error(`${GetErrorText(String(err))}`, { position: toast.POSITION.BOTTOM_RIGHT, closeOnClick: true});
        }
      }
    }

    const onDeposit = (data) => {
      let amount = BNtoNum(Number(data.amount),DecimalsMap[data.market]);
      toast.success(`Deposited amount: ${amount}`, { position: toast.POSITION.BOTTOM_RIGHT, closeOnClick: true});
    }


    return (
      <>
        <button
          type="button"
          className="btn btn-dark btn-sm w-xs"
          onClick={() => {
            tog_center1();
          }}
        >
          Deposit
        </button>
        <Modal
          isOpen={modal_deposit1}
          toggle={() => {
            tog_center1();
          }}
          centered
        >
          <div className="modal-body">
            {account ?
              <Form>
                <div className="row mb-4">
                  <h6>USDT</h6>
                </div>
                <div className="row mb-4">
                  <Col sm={12}>
                    <Input
                      type="number"
                      className="form-control"
                      id="amount"
                      placeholder="Amount"
                      onChange={(event) => { inputVal1 = Number(event.target.value) }}
                    />
                  </Col>
                </div>
                <div className="row mb-4">
                  <Col sm={12}>
                    <select className="form-select" placeholder="Commitment" onChange={handleDepositChange1}>
                      <option hidden>Commitment</option>
                      <option value={"NONE"}>None</option>
                      <option value={"TWOWEEKS"}>Two Weeks</option>
                      <option value={"ONEMONTH"}>One Month</option>
                      <option value={"THREEMONTHS"}>Three Months</option>
                    </select>
                  </Col>
                </div>
                <div className="row mb-4">
                  <Col sm={6}>
                    <p>Fixed APY <strong>{DepositInterestRates[commitPeriod1 || "NONE"] || "7.8%"}</strong></p>
                  </Col>
                  <Col sm={6}>
                    <p style={{ float: "right" }}>Variable APY <strong>{VariableDepositInterestRates[commitPeriod1 || "NONE"] || "0%"}</strong></p>
                  </Col>
                </div>
                <div className="d-grid gap-2">
                  <Button
                    color="primary"
                    className="w-md"
                    disabled={commitPeriod1 === undefined}
                    onClick={handleDeposit}
                  >
                    Deposit
                  </Button>
                </div>
              </Form>
              : <h2>Please connect your wallet</h2>}
          </div>
        </Modal>
      </>
    )
  }

  const DepositData2 = () => {

    const [commitPeriod2, setCommitPeriod2] = useState();

    useEffect(() => {
      wrapper?.getDepositInstance().deposit.on(EventMap.NEW_DEPOSIT, onDeposit);
      wrapper?.getDepositInstance().deposit.on(EventMap.DEPOSIT_ADDED, onDeposit);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDepositChange2 = (e) => {
      setCommitPeriod2(e.target.value)
    }

    const handleDeposit = async () => {
      try {
        const approveTransactionHash = await wrapper?.getMockBep20Instance().approve(SymbolsMap.USDC, inputVal1, DecimalsMap.USDC);
        console.log("Approve Transaction sent: ", approveTransactionHash);
        const _commitPeriod2: string | undefined =  commitPeriod2;
        await wrapper?.getDepositInstance().depositRequest(SymbolsMap.USDC, CommitMap[_commitPeriod2 || "NONE"], inputVal1, DecimalsMap.USDC);
      } catch (err) {
        if (err instanceof Error) {
          toast.error(`${GetErrorText(String(err.message))}`, { position: toast.POSITION.BOTTOM_RIGHT, closeOnClick: true});
        } else {
          toast.error(`${GetErrorText(String(err))}`, { position: toast.POSITION.BOTTOM_RIGHT, closeOnClick: true});
        }
      }
    }

    const onDeposit = (data) => {
      let amount = BNtoNum(Number(data.amount), DecimalsMap[data.market]);
      toast.success(`Deposited amount: ${amount}`, { position: toast.POSITION.BOTTOM_RIGHT, closeOnClick: true});
    }

    return (
      <>
        <button
          type="button"
          className="btn btn-dark btn-sm w-xs"
          onClick={() => {
            tog_center2();
          }}
        >
          Deposit
        </button>
        <Modal
          isOpen={modal_deposit2}
          toggle={() => {
            tog_center2();
          }}
          centered
        >
          <div className="modal-body">
            {account ?
              <Form>
                <div className="row mb-4">
                  <h6>USDC</h6>
                </div>
                <div className="row mb-4">
                  <Col sm={12}>
                    <Input
                      type="number"
                      className="form-control"
                      id="amount"
                      placeholder="Amount"
                      onChange={(event) => { inputVal1 = Number(event.target.value) }}
                    />
                  </Col>
                </div>
                <div className="row mb-4">
                  <Col sm={12}>
                    <select className="form-select" placeholder="Commitment" onChange={handleDepositChange2}>
                      <option hidden>Commitment</option>
                      <option value={"NONE"}>None</option>
                      <option value={"TWOWEEKS"}>Two Weeks</option>
                      <option value={"ONEMONTH"}>One Month</option>
                      <option value={"THREEMONTHS"}>Three Months</option>
                    </select>
                  </Col>
                </div>
                <div className="row mb-4">
                  <Col sm={6}>
                    <p>Fixed APY <strong>{DepositInterestRates[commitPeriod2 || "NONE"] || "7.8%"}</strong></p>
                  </Col>
                  <Col sm={6}>
                    <p style={{ float: "right" }}>Variable APY <strong>{VariableDepositInterestRates[commitPeriod2 || "NONE"] || "0%"}</strong></p>
                  </Col>
                </div>
                <div className="d-grid gap-2">
                  <Button
                    color="primary"
                    className="w-md"
                    onClick={handleDeposit}
                    disabled={commitPeriod2 === undefined}
                  >
                    Deposit
                  </Button>
                </div>
              </Form>
              : <h2>Please connect your wallet</h2>}
          </div>
        </Modal>
      </>
    )
  }

  const DepositData3 = () => {

    const [commitPeriod3, setCommitPeriod3] = useState();

    useEffect(() => {
      wrapper?.getDepositInstance().deposit.on(EventMap.NEW_DEPOSIT, onDeposit);
      wrapper?.getDepositInstance().deposit.on(EventMap.DEPOSIT_ADDED, onDeposit);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDepositChange3 = (e) => {
      setCommitPeriod3(e.target.value)
    }

    const handleDeposit = async () => {
      try {
        const approveTransactionHash = await wrapper?.getMockBep20Instance().approve(SymbolsMap.BTC, inputVal1, DecimalsMap.BTC);
        console.log("Approve Transaction sent: ", approveTransactionHash);
        const _commitPeriod3: string | undefined =  commitPeriod3;
        await wrapper?.getDepositInstance().depositRequest(SymbolsMap.BTC, CommitMap[_commitPeriod3], inputVal1, DecimalsMap.BTC);
      } catch (err) {
        if (err instanceof Error) {
          toast.error(`${GetErrorText(String(err.message))}`, { position: toast.POSITION.BOTTOM_RIGHT, closeOnClick: true});
        } else {
          toast.error(`${GetErrorText(String(err))}`, { position: toast.POSITION.BOTTOM_RIGHT, closeOnClick: true});
        }
      }
    }

    const onDeposit = (data) => {
      let amount = BNtoNum(Number(data.amount), DecimalsMap[data.market]);
      toast.success(`Deposited amount: ${amount}`, { position: toast.POSITION.BOTTOM_RIGHT, closeOnClick: true});
    }


    return (
      <>
        <button
          type="button"
          className="btn btn-dark btn-sm w-xs"
          onClick={() => {
            tog_center3();
          }}
        >
          Deposit
        </button>
        <Modal
          isOpen={modal_deposit3}
          toggle={() => {
            tog_center3();
          }}
          centered
        >
          <div className="modal-body">
            {account ?
              <Form>
                <div className="row mb-4">
                  <h6>BTC</h6>
                </div>
                <div className="row mb-4">
                  <Col sm={12}>
                    <Input
                      type="number"
                      className="form-control"
                      id="amount"
                      placeholder="Amount"
                      onChange={(event) => { inputVal1 = Number(event.target.value) }}
                    />
                  </Col>
                </div>
                <div className="row mb-4">
                  <Col sm={12}>
                    <select className="form-select" placeholder="Commitment" onChange={handleDepositChange3}>
                      <option hidden>Commitment</option>
                      <option value={"NONE"}>None</option>
                      <option value={"TWOWEEKS"}>Two Weeks</option>
                      <option value={"ONEMONTH"}>One Month</option>
                      <option value={"THREEMONTHS"}>Three Months</option>
                    </select>
                  </Col>
                </div>
                <div className="row mb-4">
                  <Col sm={6}>
                    <p>Fixed APY <strong>{DepositInterestRates[commitPeriod3 || "NONE"] || "7.8%"}</strong></p>
                  </Col>
                  <Col sm={6}>
                    <p style={{ float: "right" }}>Variable APY <strong>{VariableDepositInterestRates[commitPeriod3 || "NONE"] || "0%"}</strong></p>
                  </Col>
                </div>
                <div className="d-grid gap-2">
                  <Button
                    color="primary"
                    className="w-md"
                    onClick={handleDeposit}
                    disabled={commitPeriod3 === undefined}
                  >
                    Deposit
                  </Button>
                </div>
              </Form>
              : <h2>Please connect your wallet</h2>}
          </div>
        </Modal>
      </>
    )
  }

  const DepositData4 = () => {

    const [commitPeriod4, setCommitPeriod4] = useState();

    useEffect(() => {
      wrapper?.getDepositInstance().deposit.on(EventMap.NEW_DEPOSIT, onDeposit);
      wrapper?.getDepositInstance().deposit.on(EventMap.DEPOSIT_ADDED, onDeposit);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDepositChange4 = (e) => {
      setCommitPeriod4(e.target.value)
    }

    const handleDeposit = async () => {
      try {
        const approveTransactionHash = await wrapper?.getMockBep20Instance().approve(SymbolsMap.BNB, inputVal1, DecimalsMap.BNB);
        console.log("Approve Transaction sent: ", approveTransactionHash);
        const _commitPeriod4: string | undefined =  commitPeriod4;
        await wrapper?.getDepositInstance().depositRequest(SymbolsMap.BNB, CommitMap[_commitPeriod4], inputVal1, DecimalsMap.BNB);
      } catch (err) {
        if (err instanceof Error) {
          toast.error(`${GetErrorText(String(err.message))}`, { position: toast.POSITION.BOTTOM_RIGHT, closeOnClick: true});
        } else {
          toast.error(`${GetErrorText(String(err))}`, { position: toast.POSITION.BOTTOM_RIGHT, closeOnClick: true});
        }
      }
    }

    const onDeposit = (data) => {
      let amount = BNtoNum(Number(data.amount), DecimalsMap[data.market]);
      toast.success(`Deposited amount: ${amount}`, { position: toast.POSITION.BOTTOM_RIGHT, closeOnClick: true});
    }


    return (
      <>
        <button
          type="button"
          className="btn btn-dark btn-sm w-xs"
          onClick={() => {
            tog_center4();
          }}
        >
          Deposit
        </button>
        <Modal
          isOpen={modal_deposit4}
          toggle={() => {
            tog_center4();
          }}
          centered
        >
          <div className="modal-body">
            {account ?
              <Form>
                <div className="row mb-4">
                  <h6>BNB</h6>
                </div>
                <div className="row mb-4">
                  <Col sm={12}>
                    <Input
                      type="number"
                      className="form-control"
                      id="amount"
                      placeholder="Amount"
                      onChange={(event) => { inputVal1 = Number(event.target.value) }}
                    />
                  </Col>
                </div>
                <div className="row mb-4">
                  <Col sm={12}>
                    <select className="form-select" placeholder="Commitment" onChange={handleDepositChange4}>
                      <option hidden>Commitment</option>
                      <option value={"NONE"}>None</option>
                      <option value={"TWOWEEKS"}>Two Weeks</option>
                      <option value={"ONEMONTH"}>One Month</option>
                      <option value={"THREEMONTHS"}>Three Months</option>
                    </select>
                  </Col>
                </div>
                <div className="row mb-4">
                  <Col sm={6}>
                    <p>Fixed APY <strong>{DepositInterestRates[commitPeriod4 || "NONE"] || "7.8%"}</strong></p>
                  </Col>
                  <Col sm={6}>
                    <p style={{ float: "right" }}>Variable APY <strong>{VariableDepositInterestRates[commitPeriod4 || "NONE"] || "0%"}</strong></p>
                  </Col>
                </div>
                <div className="d-grid gap-2">
                  <Button
                    color="primary"
                    className="w-md"
                    onClick={handleDeposit}
                    disabled={commitPeriod4 === undefined}
                  >
                    Deposit
                  </Button>
                </div>
              </Form>
              : <h2>Please connect your wallet</h2>}
          </div>
        </Modal>
      </>
    )
  }


  const handleLoanOptionChange = (e) => {
    setLoanOption(e.target.value)
  }

  const handleSwapOptionChange = (e) => {
    setSwapOption(e.target.value)
  }

  const handleCollateralOptionChange = (e) => {
    setCollateralOption(e.target.value)
  }

  const handleDepositInterestChange = (e) => {
    setDepositInterestChange(e.target.value);
  }

  const handleBorrowInterestChange = (e) => {
    setBorrowInterestChange(e.target.value);
  }


  const handleRepay = async () => {
    try {
      const commit = activeLoansData.filter((asset) => {
        return EventMap[asset.loanMarket.toUpperCase()] === loanOption;
      });
      const _loanOption: string | undefined =  loanOption;
      const market = SymbolsMap[_loanOption];
      const decimal = DecimalsMap[_loanOption];
      const comm = CommitMap[commit[0].commitment];
      await wrapper?.getLoanInstance().repayLoan(market, comm, inputVal1, decimal);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(`${GetErrorText(String(err.message))}`, { position: toast.POSITION.BOTTOM_RIGHT, closeOnClick: true});
      } else {
        toast.error(`${GetErrorText(String(err))}`, { position: toast.POSITION.BOTTOM_RIGHT, closeOnClick: true});
      }
    }
  }

  const handleWithdrawLoan = async () => {
    try {
      const commit = activeLoansData.filter((asset) => {
        return EventMap[asset.loanMarket.toUpperCase()] === loanOption;
      });
      const _loanOption: string | undefined =  loanOption;

      await wrapper?.getLoanInstance().permissibleWithdrawal(SymbolsMap[_loanOption], CommitMap[commit[0].commitment], inputVal1, DecimalsMap[_loanOption]);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(`${GetErrorText(String(err.message))}`, { position: toast.POSITION.BOTTOM_RIGHT, closeOnClick: true});
      } else {
        toast.error(`${GetErrorText(String(err))}`, { position: toast.POSITION.BOTTOM_RIGHT, closeOnClick: true});
      }
    }
  }

  // const onCollateralReleased = (data) => {
  //   let amount = BNtoNum(Number(data.amount))
  //   toast.success(`Collateral amount released: ${amount}`, { position: toast.POSITION.BOTTOM_RIGHT, closeOnClick: true});
  // }

  const handleCollateral = async () => {
    try {
      const commit = activeLoansData.filter((asset) => {
        return EventMap[asset.loanMarket.toUpperCase()] === loanOption;
      });
      const _loanOption: string | undefined =  loanOption;
      const _collateralOption: string | undefined =  collateralOption;
      await wrapper?.getLoanInstance().addCollateral(SymbolsMap[_loanOption], CommitMap[commit[0].commitment], SymbolsMap[_collateralOption], inputVal1, DecimalsMap[_loanOption]);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(`${GetErrorText(String(err.message))}`, { position: toast.POSITION.BOTTOM_RIGHT, closeOnClick: true});
      } else {
        toast.error(`${GetErrorText(String(err))}`, { position: toast.POSITION.BOTTOM_RIGHT, closeOnClick: true});
      }
    }
  }

  const handleWithdrawCollateral = async () => {
    try {
      const commit = activeLoansData.filter((asset) => {
        return EventMap[asset.loanMarket.toUpperCase()] === loanOption;
      });
      const _loanOption: string | undefined =  loanOption;
      await wrapper?.getLoanInstance().withdrawCollateral(SymbolsMap[_loanOption], CommitMap[commit[0].commitment]);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(`${GetErrorText(String(err.message))}`, { position: toast.POSITION.BOTTOM_RIGHT, closeOnClick: true});
      } else {
        toast.error(`${GetErrorText(String(err))}`, { position: toast.POSITION.BOTTOM_RIGHT, closeOnClick: true});
      }
    }
  }

  const onCollateralAdded = (data) => {
    let amount = BNtoNum(Number(data.amount))
    toast.success(`Collateral amount added: ${amount}`, { position: toast.POSITION.BOTTOM_RIGHT, closeOnClick: true});
  }

  const onLoanWithdrawal = (data) => {
    let amount = BNtoNum(Number(data.amount))
    toast.success(`Loan Withdraw Successfully: ${amount}`, { position: toast.POSITION.BOTTOM_RIGHT, closeOnClick: true});
  }

  const onLoanRepay = (data) => {
    let amount = BNtoNum(Number(data.amount))
    toast.success(`Loan Repaid Successfully: ${amount}`, { position: toast.POSITION.BOTTOM_RIGHT, closeOnClick: true});
  }

  const handleSwap = async () => {
    try {
      const commit = activeLoansData.filter((asset) => {
        return EventMap[asset.loanMarket.toUpperCase()] === loanOption;
      });
      const _loanOption: string | undefined =  loanOption;
      const _swapOption: string | undefined =  swapOption;
      await wrapper?.getLoanInstance().swapLoan(SymbolsMap[_loanOption], CommitMap[commit[0].commitment], SymbolsMap[_swapOption]);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(`${GetErrorText(String(err.message))}`, { position: toast.POSITION.BOTTOM_RIGHT, closeOnClick: true});
      } else {
        toast.error(`${GetErrorText(String(err))}`, { position: toast.POSITION.BOTTOM_RIGHT, closeOnClick: true});
      }
    }
  }

  const handleSwapToLoan = async () => {
    try {
      const commit = activeLoansData.filter((asset) => {
        return EventMap[asset.loanMarket.toUpperCase()] === loanOption;
      });
      const _loanOption: string | undefined =  loanOption;
      const _swapOption: string | undefined =  swapOption;
      await wrapper?.getLoanInstance().swapToLoan(SymbolsMap[_swapOption], CommitMap[commit[0].commitment], SymbolsMap[_loanOption]);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(`${GetErrorText(String(err.message))}`, { position: toast.POSITION.BOTTOM_RIGHT, closeOnClick: true});
      } else {
        toast.error(`${GetErrorText(String(err))}`, { position: toast.POSITION.BOTTOM_RIGHT, closeOnClick: true});
      }
    }
  }


  const BorrowData1 = (props) => {

    const [commitBorrowPeriod1, setCommitBorrowPeriod1] = useState();
    const [collateralMarket1, setCollateralMarket1] = useState();

    useEffect(() => {
      wrapper?.getLoanInstance().loanExt.on(EventMap.REQUEST_LOAN, onLoanRequested);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    });

    const handleBorrowChange1 = (e) => {
      setCommitBorrowPeriod1(e.target.value)
    }

    const handleCollateralChange1 = (e) => {
      setCollateralMarket1(e.target.value)
    }

    const handleBorrow = async () => {
      try {
        const approveTransactionHash = await wrapper?.getMockBep20Instance().approve(SymbolsMap[props.assetID], inputVal1, DecimalsMap[props.assetID]);
        console.log("Approve Transaction sent: ", approveTransactionHash);
        const _commitBorrowPeriod1: string | undefined =  commitBorrowPeriod1;
        const _collateralMarket1: string | undefined =  collateralMarket1;
        await wrapper?.getLoanInstance().loanRequest(SymbolsMap[props.assetID], CommitMap[_commitBorrowPeriod1], inputVal1, DecimalsMap[props.assetID],
        SymbolsMap[_collateralMarket1], inputVal2, DecimalsMap[_collateralMarket1]);
      } catch (err) {
        if (err instanceof Error) {
          toast.error(`${GetErrorText(String(err.message))}`, { position: toast.POSITION.BOTTOM_RIGHT, closeOnClick: true});
        } else {
          toast.error(`${GetErrorText(String(err))}`, { position: toast.POSITION.BOTTOM_RIGHT, closeOnClick: true});
        }
      }
    }

    const onLoanRequested = (data) => {
      let amount = BNtoNum(Number(data.loanAmount), DecimalsMap[data.market]);
      toast.success(`Requested amount: ${amount}`, { position: toast.POSITION.BOTTOM_RIGHT, closeOnClick: true});
    }

    return (
      <>
        <button
          type="button"
          className="btn btn-secondary btn-sm w-xs"
          onClick={() => {
            tog_borrow1();
          }}
        >
          Borrow
        </button>
        <Modal
          isOpen={modal_borrow1}
          toggle={() => {
            tog_borrow1();
          }}
          centered
        >
          <div className="modal-body">
            {account ?
              <Form>
                <div className="row mb-4">
                  <h6>{props.title}</h6>
                </div>
                <div className="row mb-4">
                  <Col sm={12}>
                    <Input
                      type="text"
                      className="form-control"
                      id="horizontal-password-Input"
                      placeholder="Amount"
                      onChange={(event) => { inputVal1 = Number(event.target.value) }}
                    />
                  </Col>
                </div>
                <div className="row mb-4">
                  <Col sm={12}>
                    <select className="form-select" placeholder="Commitment" onChange={handleBorrowChange1}>
                      <option hidden>Commitment</option>
                      <option value={"NONE"}>None</option>
                      <option value={"ONEMONTH"}>One Month</option>
                    </select>
                  </Col>
                </div>
                <div className="row mb-4">
                  <h6>Collateral</h6>
                </div>
                <div className="row mb-4">
                  <Col sm={12}>
                    <select className="form-select" onChange={handleCollateralChange1}>
                      <option hidden>Collateral market</option>
                      <option value={"USDT"}>USDT</option>
                      <option value={"USDC"}>USDC</option>
                      <option value={"BTC"}>BTC</option>
                      <option value={"BNB"}>BNB</option>
                    </select>
                  </Col>
                </div>
                <div className="row mb-4">
                  <Col sm={12}>
                    <Input
                      type="text"
                      className="form-control"
                      id="horizontal-password-Input"
                      placeholder="Amount"
                      onChange={(event) => { inputVal2 = Number(event.target.value)}}
                    />
                  </Col>
                </div>
                <div className="row mb-4">
                  <Col sm={6}>
                    <p>Borrow APR <strong>{BorrowInterestRates[commitBorrowPeriod1 || "NONE"] || '15%'}</strong></p>
                  </Col>
                  <Col sm={6}>
                    <p style={{ float: "right" }}>Collateral APY <strong>0%</strong></p>
                  </Col>
                </div>

                <div className="d-grid gap-2">
                  <Button
                    color="primary"
                    className="w-md"
                    disabled={commitBorrowPeriod1 === undefined}
                    onClick={handleBorrow}
                  >
                    Request Loan
                  </Button>
                </div>
              </Form>
              : <h2>Please connect your wallet</h2>}
          </div>
        </Modal>
      </>
    )
  }

  const BorrowData2 = (props) => {

    const [commitBorrowPeriod2, setCommitBorrowPeriod2] = useState();
    const [collateralMarket2, setCollateralMarket2] = useState();

    useEffect(() => {
      wrapper?.getLoanInstance().loanExt.on(EventMap.REQUEST_LOAN, onLoanRequested);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    });

    const handleBorrowChange2 = (e) => {
      setCommitBorrowPeriod2(e.target.value)
    }

    const handleCollateralChange2 = (e) => {
      setCollateralMarket2(e.target.value)
    }

    const handleBorrow = async () => {
      try {
        const approveTransactionHash = await wrapper?.getMockBep20Instance().approve(SymbolsMap[props.assetID], inputVal1, DecimalsMap[props.assetID]);
        console.log("Approve Transaction sent: ", approveTransactionHash);
        const _commitBorrowPeriod2: string | undefined =  commitBorrowPeriod2;
        const _collateralMarket2: string | undefined =  collateralMarket2;
        await wrapper?.getLoanInstance().loanRequest(SymbolsMap[props.assetID], CommitMap[_commitBorrowPeriod2], inputVal1, DecimalsMap[props.assetID],
          SymbolsMap[_collateralMarket2], inputVal2, DecimalsMap[_collateralMarket2]);
      } catch (err) {
        if (err instanceof Error) {
          toast.error(`${GetErrorText(String(err.message))}`, { position: toast.POSITION.BOTTOM_RIGHT, closeOnClick: true});
        } else {
          toast.error(`${GetErrorText(String(err))}`, { position: toast.POSITION.BOTTOM_RIGHT, closeOnClick: true});
        }
      }
    }

    const onLoanRequested = (data) => {
      let amount = BNtoNum(Number(data.loanAmount), DecimalsMap[data.market]);
      toast.success(`Requested amount: ${amount}`, { position: toast.POSITION.BOTTOM_RIGHT, closeOnClick: true});
    }


    return (
      <>
        <button
          type="button"
          className="btn btn-secondary btn-sm w-xs"
          onClick={() => {
            tog_borrow2();
          }}
        >
          Borrow
        </button>
        <Modal
          isOpen={modal_borrow2}
          toggle={() => {
            tog_borrow2();
          }}
          centered
        >
          <div className="modal-body">
            {account ?
              <Form>
                <div className="row mb-4">
                  <h6>{props.title}</h6>
                </div>
                <div className="row mb-4">
                  <Col sm={12}>
                    <Input
                      type="text"
                      className="form-control"
                      id="horizontal-password-Input"
                      placeholder="Amount"
                      onChange={(event) => { inputVal1 = Number(event.target.value) }}
                    />
                  </Col>
                </div>
                <div className="row mb-4">
                  <Col sm={12}>
                    <select className="form-select" placeholder="Commitment" onChange={handleBorrowChange2}>
                      <option hidden>Commitment</option>
                      <option value={"NONE"}>None</option>
                      <option value={"ONEMONTH"}>One Month</option>
                    </select>
                  </Col>
                </div>
                <div className="row mb-4">
                  <h6>Collateral</h6>
                </div>
                <div className="row mb-4">
                  <Col sm={12}>
                    <select className="form-select" onChange={handleCollateralChange2}>
                      <option hidden>Collateral market</option>
                      <option value={"USDT"}>USDT</option>
                      <option value={"USDC"}>USDC</option>
                      <option value={"BTC"}>BTC</option>
                      <option value={"BNB"}>BNB</option>
                    </select>
                  </Col>
                </div>
                <div className="row mb-4">
                  <Col sm={12}>
                    <Input
                      type="text"
                      className="form-control"
                      id="horizontal-password-Input"
                      placeholder="Amount"
                      onChange={(event) => { inputVal2 = Number(event.target.value) }}
                    />
                  </Col>
                </div>
                <div className="row mb-4">
                  <Col sm={6}>
                    <p>Borrow APR <strong>{BorrowInterestRates[commitBorrowPeriod2 || "NONE"] || '15%'}</strong></p>
                  </Col>
                  <Col sm={6}>
                    <p style={{ float: "right" }}>Collateral APY <strong>0%</strong></p>
                  </Col>
                </div>

                <div className="d-grid gap-2">
                  <Button
                    color="primary"
                    className="w-md"
                    disabled={commitBorrowPeriod2 === undefined}
                    onClick={handleBorrow}
                  >
                    Request Loan
                  </Button>
                </div>
              </Form>
              : <h2>Please connect your wallet</h2>}
          </div>
        </Modal>
      </>
    )
  }

  const BorrowData3 = (props) => {

    const [commitBorrowPeriod3, setCommitBorrowPeriod3] = useState();
    const [collateralMarket3, setCollateralMarket3] = useState();

    useEffect(() => {
      wrapper?.getLoanInstance().loanExt.on(EventMap.REQUEST_LOAN, onLoanRequested);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    });

    const handleBorrowChange3 = (e) => {
      setCommitBorrowPeriod3(e.target.value)
    }

    const handleCollateralChange3 = (e) => {
      setCollateralMarket3(e.target.value)
    }

    const handleBorrow = async () => {
      try {
        const approveTransactionHash = await wrapper?.getMockBep20Instance().approve(SymbolsMap[props.assetID], inputVal1, DecimalsMap[props.assetID]);
        console.log("Approve Transaction sent: ", approveTransactionHash);
        const _commitBorrowPeriod3: string | undefined =  commitBorrowPeriod3;
        const _collateralMarket3: string | undefined =  collateralMarket3;
        await wrapper?.getLoanInstance().loanRequest(SymbolsMap[props.assetID], CommitMap[_commitBorrowPeriod3], inputVal1, DecimalsMap[props.assetID],
          SymbolsMap[_collateralMarket3], inputVal2, DecimalsMap[_collateralMarket3]);
      } catch (err) {
        if (err instanceof Error) {
          toast.error(`${GetErrorText(String(err.message))}`, { position: toast.POSITION.BOTTOM_RIGHT, closeOnClick: true});
        } else {
          toast.error(`${GetErrorText(String(err))}`, { position: toast.POSITION.BOTTOM_RIGHT, closeOnClick: true});
        }
      }
    }

    const onLoanRequested = (data) => {
      let amount = BNtoNum(Number(data.loanAmount), DecimalsMap[data.market]);
      toast.success(`Requested amount: ${amount}`, { position: toast.POSITION.BOTTOM_RIGHT, closeOnClick: true});
    }


    return (
      <>
        <button
          type="button"
          className="btn btn-secondary btn-sm w-xs"
          onClick={() => {
            tog_borrow3();
          }}
        >
          Borrow
        </button>
        <Modal
          isOpen={modal_borrow3}
          toggle={() => {
            tog_borrow3();
          }}
          centered
        >
          <div className="modal-body">
            {account ?
              <Form>
                <div className="row mb-4">
                  <h6>{props.title}</h6>
                </div>
                <div className="row mb-4">
                  <Col sm={12}>
                    <Input
                      type="text"
                      className="form-control"
                      id="horizontal-password-Input"
                      placeholder="Amount"
                      onChange={(event) => { inputVal1 = Number(event.target.value) }}
                    />
                  </Col>
                </div>
                <div className="row mb-4">
                  <Col sm={12}>
                    <select className="form-select" placeholder="Commitment" onChange={handleBorrowChange3}>
                      <option hidden>Commitment</option>
                      <option value={"NONE"}>None</option>
                      <option value={"ONEMONTH"}>One Month</option>
                    </select>
                  </Col>
                </div>
                <div className="row mb-4">
                  <h6>Collateral</h6>
                </div>
                <div className="row mb-4">
                  <Col sm={12}>
                    <select className="form-select" onChange={handleCollateralChange3}>
                      <option hidden>Collateral market</option>
                      <option value={"USDT"}>USDT</option>
                      <option value={"USDC"}>USDC</option>
                      <option value={"BTC"}>BTC</option>
                      <option value={"BNB"}>BNB</option>
                    </select>
                  </Col>
                </div>
                <div className="row mb-4">
                  <Col sm={12}>
                    <Input
                      type="text"
                      className="form-control"
                      id="horizontal-password-Input"
                      placeholder="Amount"
                      onChange={(event) => { inputVal2 = Number(event.target.value) }}
                    />
                  </Col>
                </div>
                <div className="row mb-4">
                  <Col sm={6}>
                    <p>Borrow APR <strong>{BorrowInterestRates[commitBorrowPeriod3 || "NONE"] || '15%'}</strong></p>
                  </Col>
                  <Col sm={6}>
                    <p style={{ float: "right" }}>Collateral APY <strong>0%</strong></p>
                  </Col>
                </div>

                <div className="d-grid gap-2">
                  <Button
                    color="primary"
                    className="w-md"
                    disabled={commitBorrowPeriod3 === undefined}
                    onClick={handleBorrow}
                  >
                    Request Loan
                  </Button>
                </div>
              </Form>
              : <h2>Please connect your wallet</h2>}
          </div>
        </Modal>
      </>
    )
  }

  const BorrowData4 = (props) => {

    const [commitBorrowPeriod4, setCommitBorrowPeriod4] = useState();
    const [collateralMarket4, setCollateralMarket4] = useState();

    useEffect(() => {
      wrapper?.getLoanInstance().loanExt.on(EventMap.REQUEST_LOAN, onLoanRequested);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    });

    const handleBorrowChange4 = (e) => {
      setCommitBorrowPeriod4(e.target.value)
    }

    const handleCollateralChange4 = (e) => {
      setCollateralMarket4(e.target.value)
    }

    const handleBorrow = async () => {
      try {
        const approveTransactionHash = await wrapper?.getMockBep20Instance().approve(SymbolsMap[props.assetID], inputVal1, DecimalsMap[props.assetID]);
        console.log("Approve Transaction sent: ", approveTransactionHash);
        const _commitBorrowPeriod4: string | undefined =  commitBorrowPeriod4;
        const _collateralMarket4: string | undefined =  collateralMarket4;
        await wrapper?.getLoanInstance().loanRequest(SymbolsMap[props.assetID], CommitMap[_commitBorrowPeriod4], inputVal1, DecimalsMap[props.assetID],
          SymbolsMap[_collateralMarket4], inputVal2, DecimalsMap[_collateralMarket4]);
      } catch (err) {
        if (err instanceof Error) {
          toast.error(`${GetErrorText(String(err.message))}`, { position: toast.POSITION.BOTTOM_RIGHT, closeOnClick: true});
        } else {
          toast.error(`${GetErrorText(String(err))}`, { position: toast.POSITION.BOTTOM_RIGHT, closeOnClick: true});
        }
      }
    }

    const onLoanRequested = (data) => {
      let amount = BNtoNum(Number(data.loanAmount), DecimalsMap[data.market]);
      toast.success(`Requested amount: ${amount}`, { position: toast.POSITION.BOTTOM_RIGHT, closeOnClick: true});
    }

    return (
      <>
        <button
          type="button"
          className="btn btn-secondary btn-sm w-xs"
          onClick={() => {
            tog_borrow4();
          }}
        >
          Borrow
        </button>
        <Modal
          isOpen={modal_borrow4}
          toggle={() => {
            tog_borrow4();
          }}
          centered
        >
          <div className="modal-body">
            {account ?
              <Form>
                <div className="row mb-4">
                  <h6>{props.title}</h6>
                </div>
                <div className="row mb-4">
                  <Col sm={12}>
                    <Input
                      type="text"
                      className="form-control"
                      id="horizontal-password-Input"
                      placeholder="Amount"
                      onChange={(event) => { inputVal1 = Number(event.target.value) }}
                    />
                  </Col>
                </div>
                <div className="row mb-4">
                  <Col sm={12}>
                    <select className="form-select" placeholder="Commitment" onChange={handleBorrowChange4}>
                      <option hidden>Commitment</option>
                      <option value={"NONE"}>None</option>
                      <option value={"ONEMONTH"}>One Month</option>
                    </select>
                  </Col>
                </div>
                <div className="row mb-4">
                  <h6>Collateral</h6>
                </div>
                <div className="row mb-4">
                  <Col sm={12}>
                    <select className="form-select" onChange={handleCollateralChange4}>
                      <option hidden>Collateral market</option>
                      <option value={"USDT"}>USDT</option>
                      <option value={"USDC"}>USDC</option>
                      <option value={"BTC"}>BTC</option>
                      <option value={"BNB"}>BNB</option>
                    </select>
                  </Col>
                </div>
                <div className="row mb-4">
                  <Col sm={12}>
                    <Input
                      type="text"
                      className="form-control"
                      id="horizontal-password-Input"
                      placeholder="Amount"
                      onChange={(event) => { inputVal2 = Number(event.target.value)}}
                    />
                  </Col>
                </div>
                <div className="row mb-4">
                  <Col sm={6}>
                    <p>Borrow APR <strong>{BorrowInterestRates[commitBorrowPeriod4 || "NONE"] || '15%'}</strong></p>
                  </Col>
                  <Col sm={6}>
                    <p style={{ float: "right" }}>Collateral APY <strong>0%</strong></p>
                  </Col>
                </div>

                <div className="d-grid gap-2">
                  <Button
                    color="primary"
                    className="w-md"
                    disabled={commitBorrowPeriod4 === undefined}
                    onClick={handleBorrow}
                  >
                    Request Loan
                  </Button>
                </div>
              </Form>
              : <h2>Please connect your wallet</h2>}
          </div>
        </Modal>
      </>
    )
  }

  const passbookActive = (e) => {
    if (e.target.value === "ActiveDeposit") {
      setPassbookStatus(true)
    } else {
      setPassbookStatus(false)
    }
  }

  const PassbookTBody = (props) => {
    const assets = props.assets;
    if (props.isloading && assets.length === 0) {
      return (<tr align="center"><td colSpan={4}><Spinner>Loading...</Spinner></td></tr>)
    } else if (assets.length > 0) {
      return (
        <>
          {assets.map((asset, key) => (
            <tr key={key}>
              <th scope="row">
                <div className="d-flex align-items-center">
                  <div className="avatar-xs me-3">
                    <span
                      className={
                        "avatar-title rounded-circle bg-soft bg-" +
                        asset.color +
                        " text-" +
                        asset.color +
                        " font-size-18"
                      }
                    >
                      <i className={CoinClassNames[EventMap[asset.loanMarket.toUpperCase()]]} />
                    </span>
                  </div>
                  <span>{EventMap[asset.loanMarket.toUpperCase()]}</span>
                </div>
              </th>
              <td>
                <div className="text-muted">{BNtoNum(Number(asset.loanAmount),DecimalsMap[asset.market])}</div>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <div className="avatar-xs me-3">
                    <span
                      className={
                        "avatar-title rounded-circle bg-soft bg-" +
                        asset.color +
                        " text-" +
                        asset.color +
                        " font-size-18"
                      }
                    >
                      <i className={CoinClassNames[EventMap[asset.collateralMarket.toUpperCase()]]} />
                    </span>
                  </div>
                  <span>{EventMap[asset.collateralMarket.toUpperCase()]}</span>
                </div>
              </td>
              <td>
                {/* <h5 className="font-size-14 mb-1">
                  {asset.investRate}
                </h5> */}
                <div className="text-muted">
                  {BNtoNum(Number(asset.collateralAmount), DecimalsMap[asset.market])}
                </div>
              </td>
              <td>
                {/* <h5 className="font-size-14 mb-1">
                  {asset.loansRate}
                </h5> */}
                <div className="text-muted">
                  {Number(asset.cdr).toFixed(3)}
                </div>
              </td>
            </tr>
          ))}
        </>
      );
    } else {
      return (<><tr align="center"><td colSpan={5}>No Records found.</td></tr></>);
    }
  }

  const DashboardTBody = (props) => {
    if (props.isloading) {
      return (<tr align="center"><td colSpan={6}><Spinner>Loading...</Spinner></td></tr>)
    } else {
      return (<>
        <tr key={0}>
          <th scope="row">
            <div className="d-flex align-items-center">
              <div className="avatar-xs me-3">
                <span
                  className={
                    "avatar-title rounded-circle bg-soft bg-" +
                    "info" +
                    " text-" +
                    "info" +
                    " font-size-18"
                  }
                >
                  <i className={"mdi mdi-litecoin"} />
                </span>
              </div>
              <span>{"USDT"}</span>
            </div>
          </th>
          <td>
            <div className="text-muted">{DepositInterestRates[depositInterestChange]}</div>
          </td>
          <td>
            <div className="text-muted">
              {BorrowInterestRates[borrowInterestChange]}
            </div>
          </td>
          <td style={{ width: "120px" }}>
            <DepositData1 />
          </td>
          <td style={{ width: "120px" }}>
            <BorrowData1 assetID={"USDT"} title={'USDT'} />
          </td>
        </tr>
        <tr key={1}>
          <th scope="row">
            <div className="d-flex align-items-center">
              <div className="avatar-xs me-3">
                <span
                  className={
                    "avatar-title rounded-circle bg-soft bg-" +
                    "primary" +
                    " text-" +
                    "primary" +
                    " font-size-18"
                  }
                >
                  <i className={"mdi mdi-ethereum"} />
                </span>
              </div>
              <span>{"USDC"}</span>
            </div>
          </th>
          <td>
            <div className="text-muted">{DepositInterestRates[depositInterestChange]}</div>
          </td>
          <td>
            <div className="text-muted">
              {BorrowInterestRates[borrowInterestChange]}
            </div>
          </td>
          <td style={{ width: "120px" }}>
            <DepositData2 />
          </td>
          <td style={{ width: "120px" }}>
            <BorrowData2 assetID={"USDC"} title={'USDC'} />
          </td>
        </tr>
        <tr key={2}>
          <th scope="row">
            <div className="d-flex align-items-center">
              <div className="avatar-xs me-3">
                <span
                  className={
                    "avatar-title rounded-circle bg-soft bg-" +
                    "warning" +
                    " text-" +
                    "warning" +
                    " font-size-18"
                  }
                >
                  <i className={"mdi mdi-bitcoin"} />
                </span>
              </div>
              <span>{"BTC"}</span>
            </div>
          </th>
          <td>
            <div className="text-muted">{DepositInterestRates[depositInterestChange]}</div>
          </td>
          <td>
            <div className="text-muted">
              {BorrowInterestRates[borrowInterestChange]}
            </div>
          </td>
          <td style={{ width: "120px" }}>
            <DepositData3 />
          </td>
          <td style={{ width: "120px" }}>
            <BorrowData3 assetID={"BTC"} title={'BTC'} />
          </td>
        </tr>
        <tr key={3}>
          <th scope="row">
            <div className="d-flex align-items-center">
              <div className="avatar-xs me-3">
                <span
                  className={
                    "avatar-title rounded-circle bg-soft bg-" +
                    "warning" +
                    " text-" +
                    "warning" +
                    " font-size-18"
                  }
                >
                  <i className={"mdi mdi-drag-variant"} />
                </span>
              </div>
              <span>{"BNB"}</span>
            </div>
          </th>
          <td>
            <div className="text-muted">{DepositInterestRates[depositInterestChange]}</div>
          </td>
          <td>
            <div className="text-muted">
              {BorrowInterestRates[borrowInterestChange]}
            </div>
          </td>
          <td style={{ width: "120px" }}>
            <DepositData4 />
          </td>
          <td style={{ width: "120px" }}>
            <BorrowData4 assetID={"BNB"} title={'BNB'} />
          </td>
        </tr>
      </>)
    }
  }

  useEffect(() => {
    wrapper?.getDepositInstance().deposit.on(EventMap.DEPOSIT_ADDED, depositAdded);
    wrapper?.getDepositInstance().deposit.on(EventMap.WITHDRAW_DEPOSIT, WithdrawalDeposit);

    wrapper?.getLoanInstance().loan.on(EventMap.ADD_COLLATERAL, onCollateralAdded);
    // wrapper?.getLoanInstance().loan.on(EventMap.WITHDRAW_COLLATERAL, onCollateralReleased);

    wrapper?.getLoanInstance().loan.on(EventMap.WITHDRAW_LOAN, onLoanWithdrawal);
    wrapper?.getLoanInstance().loanExt.on(EventMap.REPAY_LOAN, onLoanRepay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [depositRequestSel, setDepositRequestSel] = useState();
  const [withdrawDepositSel, setWithdrawDepositSel] = useState();
  const [depositRequestVal, setDepositRequestVal] = useState();
  const [withdrawDepositVal, setWithdrawDepositVal] = useState();

  const handleDepositRequestSelect = (e) => {
    setDepositRequestSel(e.target.value)
  }
  const handleWithdrawDepositSelect = (e) => {
    setWithdrawDepositSel(e.target.value)
  }

  const handleDepositRequestTime = (e) => {
    setDepositRequestVal(e.target.value)
  }
  const handleWithdrawDepositTime = (e) => {
    setWithdrawDepositVal(e.target.value)
  }

  const handleDepositRequest = async () => {
    try {
      const _depositRequestSel: string | undefined =  depositRequestSel;
      const _depositRequestVal: string | undefined =  depositRequestVal;
      await wrapper?.getDepositInstance().depositRequest(SymbolsMap[_depositRequestSel.toUpperCase()], CommitMap[_depositRequestVal], inputVal1, DecimalsMap[_depositRequestSel.toUpperCase()]);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(`${GetErrorText(String(err.message))}`, { position: toast.POSITION.BOTTOM_RIGHT, closeOnClick: true});
      } else {
        toast.error(`${GetErrorText(String(err))}`, { position: toast.POSITION.BOTTOM_RIGHT, closeOnClick: true});
      }
    }
  }

  const depositAdded = (data) => {
    let amount = BNtoNum(Number(data.amount), DecimalsMap[data.market])
    toast.success(`Deposit Added: ${amount}`, { position: toast.POSITION.BOTTOM_RIGHT, closeOnClick: true});
  }

  const handleWithdrawDeposit = async () => {
    try {
      const _withdrawDepositSel: string | undefined =  withdrawDepositSel;
      const _withdrawDepositVal: string | undefined =  withdrawDepositVal;
      await wrapper?.getDepositInstance().withdrawDeposit(SymbolsMap[_withdrawDepositSel.toUpperCase()], CommitMap[_withdrawDepositVal], inputVal1, DecimalsMap[_withdrawDepositSel.toUpperCase()]);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(`${GetErrorText(String(err.message))}`, { position: toast.POSITION.BOTTOM_RIGHT, closeOnClick: true});
      } else {
        toast.error(`${GetErrorText(String(err))}`, { position: toast.POSITION.BOTTOM_RIGHT, closeOnClick: true});
      }
    }
  }

  const WithdrawalDeposit = (data) => {
    let amount = BNtoNum(Number(data.amount), DecimalsMap[data.market])
    toast.success(`Deposit Withdrawn: ${amount}`, { position: toast.POSITION.BOTTOM_RIGHT, closeOnClick: true});
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Hashstack Finance</title>
        </MetaTags>
        <Container fluid>
          <h5>OPEN PROTOCOL</h5>
          <br />

          <Row>
            <Col xl="4">
              <Card>
                {customActiveTab === '2' ?

                  passbookStatus === false ?
                    (
                      /* -------------------------------------- REPAY ----------------------------- */
                      <CardBody>
                        <form>
                          <div className="mb-4 me-3">
                            <h4 className="card-title mb-4">Repay</h4>
                          </div>

                          {/* ----------------------- Loan Actions ----------------------- */}

                          <div className="mb-4 ">
                            <Label>Loan Actions</Label>
                            <Row>
                              <Col sm="6">
                                <div className="mb-3">
                                  <label className="card-radio-label mb-2">
                                    <Button
                                      className="btn-block btn-sm"
                                      color="light"
                                      outline
                                      onClick={() => {
                                        tog_repay_loan();
                                      }}
                                    >
                                      Repay Loan
                                    </Button>
                                    <Modal
                                      isOpen={modal_repay_loan}
                                      toggle={() => {
                                        tog_repay_loan();
                                      }}
                                      centered
                                    >
                                      <div className="modal-body">
                                        <Form>
                                          <div className="row mb-4">
                                            <Col sm={12}>
                                              <select className="form-select" onChange={handleLoanOptionChange}>
                                                <option hidden>Loan Market</option>
                                                {/* <option value={"BTC"}>BTC</option>
                                                <option value={"USDC"}>USDC</option> */}
                                                {activeLoansData.map((asset, key) => {
                                                  return <option key={key} value={EventMap[asset.loanMarket.toUpperCase()]}>{EventMap[asset.loanMarket.toUpperCase()]}</option>
                                                })}
                                              </select>
                                            </Col>
                                          </div>
                                          <div className="row mb-4">
                                            <Col sm={12}>
                                              <Input
                                                type="text"
                                                className="form-control"
                                                id="horizontal-password-Input"
                                                placeholder="Amount"
                                                onChange={(event) => { inputVal1 = Number(event.target.value) }}
                                              />
                                            </Col>
                                          </div>

                                          <div className="d-grid gap-2">
                                            <Button
                                              color="primary"
                                              className="w-md"
                                              onClick={handleRepay}
                                            >
                                              Repay
                                            </Button>
                                          </div>
                                        </Form>
                                      </div>
                                    </Modal>
                                  </label>
                                </div>
                              </Col>

                              <Col sm="6">
                                <div className="mb-3">
                                  <Label className="card-radio-label mb-2">
                                    <Button
                                      className="btn-block btn-sm"
                                      color="light"
                                      outline
                                      onClick={() => {
                                        tog_withdraw_loan();
                                      }}
                                    >
                                      Withdraw Loan
                                    </Button>
                                    <Modal
                                      isOpen={modal_withdraw_loan}
                                      toggle={() => {
                                        tog_withdraw_loan();
                                      }}
                                      centered
                                    >
                                      <div className="modal-body">
                                        <Form>
                                          <div className="row mb-4">
                                            <Col sm={12}>
                                              <select className="form-select" onChange={handleLoanOptionChange}>
                                                <option hidden>Loan market</option>
                                                {activeLoansData.map((asset, key) => {
                                                  return <option key={key} value={EventMap[asset.loanMarket.toUpperCase()]}>{EventMap[asset.loanMarket.toUpperCase()]}</option>
                                                })}
                                              </select>
                                            </Col>
                                          </div>
                                          <div className="row mb-4">
                                            <Col sm={12}>
                                              <Input
                                                type="text"
                                                className="form-control"
                                                id="horizontal-password-Input"
                                                placeholder="Amount"
                                                onChange={(event) => { inputVal1 = Number(event.target.value) }}
                                              />
                                            </Col>
                                          </div>

                                          <div className="d-grid gap-2">
                                            <Button
                                              color="primary"
                                              className="w-md"
                                              onClick={handleWithdrawLoan}
                                            >
                                              Withdraw Loan
                                            </Button>
                                          </div>
                                        </Form>
                                      </div>
                                    </Modal>
                                  </Label>
                                </div>
                              </Col>
                            </Row>
                          </div>

                          {/* --------------------------- Swap -------------------------- */}

                          <div className="mb-4">
                            <Label>Swap</Label>
                            <Row>
                              <Col sm="6">
                                <Label className="card-radio-label mb-3">
                                  <Button
                                    className="btn-block btn-sm"
                                    color="light"
                                    outline
                                    onClick={() => {
                                      tog_swap_loan();
                                    }}
                                  >
                                    Swap Loan
                                  </Button>
                                  <Modal
                                    isOpen={modal_swap_loan}
                                    toggle={() => {
                                      tog_swap_loan();
                                    }}
                                    centered
                                  >
                                    <div className="modal-body">
                                      <Form>
                                        <div className="row mb-4">
                                          <Col sm={12}>
                                            <select className="form-select" onChange={handleLoanOptionChange}>
                                              <option hidden>Loan Market</option>
                                              {activeLoansData.map((asset, key) => {
                                                  return <option key={key} value={EventMap[asset.loanMarket.toUpperCase()]}>{EventMap[asset.loanMarket.toUpperCase()]}</option>
                                              })}
                                            </select>
                                          </Col>
                                        </div>
                                        <div className="row mb-4">
                                          <Col sm={12}>
                                            <select className="form-select" onChange={handleSwapOptionChange}>
                                              <option hidden>Swap Market</option>
                                              <option value={"SXP"}>SXP</option>
                                              <option value={"CAKE"}>CAKE</option>
                                            </select>
                                          </Col>
                                        </div>

                                        <div className="d-grid gap-2">
                                          <Button
                                            color="primary"
                                            className="w-md"
                                            onClick={handleSwap}
                                          >
                                            Swap Loan
                                          </Button>
                                        </div>
                                      </Form>
                                    </div>
                                  </Modal>
                                </Label>
                              </Col>

                              <Col sm="6">
                                <Label className="card-radio-label mb-3">
                                  <Button
                                    className="btn-block btn-sm"
                                    color="light"
                                    outline
                                    onClick={() => {
                                      tog_swap_to_loan();
                                    }}
                                  >
                                    Swap to Loan
                                  </Button>
                                  <Modal
                                    isOpen={modal_swap_to_loan}
                                    toggle={() => {
                                      tog_swap_to_loan();
                                    }}
                                    centered
                                  >
                                    <div className="modal-body">
                                      <Form>
                                        <div className="row mb-4">
                                          <Col sm={12}>
                                            <select className="form-select" onChange={handleSwapOptionChange}>
                                              <option hidden>Select Market to Swap</option>
                                              <option value={"SXP"}>SXP</option>
                                              <option value={"CAKE"}>CAKE</option>
                                            </select>
                                          </Col>
                                        </div>

                                        <div className="row mb-4">
                                          <Col sm={12}>
                                            <select className="form-select" onChange={handleLoanOptionChange}>
                                              <option hidden>Select Loan</option>
                                              {activeLoansData.map((asset, key) => {
                                                  return <option key={key} value={EventMap[asset.loanMarket.toUpperCase()]}>{EventMap[asset.loanMarket.toUpperCase()]}</option>
                                              })}
                                            </select>
                                          </Col>
                                        </div>

                                        <div className="d-grid gap-2">
                                          <Button
                                            color="primary"
                                            className="w-md"
                                            onClick={handleSwapToLoan}
                                          >
                                            Swap to Loan
                                          </Button>
                                        </div>
                                      </Form>
                                    </div>
                                  </Modal>
                                </Label>
                              </Col>

                            </Row>
                          </div>

                          {/* ------------------- Collateral actions ------------------- */}

                          <div className="mb-4">
                            <Label>Collateral Actions</Label>
                            <Row>
                              <Col sm="6">
                                <Label className="card-radio-label mb-3">
                                  <Button
                                    className="btn-block  btn-sm"
                                    color="light"
                                    outline
                                    onClick={() => {
                                      tog_add_collateral();
                                    }}
                                  >
                                    Add Collateral
                                  </Button>
                                  <Modal
                                    isOpen={modal_add_collateral}
                                    toggle={() => {
                                      tog_add_collateral();
                                    }}
                                    centered
                                  >
                                    <div className="modal-body">
                                      <Form>
                                        <div className="row mb-4">
                                          <Col sm={12}>
                                            <select className="form-select" onChange={handleLoanOptionChange}>
                                              <option hidden>Loan Market</option>
                                              {activeLoansData.map((asset, key) => {
                                                  return <option key={key} value={EventMap[asset.loanMarket.toUpperCase()]}>{EventMap[asset.loanMarket.toUpperCase()]}</option>
                                              })}
                                            </select>
                                          </Col>
                                        </div>
                                        <div className="row mb-4">
                                          <Col sm={12}>
                                            <select className="form-select" onChange={handleCollateralOptionChange}>
                                              <option hidden>Collateral Market</option>
                                              {activeLoansData.map((asset, key) => {
                                                  return <option key={key} value={EventMap[asset.collateralMarket.toUpperCase()]}>{EventMap[asset.collateralMarket.toUpperCase()]}</option>
                                              })}
                                            </select>
                                          </Col>
                                        </div>
                                        <div className="row mb-4">
                                          <Col sm={12}>
                                            <Input
                                              type="text"
                                              className="form-control"
                                              id="horizontal-password-Input"
                                              placeholder="Amount"
                                              onChange={(event) => { inputVal1 = Number(event.target.value) }}
                                            />
                                          </Col>
                                        </div>

                                        <div className="d-grid gap-2">
                                          <Button
                                            color="primary"
                                            className="w-md"
                                            onClick={handleCollateral}
                                          >
                                            Add Collateral
                                          </Button>
                                        </div>
                                      </Form>
                                    </div>
                                  </Modal>
                                </Label>
                              </Col>

                              <Col sm="6">
                                <Label className="card-radio-label mb-3">
                                  <Button
                                    className="btn-block btn-sm"
                                    color="light"
                                    outline
                                    onClick={() => {
                                      tog_withdraw_collateral();
                                    }}
                                  >
                                    Withdraw Collateral
                                  </Button>
                                  <Modal
                                    isOpen={modal_withdraw_collateral}
                                    toggle={() => {
                                      tog_withdraw_collateral();
                                    }}
                                    centered
                                  >
                                    <div className="modal-body">
                                      <Form>
                                        <div className="row mb-4">
                                          <Col sm={12}>
                                            <select className="form-select" onChange={handleLoanOptionChange}>
                                              <option hidden>Loan Market</option>
                                              {activeLoansData.map((asset, key) => {
                                                  return <option key={key} value={EventMap[asset.loanMarket.toUpperCase()]}>{EventMap[asset.loanMarket.toUpperCase()]}</option>
                                              })}
                                            </select>
                                          </Col>
                                        </div>
                                        <div className="row mb-4">
                                          <Col sm={12}>
                                            <span>Collateral Market</span>
                                          </Col>
                                        </div>

                                        <div className="d-grid gap-2">
                                          <Button
                                            color="primary"
                                            className="w-md"
                                            onClick={handleWithdrawCollateral}
                                          >
                                            Withdraw Collateral
                                          </Button>
                                        </div>
                                      </Form>
                                    </div>
                                  </Modal>
                                </Label>
                              </Col>
                            </Row>
                          </div>

                        </form>
                      </CardBody>
                    )

                    :

                    (
                      /* -------------------------------------- Active Deposit ----------------------------- */
                      <CardBody>
                        <form>
                          <div className="mb-4 ">
                            <Row>
                              <Col sm="6">
                                <div className="mb-3">
                                  <label className="card-radio-label mb-2">
                                    <Button
                                      className="btn-block btn-sm"
                                      color="light"
                                      outline
                                      onClick={() => {
                                        tog_add_active_deposit();
                                      }}
                                    >
                                      Add to Deposit
                                    </Button>
                                    <Modal
                                      isOpen={modal_add_active_deposit}
                                      toggle={() => {
                                        tog_add_active_deposit();
                                      }}
                                      centered
                                    >
                                      <div className="modal-body">
                                        <Form>
                                          <div className="row mb-4">
                                            <Col sm={12}>
                                              <select className="form-select" onChange={handleDepositRequestSelect}>
                                                <option hidden>Select Market</option>
                                                {activeDepositsData.map((asset, key) => {
                                                  return <option key={key} value={EventMap[asset.market.toUpperCase()]}>{EventMap[asset.market.toUpperCase()]}</option>
                                                })}
                                              </select>
                                            </Col>
                                          </div>
                                          <div className="row mb-4">
                                            <Col sm={12}>
                                              <select className="form-select" onChange={handleDepositRequestTime}>
                                                <option hidden>Minimum Commitment Period</option>
                                                {activeDepositsData.filter((asset) => {
                                                  return (EventMap[asset.market.toUpperCase()] === depositRequestSel)
                                                }).map((asset, key) => {
                                                   return <option key={key} value={asset.commitment}>{EventMap[asset.commitment]}</option>
                                                })}
                                              </select>
                                            </Col>
                                          </div>
                                          <div className="row mb-4">
                                            <Col sm={12}>
                                              <Input
                                                type="text"
                                                className="form-control"
                                                id="horizontal-password-Input"
                                                placeholder="Amount"
                                                onChange={(event) => { inputVal1 = Number(event.target.value) }}
                                              />
                                            </Col>
                                          </div>

                                          <div className="d-grid gap-2">
                                            <Button
                                              // type="submit"
                                              color="primary"
                                              className="w-md"
                                              onClick={handleDepositRequest}
                                            >
                                              Add to Deposit
                                            </Button>
                                          </div>
                                        </Form>
                                      </div>
                                    </Modal>
                                  </label>
                                </div>
                              </Col>

                              <Col sm="6">
                                <div className="mb-3">
                                  <Label className="card-radio-label mb-2">
                                    <Button
                                      className="btn-block btn-sm"
                                      color="light"
                                      outline
                                      onClick={() => {
                                        tog_withdraw_active_deposit();
                                      }}
                                    >
                                      Withdraw Deposit
                                    </Button>
                                    <Modal
                                      isOpen={modal_withdraw_active_deposit}
                                      toggle={() => {
                                        tog_withdraw_active_deposit();
                                      }}
                                      centered
                                    >
                                      <div className="modal-body">
                                        <Form>
                                          <div className="row mb-4">
                                            <Col sm={12}>
                                              <select className="form-select" onChange={handleWithdrawDepositSelect}>
                                                <option hidden>Select Market</option>
                                                {activeDepositsData.map((asset, key) => {
                                                  return <option key={key} value={EventMap[asset.market.toUpperCase()]}>{EventMap[asset.market.toUpperCase()]}</option>
                                                })}
                                              </select>
                                            </Col>
                                          </div>
                                          <div className="row mb-4">
                                            <Col sm={12}>
                                              <select className="form-select" onChange={handleWithdrawDepositTime}>
                                                <option hidden>Minimum Commitment Period</option>
                                                {activeDepositsData.filter((asset) => {
                                                  return (EventMap[asset.market.toUpperCase()] === withdrawDepositSel)
                                                }).map((asset, key) => {
                                                  return <option key={key} value={asset.commitment}>{EventMap[asset.commitment]}</option>
                                                })}
                                              </select>
                                            </Col>
                                          </div>
                                          <div className="row mb-4">
                                            <Col sm={12}>
                                              <Input
                                                type="text"
                                                className="form-control"
                                                id="horizontal-password-Input"
                                                placeholder="Amount"
                                                onChange={(event) => { inputVal1 = Number(event.target.value) }}
                                              />
                                            </Col>
                                          </div>

                                          <div className="d-grid gap-2">
                                            <Button
                                              // type="submit"
                                              color="primary"
                                              className="w-md"
                                              onClick={handleWithdrawDeposit}
                                            >
                                              Withdraw Deposit
                                            </Button>
                                          </div>
                                        </Form>
                                      </div>
                                    </Modal>
                                  </Label>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </form>
                      </CardBody>
                    )

                  :

                  /* -------------------------------------- DEPOSIT ----------------------------- */

                  <CardBody>
                    <Dropdown
                      isOpen={isMenu}
                      toggle={toggleMenu}
                      className="float-end ms-2"
                    >
                      <DropdownToggle tag="a" className="text-muted">
                        <i className="mdi mdi-dots-horizontal font-size-18" />
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem href="#">Deposit</DropdownItem>
                        <DropdownItem href="#">Borrow</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>

                    <div className="mb-4 me-3">
                      <h4 className="card-title mb-4">How Deposits work</h4>
                    </div>

                    <div>
                      <ul className="verti-timeline list-unstyled">
                        <li className="event-list">
                          <div className="event-timeline-dot">
                            <i className="bx bx-right-arrow-circle" />
                          </div>
                          <div className="d-flex">
                            <div className="me-3">
                              <i className="bx bx-user-plus h2 text-primary" />
                            </div>
                            <div className="flex-grow-1">
                              <div>
                                <h5 className="font-size-14">Register Account</h5>
                                <p className="text-muted">
                                  New common language will be more simple and
                                  regular than the existing.
                                </p>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="event-list">
                          <div className="event-timeline-dot">
                            <i className="bx bx-right-arrow-circle" />
                          </div>
                          <div className="d-flex">
                            <div className="me-3">
                              <i className="bx bx-copy-alt h2 text-primary" />
                            </div>
                            <div className="flex-grow-1">
                              <div>
                                <h5 className="font-size-14">Select Deposit</h5>
                                <p className="text-muted">
                                  To achieve this, it would be necessary to have
                                  uniform grammar.
                                </p>
                              </div>
                            </div>
                          </div>
                        </li>

                        <li className="event-list">
                          <div className="event-timeline-dot">
                            <i className="bx bx-right-arrow-circle" />
                          </div>
                          <div className="d-flex">
                            <div className="me-3">
                              <i className="bx bx-cloud-download h2 text-primary" />
                            </div>
                            <div className="flex-grow-1">
                              <div>
                                <h5 className="font-size-14">Get Earnings</h5>
                                <p className="text-muted">
                                  New common language will be more simple and
                                  regular than the existing.
                                </p>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </CardBody>
                }

              </Card>
            </Col>

            <Col xl="8">
              <Card>
                <CardBody>
                  <Nav tabs className="nav-tabs-custom">
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: customActiveTab === "1",
                        })}
                        onClick={() => {
                          toggleCustom("1");
                        }}
                      >
                        <span className="d-none d-sm-block">Dashboard</span>
                      </NavLink>
                    </NavItem>
                    {account ? (
                      <><NavItem>
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: customActiveTab === "2",
                          })}
                          onClick={() => {
                            toggleCustom("2");
                          }}
                        >
                          <span className="d-none d-sm-block">Passbook</span>
                        </NavLink>
                      </NavItem>
                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              active: customActiveTab === "3",
                            })}
                            onClick={() => {
                              toggleCustom("3");
                            }}
                          >
                            <span className="d-none d-sm-block">Liquidation</span>
                          </NavLink>
                        </NavItem></>) : null}
                  </Nav>

                  <TabContent
                    activeTab={customActiveTab}
                    className="p-1"
                  >

                    {/* ------------------------------------- DASHBOARD ----------------------------- */}

                    <TabPane tabId="1">
                      <div className="table-responsive" style={{ paddingTop: "12px" }}>
                        <Table className="table table-nowrap align-middle mb-0">
                          <thead>
                            <tr style={{ borderStyle: "hidden" }}>
                              <th scope="col">Markets</th>
                              <th scope="col">Savings Interest</th>
                              <th scope="col">Borrow Interest</th>
                              <th scope="col">Deposit</th>
                              <th scope="col" colSpan={2}>Borrow</th>
                            </tr>
                            <tr>
                              <th scope="col"></th>
                              <th scope="col">
                                <select className="form-select form-select-sm" onChange={handleDepositInterestChange}>
                                  <option hidden>Commitment</option>
                                  <option value={"NONE"}>None</option>
                                  <option value={"TWOWEEKS"}>Two Weeks</option>
                                  <option value={"ONEMONTH"}>One Month</option>
                                  <option value={"THREEMONTHS"}>Three Month</option>
                                </select>
                              </th>
                              <th scope="col">
                                <select className="form-select form-select-sm" onChange={handleBorrowInterestChange}>
                                  <option hidden>Commitment</option>
                                  <option value={"NONE"}>None</option>
                                  <option value={"ONEMONTH"}>One Month</option>
                                </select>
                              </th>
                              <th scope="col"></th>
                              <th scope="col"></th>
                              <th scope="col"></th>
                            </tr>
                          </thead>
                          <tbody>
                            <DashboardTBody isloading={isLoading}></DashboardTBody>
                          </tbody>
                        </Table>
                      </div>
                    </TabPane>

                    {/* -------------------------------------- PASSBOOK ----------------------------- */}

                    <TabPane tabId="2">
                      <div className="row justify-content-end" style={{ paddingTop: "12px" }}>
                        <Col sm={3}>
                          <select className="form-select form-select-sm" onChange={(e) => passbookActive(e)}>
                            <option value={"ActiveLoan"}>Active Loans</option>
                            <option value={"ActiveDeposit"}>Active Deposits</option>
                            {/* <option value={"InactiveLoan"}>Inactive loans</option>
                            <option value={"InactiveDeposit"}>Inactive deposits</option> */}
                          </select>
                        </Col>
                      </div>
                      {passbookStatus === false ?

                        // Active Loan
                        <div className="table-responsive">
                          <Table className="table table-nowrap align-middle mb-0">
                            <thead>
                              <tr>
                                <th scope="col">Loan Market</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Collateral Market</th>
                                <th scope="col">Amount</th>
                                <th scope="col" colSpan={2}>Interest</th>
                              </tr>
                            </thead>

                            <tbody>
                              <PassbookTBody isloading={isLoading} assets={activeLoansData}></PassbookTBody>
                            </tbody>
                          </Table>
                        </div>

                        :

                        // Active Deposits
                        <div className="table-responsive">
                          <Table className="table table-nowrap align-middle mb-0">
                            <thead>
                              <tr>
                                <th scope="col">Deposit Market</th>
                                <th scope="col">Commitment</th>
                                <th scope="col">Amount</th>
                                <th scope="col" colSpan={2}>Interest Earned</th>
                              </tr>
                            </thead>
                            <tbody>
                              {activeDepositsData.length > 0 ? activeDepositsData.map((asset, key) => (
                                <tr key={key}>
                                  <th scope="row">
                                    <div className="d-flex align-items-center">
                                      <div className="avatar-xs me-3">
                                        <span
                                          className={
                                            "avatar-title rounded-circle bg-soft bg-" +
                                            asset.color +
                                            " text-" +
                                            asset.color +
                                            " font-size-18"
                                          }
                                        >
                                          <i className={CoinClassNames[EventMap[asset.market.toUpperCase()]]} />
                                        </span>
                                      </div>
                                      <span>{EventMap[asset.market.toUpperCase()]}</span>
                                    </div>
                                  </th>
                                  <td>
                                    <div className="text-muted">{EventMap[asset.commitment]}</div>
                                  </td>
                                  <td>
                                    <div className="text-muted">{BNtoNum(Number(asset.amount), DecimalsMap[asset.market])}</div>
                                  </td>
                                  <td>
                                    <div className="text-muted">{Number(asset.acquiredYield).toFixed(3)}</div>
                                  </td> 
                                </tr>
                              )) : <tr align="center"><td colSpan={5}>No Records Found.</td></tr>}
                            </tbody>
                          </Table>
                        </div>
                      }
                    </TabPane>

                    {/* -------------------------------------- LIQUIDATION ----------------------------- */}

                    <TabPane tabId="3">
                      <div className="row justify-content-end" style={{ paddingTop: "12px" }}>
                        <p>This section is under construction. Check again in a few days</p>
                      </div>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container >
      </div >
    </React.Fragment >
  );
};

export default HashstackCrypto;