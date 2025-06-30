import React, { useEffect, useRef, useState } from 'react'
import { OPButton } from '../ComponentOP/OPButton'
import { OPLoader } from '../ComponentOP/OPLoader';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setlogininfo } from '../brewStore/AppState';

export const OPEntry = () => {

    const [startInit, setStartInit] = useState(true);
    const [startRender, setStartRender] = useState(false);
    const [startLoader, setStartLoader] = useState(true);

    const ctlAttribute = useRef([]);

    const navigate = useNavigate();
    const dispatchappStore = useDispatch();
    const getAppStoreData = useSelector((state) => state.appstate.login_info);

    function initControl() {
        dispatchappStore(
            setlogininfo({
                ...getAppStoreData,
                isloggedin: false,
                burnerid: 0,
            })
        );
        let ctl_array = [
            {
                /*Ctl:Hotels : 0*/
                arrayindex: 0,
                csstheme: {
                    labletext: "Canteen",
                    classname: "btn btn-primary home-screen",
                    id: "btn_canteens",
                },
            },
            {
                /*Ctl:Hotels : 1*/
                arrayindex: 1,
                csstheme: {
                    labletext: "Student's",
                    classname: "btn btn-secondary home-screen",
                    id: "btn_employees",
                },
            },
        ]
        ctlAttribute.current = ctl_array;
        setStartInit(false);
        setStartRender(true);
        setStartLoader(false);
    }

    function handleButtonClick(e) {
        const btn_id = e.target.id;
        switch (btn_id) {
            case "btn_canteens":
                navigate("canteen")
                break;
            case "btn_employees":
                navigate("student")
                break;
        }
    }
    useEffect(() => {
        if (startInit == true)
            initControl();
    }, [startInit]);

    return (<>
        {startLoader && (<OPLoader />)}
        {startRender && (
            <div className="account-page">
                <div className="main-wrapper">
                    <div className="account-content">
                        <div className='mt-5em'></div>
                        <div className="d-flex flex-wrap w-100 vh-100 justify-content-center">
                            <div className='d-flex justify-content-center flex-wrap overflow-auto p-4 w-50 bg-backdrop'>
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
                                            <h4>Welcome</h4>
                                            <p>This page is for managing the canteen's </p>
                                        </div>
                                        <div className='d-grid mx-auto'>
                                            <OPButton
                                                ctl_Attribute={ctlAttribute.current[0]}
                                                handleButtonClick={handleButtonClick}
                                            />
                                        </div>
                                    </div>
                                    <p className='subtitle-entry'>Click here, If you are Canteen Owner, You can Register or Login to Your Account</p>
                                    <div className='mx-auto '>
                                        <div className='d-grid mx-auto'>
                                            <OPButton
                                                ctl_Attribute={ctlAttribute.current[1]}
                                                handleButtonClick={handleButtonClick}
                                            />
                                        </div>
                                    </div>
                                    <p className='subtitle-entry'>Click here, If you are Student, you can Register or Login to Your Account</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        )}
    </>)
}
