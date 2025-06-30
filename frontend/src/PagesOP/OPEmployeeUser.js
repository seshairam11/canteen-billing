import React, { useEffect, useRef, useState } from 'react'
import { OPValidations } from '../CommonOP/OPValidations';
import { OPLoader } from '../ComponentOP/OPLoader';
import { OPTextBox } from '../ComponentOP/OPTextBox';
import { useSelector } from 'react-redux';

export const OPEmployeeUser = () => {
    const [startInit, setStartInit] = useState(true);
    const [startRender, setStartRender] = useState(false);
    const [startLoader, setStartLoader] = useState(true);
    const [rerender, setRerender] = useState(true);

    const ctlAttribute = useRef([]);

    const getAppStoreData = useSelector((state) => state.appstate.login_info);

    const validate = OPValidations();
    function initControl() {
        let ctlArray = [
            {
                /*txt: Username  : 0*/
                arrayindex: 0,
                csstheme: {
                    labletext: "Username",
                    classname: "form-control",
                    id: "txt_firstname",
                    length: 30,
                    readonly: true,
                    hinttext: "Enter your Username ",
                },
                inputvalue: getAppStoreData.userName,
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
                /*txt: Mail id : 1*/
                arrayindex: 1,
                csstheme: {
                    labletext: "Mail id",
                    classname: "form-control",
                    id: "txt_lastname",
                    length: 20,
                    readonly: false,
                    hinttext: "Enter your Mail id ",
                },
                inputvalue: getAppStoreData.mailID,
                tooltip: {
                    place: "bottom",
                    classname: "tooltip-react",
                    isfocus: "",
                    errorshow: "",
                    isvalidation: false,
                },
                validate: {
                    mandatory: true,
                    datatype: "alpha",
                },
                error: {
                    errorshow: false,
                    errormsg: "The field is mandatory",
                },
            },
            {
                /*txt: Phone no : 2*/
                arrayindex: 2,
                csstheme: {
                    labletext: "Phone no",
                    classname: "form-control",
                    id: "txt_username",
                    length: 20,
                    readonly: true,
                    hinttext: "Enter your Phone no",
                },
                inputvalue: getAppStoreData.phone,
                tooltip: {
                    place: "bottom",
                    classname: "tooltip-react",
                    isfocus: "",
                    errorshow: "",
                    isvalidation: false,
                },
                validate: {
                    mandatory: true,
                    datatype: "alpha",
                },
                error: {
                    errorshow: false,
                    errormsg: "The field is mandatory",
                },
            },
            {
                /*txt: UserType : 3*/
                arrayindex: 3,
                csstheme: {
                    labletext: "UserType",
                    classname: "form-control",
                    id: "num_phonenumber",
                    length: 10,
                    readonly: true,
                    hinttext: "Enter your UserType",
                },
                inputvalue: getAppStoreData.usertype,
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
        ]
        ctlAttribute.current = ctlArray;

        setStartInit(false);
        setStartRender(true);
        setStartLoader(false);
    }




    function handleButtonClick(e) {
        let btn_id = e.currentTarget.id;
        console.log(btn_id);
        switch (btn_id) {

        }
    }

    useEffect(() => {
        if (startInit === true)
            initControl();
    }, [startInit]);
    return (
        <>
            {startLoader && (<OPLoader />)}
            {startRender && (
                <>
                    <div className="page-wrapper">
                        <div className='content'>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="page-header">
                                        <div className="row align-items-center">
                                            <div className="col-sm-4">
                                                <h4 className='page-title'>
                                                    My Profile
                                                </h4>
                                            </div>
                                            <div className="col-sm-8 text-sm-end">
                                                <div className="head-icons"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="card">
                                                <div className="card-body">
                                                    <h4 className='fw-semibold mb-3'>
                                                        User Detail's
                                                    </h4>
                                                    <div className='border-bottom mb-3 pb-3'>
                                                        <h5 className='fw-semibold mb-1'>
                                                            Employee Information
                                                        </h5>
                                                        <p>Provide the information below</p>
                                                    </div>
                                                    <div className="border-bottom mb-3">
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="mb-3">
                                                                    <OPTextBox
                                                                        ctl_Attribute={ctlAttribute.current[0]}
                                                                        rerender={rerender}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="mb-3">
                                                                    <OPTextBox
                                                                        ctl_Attribute={ctlAttribute.current[1]}
                                                                        rerender={rerender}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="mb-3">
                                                                    <OPTextBox
                                                                        ctl_Attribute={ctlAttribute.current[2]}
                                                                        rerender={rerender}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="mb-3">
                                                                    <OPTextBox
                                                                        ctl_Attribute={ctlAttribute.current[3]}
                                                                        rerender={rerender}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </>
            )}

        </>

    )
}
