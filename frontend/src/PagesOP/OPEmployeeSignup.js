import React, { useEffect, useRef, useState } from 'react'
import { OPValidations } from '../CommonOP/OPValidations';
import { OPLoader } from '../ComponentOP/OPLoader';
import { OPButton } from '../ComponentOP/OPButton';
import { OPTextBox } from '../ComponentOP/OPTextBox';
import { useDispatch, useSelector } from 'react-redux';
import useFetch from '../ApiOP/useFetch';
import { OPDropDown } from '../ComponentOP/OPDropDown';
import { OPNotification } from '../ComponentOP/OPNotification';
import { OPLink } from '../ComponentOP/OPLink';
import { useNavigate } from 'react-router-dom';
import { setlogininfo } from '../brewStore/AppState';

export const OPEmployeeSignup = () => {
    const [startInit, setStartInit] = useState(true);
    const [startRender, setStartRender] = useState(false);
    const [startLoader, setStartLoader] = useState(true);
    const [rerender, setRerender] = useState(true);
    const [notify, setNotify] = useState(false);

    const ctlAttribute = useRef([]);
    const ctlNotify = useRef({})

    const navigate = useNavigate();
    const dispatchappStore = useDispatch();


    const validate = OPValidations();
    const getAppStoreData = useSelector((state) => state.appstate.login_info);
    const { responseData, isLoadingApi, apiKey, fetchError, serverRequest } = useFetch();


    function initControl() {
        let ctlArray = [
            {
                /*txt: First Name  : 0*/
                arrayindex: 0,
                csstheme: {
                    labletext: "User Name",
                    classname: "form-control",
                    id: "txt_username",
                    length: 20,
                    readonly: false,
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
                    readonly: false,
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
                    readonly: false,
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
                /*txt: Register no : 3*/
                arrayindex: 3,
                csstheme: {
                    labletext: "Register no",
                    classname: "form-control",
                    id: "num_collageid",
                    length: 12,
                    readonly: false,
                    hinttext: "Enter your Register no",
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
                /*txt: Department : 4*/
                arrayindex: 4,
                csstheme: {
                    labletext: "Department",
                    classname: "form-control",
                    id: "text-departmet",
                    length: 20,
                    readonly: false,
                    hinttext: "Enter the Student Department",
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
                /*txt: Course name : 5*/
                arrayindex: 5,
                csstheme: {
                    labletext: "Course name",
                    classname: "form-control",
                    id: "text-confirmpassword",
                    length: 50,
                    readonly: false,
                    hinttext: "Enter the Course name",
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
                /*txt: Password : 6*/
                arrayindex: 6,
                csstheme: {
                    labletext: "Password",
                    classname: "form-control",
                    id: "text-email",
                    length: 50,
                    readonly: false,
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
                /*txt: Confirm Password : 7*/
                arrayindex: 7,
                csstheme: {
                    labletext: "Confirm Password",
                    classname: "form-control",
                    id: "text-confirmpassword",
                    length: 50,
                    readonly: false,
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
                /*btn:Register : 8*/
                arrayindex: 8,
                csstheme: {
                    labletext: "Register",
                    classname: "btn btn-primary me-2",
                    id: "btn_register",
                },
            },
            {
                /*Link:Sign up : 9*/
                arrayindex: 9,
                csstheme: {
                    labletext: " Login.",
                    classname: "text-purple link-hover",
                    id: "cb_signup",
                },
                to: "/student/student-login"
            },
        ]
        ctlAttribute.current = ctlArray;
        setStartInit(false);
        setStartRender(true);
        setStartLoader(false);
    }

    function checkPassword(p1, p2) {
        if (p1 === p2) {
            return true
        }
        return false;
    }


    function handleButtonClick(e) {
        let btn_id = e.currentTarget.id;
        console.log(btn_id);
        switch (btn_id) {
            case "btn_register":
                fnRegisterStudent();
                break;
        }
    }
    function fnRegisterStudent() {
        let canFormSubmit = true;
        let err = [];
        let l_validate = [];
        err.push(validate(ctlAttribute.current[7]))
        err.push(validate(ctlAttribute.current[6]))
        err.push(validate(ctlAttribute.current[5]))
        err.push(validate(ctlAttribute.current[4]))
        err.push(validate(ctlAttribute.current[3]))
        err.push(validate(ctlAttribute.current[2]))
        err.push(validate(ctlAttribute.current[1]))
        err.push(validate(ctlAttribute.current[0]))
        console.log(err);

        for (let i = 0; i < err.length; i++) {
            if (err[i].founderror === true) {
                canFormSubmit = false;
                ctlAttribute.current[err[i].arrayindex].error.errorshow = true;
                l_validate.push(err[i])
            }
        }
        if (canFormSubmit === false) {
            ctlAttribute.current[l_validate[l_validate.length - 1].arrayindex].tooltip.isvalidation = true;
            ctlAttribute.current[l_validate[l_validate.length - 1].arrayindex].tooltip.isfocus.focus();
            setRerender(!rerender);
        } else {
            if (checkPassword(ctlAttribute.current[6].inputvalue, ctlAttribute.current[7].inputvalue)) {
                setStartLoader(true);
                fnSendData()
            } else {
                ctlAttribute.current[6].error.errorshow = true;
                ctlAttribute.current[7].error.errorshow = true;
                ctlAttribute.current[7].error.errormsg = "Check your password";
                ctlAttribute.current[7].tooltip.isvalidation = true;
                ctlAttribute.current[7].tooltip.isfocus.focus();
            }
        }
    }
    function fnSendData() {
        let _getBody = {
            userName: ctlAttribute.current[0].inputvalue,
            mailID: ctlAttribute.current[1].inputvalue,
            phone: ctlAttribute.current[2].inputvalue,
            collageid: ctlAttribute.current[3].inputvalue,
            department: ctlAttribute.current[4].inputvalue,
            coures: ctlAttribute.current[5].inputvalue,
            password: ctlAttribute.current[6].inputvalue,
        }

        let serverRequestParam = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(_getBody),
            apiUrl: "/api/v1/addstudent",
            apikey: "ADDSTUD"
        };
        serverRequest(serverRequestParam);
    }

    function fnAddStudResult() {
        console.log(responseData);
        if (responseData.isAuth) {
            const _values = responseData.value[0]
            dispatchappStore(
                setlogininfo({
                    userName: _values.userName,
                    isloggedin: true,
                    burnerid: _values._id,
                    usertype: "student",
                    mailID: _values.mailID,
                    phone: _values.phone,
                    department: _values.department,
                    coures: _values.coures,
                }),
            );
            const url = ` https://api.qrserver.com/v1/create-qr-code/?data=http://localhost:3000/${responseData.value[0]._id}&size=200x200`;
            console.log(url);
            navigate("/student/order-placing")
        } else {
            ctlNotify.current.name = "Error";
            ctlNotify.current.title = responseData.errormsg;
            ctlNotify.current.photo = "error";
            if (responseData.errormsg === "Username already registered") {

                ctlAttribute.current[0].error.errorshow = true;
                ctlAttribute.current[0].error.errormsg = responseData.errormsg;
                ctlAttribute.current[0].tooltip.isvalidation = true;
                ctlAttribute.current[0].tooltip.isfocus.focus();
            } else {
                if (responseData.errormsg === "EmailID already registered") {

                    ctlAttribute.current[1].error.errorshow = true;
                    ctlAttribute.current[1].error.errormsg = responseData.errormsg;
                    ctlAttribute.current[1].tooltip.isvalidation = true;
                    ctlAttribute.current[1].tooltip.isfocus.focus();
                } else {
                    if (responseData.errormsg === "phoneno already registered") {

                        ctlAttribute.current[2].error.errorshow = true;
                        ctlAttribute.current[2].error.errormsg = responseData.errormsg;
                        ctlAttribute.current[2].tooltip.isvalidation = true;
                        ctlAttribute.current[2].tooltip.isfocus.focus();
                    }
                }
            }
        }
        setStartLoader(false);
    }

    useEffect(() => {
        if (startInit === true) {
            initControl();
        } else {
            if (isLoadingApi) {
                console.log(apiKey)
                switch (apiKey) {
                    case "ADDSTUD":
                        fnAddStudResult();
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
                    <OPNotification
                        nameProps={ctlNotify.current.name}
                        titleProps={ctlNotify.current.title}
                        photoProps={ctlNotify.current.photo}
                        bool={notify}
                    />
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
                                                        ctl_Attribute={ctlAttribute.current[0]}
                                                        rerender={rerender}
                                                    />
                                                </div>
                                                <div className='mb-3'>
                                                    <OPTextBox
                                                        ctl_Attribute={ctlAttribute.current[1]}
                                                        rerender={rerender}
                                                    />
                                                </div>
                                                <div className='mb-3'>
                                                    <OPTextBox
                                                        ctl_Attribute={ctlAttribute.current[2]}
                                                        rerender={rerender}
                                                    />
                                                </div>
                                                <div className='mb-3'>
                                                    <OPTextBox
                                                        ctl_Attribute={ctlAttribute.current[3]}
                                                        rerender={rerender}
                                                    />
                                                </div>
                                                <div className='mb-3'>
                                                    <OPTextBox
                                                        ctl_Attribute={ctlAttribute.current[4]}
                                                        rerender={rerender}
                                                    />
                                                </div>
                                                <div className='mb-3'>
                                                    <OPTextBox
                                                        ctl_Attribute={ctlAttribute.current[5]}
                                                        rerender={rerender}
                                                    />
                                                </div>
                                                <div className='mb-3'>
                                                    <OPTextBox
                                                        ctl_Attribute={ctlAttribute.current[6]}
                                                        rerender={rerender}
                                                    />
                                                </div>
                                                <div className='mb-3'>
                                                    <OPTextBox
                                                        ctl_Attribute={ctlAttribute.current[7]}
                                                        rerender={rerender}
                                                    />
                                                </div>
                                                <div className='d-grid mx-auto mb-3'>
                                                    <OPButton
                                                        ctl_Attribute={ctlAttribute.current[8]}
                                                        handleButtonClick={handleButtonClick}
                                                    />
                                                </div>
                                                <div className='mb-3'>
                                                    <h6>if you have an account? <OPLink
                                                        ctl_Attribute={ctlAttribute.current[9]}
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
