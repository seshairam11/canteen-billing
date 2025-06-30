import React, { useEffect, useRef, useState } from 'react'
import { OPValidations } from '../CommonOP/OPValidations';
import { OPLoader } from '../ComponentOP/OPLoader';
import { OPGroupButton } from '../ComponentOP/OPGroupButton';
import { OPButton } from '../ComponentOP/OPButton';
import { OPLocalSearchBar } from '../ComponentOP/OPLocalSearchBar';
import { OPTextBox } from '../ComponentOP/OPTextBox';
import { OPVerticalTable } from '../ComponentOP/OPVerticalTable';
import { io, Socket } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import useFetch from '../ApiOP/useFetch';
import { useNavigate, useParams } from 'react-router-dom';
import { setlogininfo } from '../brewStore/AppState';
import { OPLink } from '../ComponentOP/OPLink';

export const OPUserEntry = () => {
    const [startInit, setStartInit] = useState(false);
    const [startRender, setStartRender] = useState(false);
    const [startLoader, setStartLoader] = useState(true);
    const [sideBar, setSideBar] = useState(false);
    const [addOrder, setAddOrder] = useState(false);
    const [rerender, setRerender] = useState(false);

    const ctlAttribute = useRef([]);
    const ctlBench = useRef({});
    const tbl_menu = useRef([])
    const responce_data = useRef([]);

    const socketUrl = `http://${process.env.REACT_APP_IP_ADDRESS}:8000`
    const socketRef = useRef(null);
    const validate = OPValidations();
    const getAppStoreData = useSelector((state) => state.appstate.login_info);
    const [isAuthenticate, setIsAuthenticate] = useState(!getAppStoreData.isloggedin)
    const { responseData, isLoadingApi, apiKey, fetchError, serverRequest } = useFetch();
    const dispatchappStore = useDispatch();
    const navigate = useNavigate();

    function initControl() {
        let ctlArray = [
            {
                /*txt: Menu : 0*/
                arrayindex: 0,
                csstheme: {
                    labletext: "Menu",
                    classname: "form-control",
                    id: "txt_test",
                    length: 50,
                    readonly: false,
                    hinttext: "Enter your Order",
                },
                inputvalue: "",
                tooltip: {
                    place: "right",
                    classname: "tooltip-react",
                    isfocus: "",
                    errorshow: "",
                    isvalidation: false,
                },
                validate: {
                    mandatory: true,
                    datatype: "searchBox",
                },
                error: {
                    errorshow: false,
                    errormsg: "The field is mandatory",
                },
                dropdownlist: [],
            },
            {
                /*txt: Quantity : 1*/
                arrayindex: 1,
                csstheme: {
                    labletext: "Qty",
                    classname: "form-control",
                    id: "num_qty",
                    length: 2,
                    readonly: false,
                    hinttext: "Enter your Quantity",
                },
                inputvalue: "",
                tooltip: {
                    place: "bottom",
                    classname: "tooltip-react",
                    isfocus: "",
                    errorshow: "",
                    isvalidation: false,
                },
                validate: {
                    mandatory: true,
                    datatype: "numeric",
                },
                error: {
                    errorshow: false,
                    errormsg: "The field is mandatory",
                },
            },
            {
                /*btn:cross : 2*/
                arrayindex: 2,
                csstheme: {
                    labletext: "",
                    classname: "btn-close",
                    id: "btn_crosssearch",
                    icon: "ti ti-x",
                },
            },
            {
                /*btn:cancel_delete : 3*/
                arrayindex: 3,
                csstheme: {
                    labletext: "cancel",
                    classname: "btn btn-light me-2",
                    id: "btn_cancel_search",
                },
            },
            {
                /*btn:confirm_search : 4*/
                arrayindex: 4,
                csstheme: {
                    labletext: "Confirm",
                    classname: "btn btn-danger",
                    id: "btn_confirm_search",
                },
            },
            {
                /*btn:cross : 5*/
                arrayindex: 5,
                csstheme: {
                    labletext: "",
                    classname: "btn-close custom-btn-close border p-1 me-0 d-flex align-items-center justify-content-center rounded-circle",
                    id: "btn_cross",
                    icon: "ti ti-x",
                },
            },
            {
                /*btn:Add Order : 6*/
                arrayindex: 6,
                csstheme: {
                    labletext: "Add Order",
                    classname: "label-add btn2lnk",
                    id: "btn_addorder",
                    icon: "ti ti-square-rounded-plus",
                },
            },
            {
                /*btn:Save : 7*/
                arrayindex: 7,
                csstheme: {
                    labletext: " Save",
                    classname: "btn btn-primary",
                    id: "btn_save",
                },
            },
            {
                /*btn:cancel : 8*/
                arrayindex: 8,
                csstheme: {
                    labletext: "Cancel",
                    classname: "btn btn-light me-2",
                    id: "btn_cancel",
                },
            },
            {
                /*txt: login id : 9*/
                arrayindex: 9,
                csstheme: {
                    labletext: "login id",
                    classname: "form-control",
                    id: "txt_test",
                    length: 50,
                    readonly: false,
                    hinttext: "Enter your Order",
                },
                inputvalue: "",
                tooltip: {
                    place: "bottom",
                    classname: "tooltip-react",
                    isfocus: "",
                    errorshow: "",
                    isvalidation: false,
                },
                validate: {
                    mandatory: true,
                    datatype: "default",
                },
                error: {
                    errorshow: false,
                    errormsg: "The field is mandatory",
                },
                dropdownlist: [],
            },
            {
                /*txt: Password : 10*/
                arrayindex: 10,
                csstheme: {
                    labletext: "Password",
                    classname: "form-control",
                    id: "num_pass",
                    length: 30,
                    readonly: false,
                    hinttext: "Enter your Password",
                },
                inputvalue: "",
                tooltip: {
                    place: "bottom",
                    classname: "tooltip-react",
                    isfocus: "",
                    errorshow: "",
                    isvalidation: false,
                },
                validate: {
                    mandatory: true,
                    datatype: "default",
                },
                error: {
                    errorshow: false,
                    errormsg: "The field is mandatory",
                },
            },
            {
                /*btn:Login : 11*/
                arrayindex: 11,
                csstheme: {
                    labletext: "Login",
                    classname: "btn btn-primary",
                    id: "btn_login",
                },
            },
            {
                /*Link:Sign up : 12*/
                arrayindex: 12,
                csstheme: {
                    labletext: " Sign up.",
                    classname: "text-purple link-hover",
                    id: "cb_signup",
                },
                to: "/student/student-signup"
            },
        ]
        ctlAttribute.current = ctlArray;
        fnBuildMenuList();
        setStartRender(true);
        setStartLoader(false);
    }
    function fnCreateBench(l_responceData) {
        responce_data.current = l_responceData;
        console.log(l_responceData)
        const benchlst = l_responceData
            .filter(sts => sts.status == "open")

        let l_bench = {
            groupbtnname: "beanchlst",
            groupbtnselectedname: null,
            groupbtndata: benchlst
        }
        ctlBench.current = l_bench;

    }

    function fnBuildMenuList() {
        let l_tbl_menu = {
            tablename: "tbl_orderlist",
            grpbtnrowid: null,
            grpbtnindex: null,
            tableindex: null,
            actionButton: {
                hasAction: true,
                hasStatus: true,
                canEditRow: true,
                canDeleteRow: true,
            },
            tableMetaData: {
                showPagination: false,
                showSearch: false,
            },
            colMetaData: [
                {
                    h_colindex: 0,
                    h_name: "Orders",
                    h_width: "200px",
                    h_txtalign: "left",
                    h_navigate: "/home",
                },
                {
                    h_colindex: 1,
                    h_name: "Qty",
                    h_width: "100px",
                    h_txtalign: "left",
                    h_navigate: "/home",
                },
                {
                    h_colindex: 2,
                    h_name: "Sts",
                    h_width: "100px",
                    h_txtalign: "left",
                    h_navigate: "/home",
                },
                {
                    h_colindex: 3,
                    h_name: "Actions",
                    h_width: "43px",
                    h_txtalign: "left",
                    h_navigate: "/home",
                },
            ],
            tableData: [],
        };
        tbl_menu.current = l_tbl_menu
    }
    function fnTableOrderList(index, rowmode, rowaction) {
        if (rowaction === 2) {
            tbl_menu.current.tableData.splice(index, 1);
            setRerender(!rerender)
        } else if (rowaction === 1) {
            tbl_menu.current.tableaction = 1;
            tbl_menu.current.tableindex = index;
            let t_data = tbl_menu.current.tableData[index].table_value
            ctlAttribute.current[0].inputvalue = t_data[0].t_value
            ctlAttribute.current[1].inputvalue = t_data[1].t_value
            setAddOrder(true);
        }
    }
    function fnConfirmOrder() {
        let canFormSubmit = true;
        let err = [];
        let l_validate = [];
        err.push(validate(ctlAttribute.current[0]));
        err.push(validate(ctlAttribute.current[1]));

        for (let i = 0; i < err.length; i++) {
            if (err[i].founderror === true) {
                canFormSubmit = false;
                ctlAttribute.current[err[i].arrayindex].error.errorshow = true;
                l_validate.push(err[i])
            }
        }
        if (canFormSubmit === false) {
            ctlAttribute.current[l_validate[l_validate.length - 1].arrayindex].tooltip.isvalidation = false;
            ctlAttribute.current[l_validate[l_validate.length - 1].arrayindex].tooltip.isfocus.focus();
            setRerender(!rerender);
        }
        else {
            let l_tableValues = [
                {
                    t_key: 0,
                    t_value: ctlAttribute.current[0].inputvalue,
                },
                {
                    t_key: 1,
                    t_value: ctlAttribute.current[1].inputvalue,
                },
            ]
            if (tbl_menu.current.tableaction === 0) {
                let l_tableThirdvalue = [
                    {
                        t_key: 2,
                        t_value: "New",
                    }
                ]
                tbl_menu.current.tableData.push({
                    showrow: true,
                    rowmode: 0,
                    table_value: l_tableValues.concat(l_tableThirdvalue),
                })
            } else if (tbl_menu.current.tableaction === 1) {
                let l_tableThirdvalue = tbl_menu.current.tableData[tbl_menu.current.tableindex].table_value[2]
                let l_tableData = {
                    showrow: true,
                    rowmode: 1,
                    table_value: l_tableValues.concat(l_tableThirdvalue),
                }
                tbl_menu.current.tableData.splice(tbl_menu.current.tableindex, 1, l_tableData)
            }
            ctlAttribute.current[0].inputvalue = "";
            ctlAttribute.current[1].inputvalue = "";
            setAddOrder(false);
        }
    }
    function fnSaveSelectedButton() {
        const docId = tbl_menu.current.grpbtnrowid;
        const newContent = tbl_menu.current.tableData.map(item => ({
            showrow: item.showrow,
            table_value: [
                {
                    t_key: 0,
                    t_value: item.table_value[0].t_value
                },
                {
                    t_key: 1,
                    t_value: item.table_value[1].t_value
                },
                {
                    t_key: 2,
                    t_value: "Waiting"
                },
            ]
        }));
        console.log(newContent)
        const companyName = getAppStoreData.companyName;
        const SeverName = getAppStoreData.username;
        socketRef.current.emit('updateServerOrderPlacing', docId, newContent, companyName, SeverName);

        document.body.style = "";
        setSideBar(false);
    }
    function handleButtonClick(e) {
        let btn_id = e.currentTarget.id;
        console.log(btn_id)
        switch (btn_id) {
            case "btn_addorder":
                tbl_menu.current.tableaction = 0;
                tbl_menu.current.tableindex = null;
                setAddOrder(true)
                break;
            case "btn_cross":
            case "blurdiv":
            case "btn_cancel":
                document.body.style = "";
                setSideBar(false);
                break;
            case "btn_save":
                fnSaveSelectedButton();
                break;
            case "btn_crosssearch":
            case "btn_cancel_search":
                ctlAttribute.current[0].inputvalue = "";
                ctlAttribute.current[0].error.errorshow = false;
                ctlAttribute.current[1].inputvalue = "";
                ctlAttribute.current[1].error.errorshow = false;
                setAddOrder(false)
                break;
            case "btn_confirm_search":
                fnConfirmOrder();
                break;
            case "btn_login":
                if (ctlAttribute.current[10].inputvalue !== "") {
                    fnSendData();
                }
                break;
        }
    }
    function fnSendData() {
        let _getSignupAuth = {
            loginid: ctlAttribute.current[9].inputvalue,
            password: ctlAttribute.current[10].inputvalue,
        }
        console.log(_getSignupAuth);
        let serverRequestParam = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(_getSignupAuth),
            apiUrl: "/api/v1/student-login",
            apikey: "LOGIN"
        };
        setStartInit(true)
        console.log(serverRequestParam)
        serverRequest(serverRequestParam);
    }
    function handleGroupButtonClick(groupBtnName, index) {
        switch (groupBtnName) {
            case "beanchlst":
                document.body.style.overflow = "hidden";
                const clonedData = structuredClone(ctlBench.current.groupbtndata[index].btn_values);
                ctlBench.current.groupbtnselectedname = ctlBench.current.groupbtndata[index].labelname;
                tbl_menu.current.grpbtnrowid = ctlBench.current.groupbtndata[index]._id;
                tbl_menu.current.tableData = clonedData;
                break;
        }
        setSideBar(true);
    }
    function handleTableActionClick(tablename, index, rowmode, rowaction) {
        switch (tablename) {
            case "tbl_orderlist":
                fnTableOrderList(index, rowmode, rowaction);
                break;
        }
    }


    useEffect(() => {


        // Initialize the socket connection
        socketRef.current = io(socketUrl);

        // Emit event to start server order placing
        socketRef.current.emit('joinServerOrderPlacing', "mgr orderup");

        // Listen for the 'menuList' event from the server
        socketRef.current.on('sendServerOrderPlacing', (responceData) => {
            initControl();
        });



        // Cleanup: Disconnect the socket on component unmount
        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, []);

    useEffect(() => {
        if (startInit === true) {
            if (isLoadingApi) {
                switch (apiKey) {
                    case "LOGIN":
                        fnSignupResponse();
                        break;
                }
            }
        }
    }, [startInit, isLoadingApi]);

    function fnSignupResponse() {
        let data = responseData.errormsg
        if (responseData.isAuth) {
            console.log(data)
            dispatchappStore(setlogininfo({
                ...getAppStoreData,
                userName: data.userName,
                mailID: data.mailID,
                phone: data.phone,
                collageid: data.collageid,
                department: data.department,
                coures: data.coures,
                _id: data._id,
                usertype: "student",
                isloggedin: true,
            }))
            navigate(`/student/order-placing`)
        } else {
            ctlAttribute.current[10].error.errorshow = true;
            ctlAttribute.current[10].error.errormsg = responseData.errormsg;
            ctlAttribute.current[10].tooltip.isvalidation = false;
            ctlAttribute.current[10].tooltip.isfocus.focus();
            setRerender(!rerender);
        }
        console.log(responseData)
    }
    return (
        <>
            {startLoader && (<OPLoader />)}
            {startRender && (
                <>

                    <div className="account-page">
                        <div className="main-wrapper">
                            <div className="account-content">
                                <div className='mt-5em'></div>
                                <div className="d-flex flex-wrap w-100 v-100 justify-content-center">
                                    <div className='d-flex justify-content-center flex-wrap p-4 w-50 bg-backdrop'>
                                        <div className='flex-fill'>
                                            <div className='mx-auto'>
                                                <div className='text-center mb-4'>
                                                    <img
                                                        style={{ width: "220px" }}
                                                        src={require("../assets/img/book-my-table.jpg")}
                                                        alt="Order pls"
                                                    ></img>
                                                </div>
                                                <div className='mb-4'>
                                                    <h4>Student</h4>
                                                    <p>This is a Page for Student's </p>
                                                </div>

                                                <div className='mb-3'>
                                                    <OPTextBox
                                                        ctl_Attribute={ctlAttribute.current[9]}
                                                        rerender={rerender}
                                                    />
                                                </div>
                                                <div className='mb-3'>
                                                    <OPTextBox
                                                        ctl_Attribute={ctlAttribute.current[10]}
                                                        rerender={rerender}
                                                    />
                                                </div>
                                                <div className='d-grid mx-auto mb-3'>
                                                    <OPButton
                                                        ctl_Attribute={ctlAttribute.current[11]}
                                                        handleButtonClick={handleButtonClick}
                                                    />
                                                </div>
                                                <div className='mb-3'>
                                                    <h6>if you didnt have order
                                                        <OPLink
                                                            ctl_Attribute={ctlAttribute.current[12]}
                                                        />
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div >
                    </div >
                </>
            )}

        </>

    )
}
