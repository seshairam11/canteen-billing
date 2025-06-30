import React, { useEffect, useRef, useState } from 'react'
import { OPValidations } from '../CommonOP/OPValidations';
import { OPLoader } from '../ComponentOP/OPLoader';
import { OPButton } from '../ComponentOP/OPButton';
import { useSelector } from 'react-redux';
import useFetch from '../ApiOP/useFetch';
import { OPNotification } from '../ComponentOP/OPNotification';
import { OPReadOnlyListTable } from '../ComponentOP/OPReadOnlyTable';
import { OPTextBox } from '../ComponentOP/OPTextBox';
import { OPDropDown } from '../ComponentOP/OPDropDown';

export const OPViewStudents = () => {
    const [startInit, setStartInit] = useState(true);
    const [startRender, setStartRender] = useState(false);
    const [startLoader, setStartLoader] = useState(true);
    const [rerender, setRerender] = useState(true);
    const [notify, setNotify] = useState(false);
    const [listEmp, setListEmp] = useState(true);
    const [viewEmp, setViewEmp] = useState(false);

    const ctlAttribute = useRef([]);
    const ctlNotify = useRef({})
    const tbl_empLst = useRef({})

    const validate = OPValidations();
    const getAppStoreData = useSelector((state) => state.appstate.login_info);
    const { responseData, isLoadingApi, apiKey, fetchError, serverRequest } = useFetch();
    function fnViewEmpRequest() {
        let _getBody = {
            companyName: getAppStoreData.companyName,
        }
        let serverRequestParam = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(_getBody),
            apiUrl: "/api/v1/viewstudent",
            apikey: "VIEWEMP"
        };
        serverRequest(serverRequestParam);
        setStartInit(false);
    }

    function initControl() {
        console.log(responseData)
        if (responseData.isAuth) {
            let ctlArray = [
                {
                    /*txt: First Name  : 0*/
                    arrayindex: 0,
                    csstheme: {
                        labletext: "User Name",
                        classname: "form-control",
                        id: "txt_username",
                        length: 20,
                        readonly: true,
                        hinttext: "Enter the Student User name ",
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
                        datatype: "username",
                    },
                    error: {
                        errorshow: false,
                        errormsg: "The field is mandatory",
                    },
                },
                {
                    /*txt: Last Name : 1*/
                    arrayindex: 1,
                    csstheme: {
                        labletext: "Email",
                        classname: "form-control",
                        id: "txt_emailid",
                        length: 20,
                        readonly: true,
                        hinttext: "Enter the Student Email Id",
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
                        datatype: "email",
                    },
                    error: {
                        errorshow: false,
                        errormsg: "The field is mandatory",
                    },
                },
                {
                    /*txt: Phone Number : 2*/
                    arrayindex: 2,
                    csstheme: {
                        labletext: "Phone no",
                        classname: "form-control",
                        id: "num_phoneno",
                        length: 10,
                        readonly: true,
                        hinttext: "Enter your Phone Number",
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
                        datatype: "phoneno",
                    },
                    error: {
                        errorshow: false,
                        errormsg: "The field is mandatory",
                    },
                },
                {
                    /*txt: Department : 3*/
                    arrayindex: 3,
                    csstheme: {
                        labletext: "Department",
                        classname: "form-control",
                        id: "num_department",
                        length: 20,
                        readonly: true,
                        hinttext: "Enter your Department",
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
                        datatype: "phoneno",
                    },
                    error: {
                        errorshow: false,
                        errormsg: "The field is mandatory",
                    },
                },
                {
                    /*txt: Password : 4*/
                    arrayindex: 4,
                    csstheme: {
                        labletext: "Password",
                        classname: "form-control",
                        id: "text-email",
                        length: 50,
                        readonly: true,
                        hinttext: "Enter the Student Password",
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
                        datatype: "text",
                    },
                    error: {
                        errorshow: false,
                        errormsg: "The field is mandatory",
                    },
                },
                {
                    /*txt: Confirm Password : 5*/
                    arrayindex: 5,
                    csstheme: {
                        labletext: "Confirm Password",
                        classname: "form-control",
                        id: "text-confirmpassword",
                        length: 50,
                        readonly: true,
                        hinttext: "Enter the Student Confirm Password",
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
                        datatype: "dropdown",
                    },
                    error: {
                        errorshow: false,
                        errormsg: "The field is mandatory",
                    },
                },
                {
                    /*btn:Save Changes : 4*/
                    arrayindex: 6,
                    csstheme: {
                        labletext: "Save Changes",
                        classname: "btn btn-primary me-2",
                        id: "btn_savechange",
                    },
                },
                {
                    /*btn:Edit : 7*/
                    arrayindex: 7,
                    csstheme: {
                        labletext: "Edit",
                        classname: "btn btn-secondary me-2",
                        id: "btn_edit",
                    },
                },
                {
                    /*btn:Delete : 8*/
                    arrayindex: 8,
                    csstheme: {
                        labletext: "Delete",
                        classname: "btn btn-primary me-2",
                        id: "btn_delete",
                    },
                },
                {
                    /*btn:Delete : 9*/
                    arrayindex: 9,
                    csstheme: {
                        labletext: "Cancel",
                        classname: "btn btn-light me-2",
                        id: "btn_cancel",
                    },
                },
                {
                    /*btn:Delete : 10*/
                    arrayindex: 10,
                    csstheme: {
                        labletext: "Get QR code",
                        classname: "btn btn-primary me-2",
                        id: "btn_getQR",
                    },
                },
                {
                    /*txt: Register id : 11*/
                    arrayindex: 11,
                    csstheme: {
                        labletext: "Register id",
                        classname: "form-control",
                        id: "num_Registerid",
                        length: 20,
                        readonly: true,
                        hinttext: "Enter your Register id",
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
                        datatype: "phoneno",
                    },
                    error: {
                        errorshow: false,
                        errormsg: "The field is mandatory",
                    },
                },
                {
                    /*txt: Course : 12*/
                    arrayindex: 12,
                    csstheme: {
                        labletext: "Course",
                        classname: "form-control",
                        id: "text-email",
                        length: 50,
                        readonly: true,
                        hinttext: "Enter the Student Course",
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
                        datatype: "text",
                    },
                    error: {
                        errorshow: false,
                        errormsg: "The field is mandatory",
                    },
                },
            ]
            ctlAttribute.current = ctlArray;
            fnBuildStudentsList(responseData.errormsg);
            setStartRender(true);
            setStartLoader(false);

        } else {
            console.log(responseData.errormsg);
        }
    }


    function fnBuildStudentsList(resTableData) {
        console.log(resTableData)
        const benchlst = resTableData
            .map(item => ({
                rowid: item._id,
                showrow: true,
                regno: item.collageid,
                coures: item.coures,
                table_value: [
                    {
                        t_key: 0,
                        t_value: item.userName.charAt(0).toUpperCase() + item.userName.slice(1),
                    },
                    {
                        t_key: 1,
                        t_value: item.department,
                    },
                    {
                        t_key: 2,
                        t_value: item.mailID,
                    },
                    {
                        t_key: 3,
                        t_value: item.phone,
                    },
                ]
            }))

        let l_tbl_empLst = {
            tablename: "tbl_orderlist",
            tableindex: null,
            tabledataid: null,
            tableMetaData: {
                showPagination: false,
                showSearch: false,
            },
            colMetaData: [
                {
                    h_colindex: 0,
                    h_name: "Student's",
                    h_width: "150px",
                    h_txtalign: "left",
                    h_navigate: "/home",
                },
                {
                    h_colindex: 1,
                    h_name: "Department",
                    h_width: "43px",
                    h_txtalign: "left",
                    h_navigate: "/home",
                },
                {
                    h_colindex: 2,
                    h_name: "Mail",
                    h_width: "100px",
                    h_txtalign: "left",
                    h_navigate: "/home",
                },
                {
                    h_colindex: 3,
                    h_name: "Phone",
                    h_width: "100px",
                    h_txtalign: "left",
                    h_navigate: "/home",
                },
            ],
            tableData: benchlst,
        };
        tbl_empLst.current = l_tbl_empLst
    }

    function handleButtonClick(e) {
        let btn_id = e.currentTarget.id;
        switch (btn_id) {
            case "btn_cancel":
                setListEmp(true);
                setViewEmp(false);
                break;
            case "btn_delete":
                fnDeleteData();
                break;
            case "btn_getQR":
                const url = `https://api.qrserver.com/v1/create-qr-code/?data=http://${process.env.REACT_APP_IP_ADDRESS}:3000/user/${tbl_empLst.current.tabledataid}&size=200x200`;
                window.open(url, '_blank');
                break;
        }
    }

    function handleClickTable(index) {
        const StudentDetial = tbl_empLst.current.tableData[index];
        tbl_empLst.current.tableindex = index;
        tbl_empLst.current.tabledataid = StudentDetial.rowid;
        ctlAttribute.current[0].inputvalue = StudentDetial.table_value[0].t_value
        ctlAttribute.current[1].inputvalue = StudentDetial.table_value[2].t_value
        ctlAttribute.current[2].inputvalue = StudentDetial.table_value[3].t_value
        ctlAttribute.current[3].inputvalue = StudentDetial.table_value[1].t_value
        ctlAttribute.current[11].inputvalue = StudentDetial.regno
        ctlAttribute.current[12].inputvalue = StudentDetial.coures
        setListEmp(false);
        setViewEmp(true);
    }

    function fnDeleteData() {
        tbl_empLst.current.tableData.splice(tbl_empLst.current.tableindex, 1);
        let _getBody = {
            _id: tbl_empLst.current.tabledataid,
        }
        let serverRequestParam = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(_getBody),
            apiUrl: "/api/v1/deletestudent",
            apikey: "DELEMP"
        };
        serverRequest(serverRequestParam);
    }

    function fnDeleteEmpResult() {
        console.log(responseData)
        if (responseData.isAuth) {
            ctlNotify.current = {
                name: "Student Deleted Successfully",
                title: responseData.errormsg.userName,
                photo: "success"
            }
            setViewEmp(false);
            setListEmp(true);
            setNotify(true);
        }
    }

    useEffect(() => {
        if (startInit === true) {
            fnViewEmpRequest();
        } else {
            if (isLoadingApi) {
                console.log(apiKey)
                switch (apiKey) {
                    case "DELEMP":
                        fnDeleteEmpResult();
                        break;
                    case "VIEWEMP":
                        initControl();
                        break;
                }
            }
        }
    }, [startInit, isLoadingApi]);

    useEffect(() => {
        if (notify) {
            const closeNotify = setInterval(() => {
                setNotify(false);
            }, 2000);
            return () => clearInterval(closeNotify);
        }
    }, [notify]);

    return (
        <>
            {startLoader && (<OPLoader />)}
            {startRender && (
                <>
                    <div className="page-wrapper">
                        <OPNotification
                            nameProps={ctlNotify.current.name}
                            titleProps={ctlNotify.current.title}
                            photoProps={ctlNotify.current.photo}
                            bool={notify}
                        />
                        <div className='content'>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="page-header">
                                        <div className="row align-items-center">
                                            <div className="col-sm-4">
                                                <h4 className='page-title'>
                                                    View Student's
                                                </h4>
                                            </div>
                                            <div className="col-sm-8 text-sm-end">
                                                <div className="head-icons"></div>
                                            </div>
                                        </div>
                                    </div>

                                    {listEmp &&
                                        < div className="row">
                                            <div className="col-lg-12">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className='border-bottom mb-3 pb-3'>
                                                            <h5 className='fw-semibold mb-1'>
                                                                View Student's
                                                            </h5>
                                                            <p>Showing your Students</p>
                                                        </div>
                                                        <OPReadOnlyListTable
                                                            tablename={tbl_empLst.current.tablename}
                                                            actionButton={tbl_empLst.current.actionButton}
                                                            tableMetaData={tbl_empLst.current.tableMetaData}
                                                            colMetaData={tbl_empLst.current.colMetaData}
                                                            tableData={tbl_empLst.current.tableData}
                                                            handleClickTable={handleClickTable}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>}
                                    {viewEmp &&
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className='border-bottom mb-3 pb-3'>
                                                            <h5 className='fw-semibold mb-1'>
                                                                Student User Details
                                                            </h5>
                                                            <p>Showing User Details in ReadOnly Method</p>
                                                        </div>
                                                        <div className="border-bottom mb-3">
                                                            <div className="row">
                                                                <div className="col-md-4">
                                                                    <div className="mb-3">
                                                                        <OPTextBox
                                                                            ctl_Attribute={ctlAttribute.current[0]}
                                                                            rerender={rerender}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <div className="mb-3">
                                                                        <OPTextBox
                                                                            ctl_Attribute={ctlAttribute.current[1]}
                                                                            rerender={rerender}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <div className="mb-3">
                                                                        <OPTextBox
                                                                            ctl_Attribute={ctlAttribute.current[2]}
                                                                            rerender={rerender}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-4">
                                                                    <div className="mb-3">
                                                                        <OPTextBox
                                                                            ctl_Attribute={ctlAttribute.current[3]}
                                                                            rerender={rerender}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <div className="mb-3">
                                                                        <OPTextBox
                                                                            ctl_Attribute={ctlAttribute.current[11]}
                                                                            rerender={rerender}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <div className="mb-3">
                                                                        <OPTextBox
                                                                            ctl_Attribute={ctlAttribute.current[12]}
                                                                            rerender={rerender}
                                                                        />
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                        <div className='mt-4 d-flex justify-content-end'>

                                                            <OPButton
                                                                ctl_Attribute={ctlAttribute.current[10]}
                                                                handleButtonClick={handleButtonClick}
                                                            />
                                                            <OPButton
                                                                ctl_Attribute={ctlAttribute.current[9]}
                                                                handleButtonClick={handleButtonClick}
                                                            />
                                                            <OPButton
                                                                ctl_Attribute={ctlAttribute.current[8]}
                                                                handleButtonClick={handleButtonClick}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>}
                                </div>
                            </div>
                        </div>
                    </div >
                </>
            )
            }

        </>

    )
}
