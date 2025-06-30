import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import "../assets/plugins/icons/feather/feather.css";
import "../assets/plugins/material/materialdesignicons.css"
import { OPButton } from './OPButton';
import { OPMainSearchBar } from './OPMainSearchBar';
import { OPNightModeToggle } from './OPNightModeToggle';
import { useDispatch, useSelector } from 'react-redux';
import { setlogininfo } from '../brewStore/AppState';
import img4 from "../assets/img/img-4.jpg";

export const OPMainMenuBar = () => {
    const [l_hover, setHover] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [sideBar, setSideBar] = useState(true);
    const [sideNav, setSideNav] = useState(false);
    const [headerBell, setHeaderBell] = useState(false);
    const [clickProfile, setClickProfile] = useState(false);
    const [startInit, setStartInit] = useState(true);
    const [startRender, setStartRender] = useState(false);
    const ctlAttribute = useRef();
    const ctlMainMenu = useRef();
    const getAppStoreData = useSelector((state) => state.appstate.login_info);
    const dispatchappStore = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(true);
    };
    const toggleDropdownoff = () => {
        setIsOpen(false);
    };
    function initControl() {
        let ctlArray = [
            {
                /*btn:cross : 0*/
                arrayindex: 0,
                csstheme: {
                    labletext: "",
                    classname: "btn2lnk active",
                    id: "toggle_btn",
                    icon: "ti ti-arrow-bar-to-left",
                },
            },
            {
                /*btn:search bar : 1*/
                arrayindex: 1,
                csstheme: {
                    id: "mainsearchbar",
                    icon: "ti ti-command",
                },
                inputvalue: "",
            },
        ]
        ctlAttribute.current = ctlArray;
        let l_menu = [
            {
                usertype: "canteen",
                titlemenu: "Overall Order",
                icon: "ti ti-users",
                path: `/canteen/vieworders`,
            },
            {
                usertype: "canteen",
                titlemenu: "Order waiting for payment",
                icon: "ti ti-check",
                path: `/canteen/order-close`,
            },
            {
                usertype: "canteen",
                titlemenu: "pending orders",
                icon: "ti ti-checks",
                path: `/canteen/order-taking`,
            },
            {
                usertype: "canteen",
                titlemenu: "Order fulfilled",
                icon: "ti ti-checks Blue-tick",
                path: `/canteen/order-done`,
            },
            {
                usertype: "canteen",
                titlemenu: "Add Menu",
                icon: "ti ti-layout-sidebar-left-expand",
                path: `/canteen/addmenucard`,
            },
            {
                usertype: "canteen",
                titlemenu: "View Menu",
                icon: "ti ti-layout-bottombar-inactive",
                path: `/canteen/viewmenucard`,
            },
            {
                usertype: "student",
                titlemenu: "Order Placing",
                icon: "ti ti-users",
                path: `/${getAppStoreData?.usertype}/order-placing`,
            },
            {
                usertype: "student",
                titlemenu: "Order Payment",
                icon: "ti ti-users",
                path: `/${getAppStoreData?.usertype}/order-payment`,
            },
            {
                usertype: "student",
                titlemenu: "Order Processing",
                icon: "ti ti-users",
                path: `/${getAppStoreData?.usertype}/order-processing`,
            },
            {
                usertype: "student",
                titlemenu: "Order Completed",
                icon: "ti ti-users",
                path: `/${getAppStoreData?.usertype}/order-Completed`,
            },
        ];
        ctlMainMenu.current = l_menu;
        document.documentElement.setAttribute('data-theme', "white");
        setStartInit(false);
        setStartRender(true);
    }
    function fnEnableScrolling() {
        const sideBarRect = document.getElementById("sidebar").getBoundingClientRect();
        const sideBarMenu = document.getElementById("sidebar-menu");
        const computedStyle = window.getComputedStyle(sideBarMenu);
        const sideBarMenuRect = sideBarMenu.getBoundingClientRect();
        const sideBarMenuInnerHeightWithoutPadding = sideBarMenuRect.height - parseFloat(computedStyle.paddingBottom) - 25;
        const subValue = sideBarMenuInnerHeightWithoutPadding > sideBarRect.height;
        if (subValue) {
            setHover(true);
        } else {
            setHover(false);
            sideBarRect.scrollTop = 0;
        }
    }
    function handleOnMouseEnterSidebarOpen() {
        if (toggle == true) {
            document.body.classList.add("expand-menu");
            setSideBar(true);
        }
    }
    function handleOnMouseLeaveSidebarClose() {
        if (toggle == true) {
            document.body.classList.remove("expand-menu");
            setSideBar(false);
        }
    }

    function handleOnClick(e) {
        let btn_id = e.currentTarget.id;
        console.log(btn_id)
        switch (btn_id) {
            case "toggle_btn":
                const toggleDiv = document.getElementById("toggle_btn");
                const miniSideBarDiv = document.getElementById("mini-sidebar");
                if (toggle) {
                    miniSideBarDiv.classList.remove("mini-sidebar");
                    toggleDiv.classList.add("active");
                    setToggle(false);
                } else {
                    miniSideBarDiv.classList.add("mini-sidebar");
                    toggleDiv.classList.remove("active");
                    setToggle(true);
                }
                break;
            case "mobile_btn":
                setSideNav(!sideNav);
                break;
            case "mobile-userprofile":
                setClickProfile(true);
                break;
            case "userprofile":
                setClickProfile(true);
                break;
            case "headerbell":
                setHeaderBell(true);
                break;
        }
    }
    function handleOnBlur(e) {
        let btn_id = e.currentTarget.id;
        switch (btn_id) {
            case "mobile-userprofile":
                setClickProfile(false);
                break;
            case "userprofile":
                setClickProfile(false);
                break;
            case "headerbell":
                setHeaderBell(false);
                break;
        }
    }
    function handleOnMouseDown(e) {
        const btn_id = e.currentTarget.id;
        switch (btn_id) {
            case "my-profile":
                navigate("/student/my-profile");
                break;
            case "logout":
                navigate("/");
                break;
        }
        setClickProfile(false);
    }
    function handleOnQrCode() {
        const url = `https://api.qrserver.com/v1/create-qr-code/?data=http://${process.env.REACT_APP_IP_ADDRESS}:3000/${getAppStoreData.usertype}/my-profile&size=200x200`;
        window.open(url, '_blank');
    }
    function handleOnClickNavLink(e) {

        dispatchappStore(
            setlogininfo({
                ...getAppStoreData,
                lastseen: e.currentTarget.id,
            })
        )
        setSideNav(false);
    }
    useEffect(() => {
        if (startInit === true)
            initControl();
    }, [startInit]);

    return (
        <>
            {startRender && (
                <>
                    <div className={`main-wrapper ${sideNav ? "slide-nav" : ""}`} >
                        <div className="header">
                            <div className={`header-left active ${sideBar ? "prior-sidebar" : ""}`} onMouseEnter={handleOnMouseEnterSidebarOpen} onMouseLeave={handleOnMouseLeaveSidebarClose}>
                                {/*  */}
                                {sideBar &&
                                    <>
                                        <Link className='logo logo-normal'>
                                            <img src={require("../assets/img/header-logo.jpg")} style={{ height: "65px", width: "170px", marginTop: "3px" }} />
                                        </Link>
                                        <Link className='white-logo' style={{ marginLeft: "-90px", marginTop: "5px" }}>
                                            <img src={require("../assets/img/header-logo-black.jpg")} style={{ height: "75px", marginLeft: "10px", width: "185px", marginTop: "8px" }} />
                                        </Link>
                                        <OPButton
                                            ctl_Attribute={ctlAttribute.current[0]}
                                            handleButtonClick={handleOnClick}
                                        />
                                    </>
                                }
                                {!sideBar &&
                                    <>
                                        < Link to={"/user"} className='logo-small'>
                                            <img src={require("../assets/img/small-logo.jpg")} />
                                        </Link>
                                    </>
                                }
                                <Link className='mobile_btn' id='mobile_btn' onClick={handleOnClick}>
                                    <span className="bar-icon">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </span>
                                </Link>
                            </div>
                            <div className="header-user">
                                <ul className="nav user-menu">
                                    <li className='nav-item nav-search-inputs me-auto'>
                                        <div className='top-nav-search'>
                                            <OPMainSearchBar
                                                ctl_Attribute={ctlAttribute.current[1]}
                                            />
                                        </div>
                                    </li>
                                    <li className='nav-item nav-list'>
                                        <ul className="nav">
                                            <li className="dark-mode-list">
                                                <OPNightModeToggle />
                                            </li>
                                        </ul>
                                    </li>
                                    <li className='nav-item dropdown nav-item-box'>
                                        <Link className='nav-link show' id='headerbell' onClick={handleOnClick} onBlur={handleOnBlur}>
                                            <i className='ti ti-bell'></i>
                                        </Link>
                                        <div
                                            className={`dropdown-menu dropdown-menu-end notification-dropdown ${headerBell ? "show" : "hiding"}`}
                                            style={headerBell ? { position: "absolute", inset: "0 0 auto auto", margin: 0, translate: "0px 38px" } : {}}
                                        >
                                            <div className="topnav-dropdown-header">
                                                <div className="notification-title">
                                                    Notifications
                                                </div>
                                            </div>
                                            <div className="noti-content">
                                                <div className="notification-list">

                                                </div>
                                            </div>
                                            <div className="topnav-dropdown-footer">
                                                <Link className='view-link'>
                                                    View all
                                                </Link>
                                                <Link className='clear-link'>
                                                    Clear all
                                                </Link>
                                            </div>
                                        </div>
                                    </li>
                                    <li className='nav-item dropdown has-arrow main-drop'>
                                        <Link
                                            className='nav-link userset'
                                            id='userprofile'
                                            onClick={handleOnClick}
                                            onBlur={handleOnBlur}
                                            aria-expanded={clickProfile}
                                            aria-controls='dropdown-profile-image'
                                            role='button'
                                        >
                                            <span className="user-info">
                                                <span className="user-letter" style={{ width: "auto" }}>
                                                    <img
                                                        src={"/profile.jpg"}
                                                        alt="Order pls"
                                                        style={{ width: "50px", height: "50px" }}
                                                    ></img>
                                                </span>
                                                <span className='badge badge-success rounded-pill'></span>
                                            </span>
                                        </Link>
                                        <div
                                            id='dropdown-profile-image'
                                            className={`dropdown-menu menu-drop-user ${clickProfile ? "show" : ""}`}
                                            style={{ position: "absolute", inset: "0px 0px auto auto", margin: "0", translate: "0 40px" }}
                                            aria-hidden={!clickProfile}>
                                            <div className="profilename">
                                                {getAppStoreData.usertype == "student" ?
                                                    < Link
                                                        className='dropdown-item'
                                                        to={`/${getAppStoreData.usertype}/my-profile`}
                                                        id={`/${getAppStoreData.usertype}/my-profile`}
                                                        onClick={(e) => { handleOnClickNavLink(e); console.log("sdcnas") }}
                                                    >
                                                        <i className='ti ti-user-pin'></i> My Profile
                                                    </Link>
                                                    :
                                                    <Link
                                                        className='dropdown-item'
                                                        to={`/${getAppStoreData.usertype}/my-profile`}
                                                        id={`/${getAppStoreData.usertype}/my-profile`}
                                                        onClick={(e) => { handleOnClickNavLink(e); console.log("asdasdfsd"); }}
                                                    >
                                                        <i className='ti ti-user-pin'></i> My Profile
                                                    </Link>}
                                                <Link className='dropdown-item'
                                                    onClick={(e) => { handleOnQrCode(e) }}
                                                >
                                                    <i class="ti ti-qrcode"></i> Qr code
                                                </Link>
                                                <Link className='dropdown-item' to={"/"}>
                                                    <i className='ti ti-lock'></i> Logout
                                                </Link>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="dropdown mobile-user-menu">
                                <Link
                                    className={`nav-link dropdown-toggle ${clickProfile ? 'show' : ''}`}
                                    id="mobile-userprofile"
                                    onClick={handleOnClick}
                                    onBlur={handleOnBlur}
                                    aria-expanded={clickProfile}
                                    style={{ border: "none", boxShadow: "none", marginTop: "15px" }}
                                >
                                    <i className="fa fa-ellipsis-v"></i>
                                </Link>
                                <div
                                    className={`dropdown-menu ${clickProfile ? 'show' : ''}`}
                                    style={{
                                        position: 'absolute',
                                        inset: '0px 0px auto auto',
                                        margin: '0px',
                                        transform: 'translate(-20px, 28px)',
                                    }}
                                    data-popper-placement="bottom-end"
                                >
                                    <button
                                        className="dropdown-item"
                                        id='my-profile'
                                        onMouseDown={handleOnMouseDown}
                                        style={{ lineHeight: "30px" }}
                                    >
                                        <i className="ti ti-user-pin"></i> My Profile
                                    </button>
                                    <button
                                        className="dropdown-item"
                                        onMouseDown={handleOnQrCode}
                                        style={{ lineHeight: "30px" }}
                                    >
                                        <i className="ti ti-qrcode"></i> QR Code
                                    </button>
                                    <button
                                        className="dropdown-item"
                                        id='logout'
                                        onMouseDown={handleOnMouseDown}
                                        style={{ lineHeight: "30px" }}
                                    >
                                        <i className="ti ti-lock"></i> Logout
                                    </button>
                                </div>
                            </div>

                        </div>
                        <div className="sidebar" id="sidebar" onMouseEnter={handleOnMouseEnterSidebarOpen} onMouseLeave={handleOnMouseLeaveSidebarClose} >
                            <div className="scrollable slimScrollDiv " onMouseEnter={() => { fnEnableScrolling() }} onMouseLeave={() => { setHover(false) }} style={{ width: "100%", scrollBehavior: "smooth", overflowY: l_hover ? "scroll" : "hidden" }} >
                                <div className="sidebar-inner slimscroll" style={{ paddingRight: l_hover ? "" : "7px" }} >
                                    <div className="sidebar-menu" id='sidebar-menu' style={{ paddingRight: "8px" }}>
                                        <ul>
                                            <li className="clinicdropdown">
                                                <Link style={{ padding: sideBar ? "10px" : "" }}>
                                                    <img
                                                        className='img-fluid'
                                                        src="/download.jpg"
                                                        alt="Hotel"
                                                        style={{ width: "55px", height: "55px" }}
                                                    />
                                                    <div className="user-names">
                                                        {sideBar &&
                                                            <>
                                                                <h5>BCA</h5>
                                                                <h6>SKCW Canteen</h6>
                                                            </>
                                                        }
                                                    </div>
                                                </Link>
                                            </li>
                                        </ul>
                                        <ul >
                                            <li>
                                                <h6 className="submenu-hdr">Main Menu</h6>                                                <ul>
                                                    {ctlMainMenu.current.map((list, index) => {
                                                        return (
                                                            list.usertype === getAppStoreData.usertype && (
                                                                < li key={index} >
                                                                    <NavLink to={list.path} id={list.path} onClick={(e) => { handleOnClickNavLink(e) }} className={({ isActive }) => { return isActive ? "active" : "" }}>
                                                                        <i className={list.icon}></i>
                                                                        <span>{list.titlemenu}</span>
                                                                    </NavLink>
                                                                </li>
                                                            )
                                                        )
                                                    })}
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div >
                        </div >
                        <Outlet />
                    </div>
                </>
            )
            }
        </>
    )
}
