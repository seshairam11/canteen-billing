import React, { lazy, Suspense } from 'react'
import { OPLoader } from './ComponentOP/OPLoader';
import { useSelector } from 'react-redux';
import { OPAddStudent } from './PagesOP/OPAddStudent';
import { OPViewStudents } from './PagesOP/OPViewStudents';
import { OPUserEntry } from './PagesOP/OPUserEntry';
import { OPServerOrderPayment } from './PagesOP/OPServerOrderPayment';
import { OPServerProfile } from './PagesOP/OPServerProfile';
import { OPAdminOrderStatus } from './PagesOP/OPAdminOrderStatus';
import { OPEmployeeSignup } from './PagesOP/OPEmployeeSignup';

const OPEntry = lazy(() => import("./PagesOP/OPEntry").then(module => ({ default: module.OPEntry })));
const OPHotelEntry = lazy(() => import("./PagesOP/OPHotelEntry").then(module => ({ default: module.OPHotelEntry })));
const OPHotelUser = lazy(() => import("./PagesOP/OPHotelUser").then(module => ({ default: module.OPHotelUser })));
const OPHotelSettings = lazy(() => import("./PagesOP/OPHotelSettings").then(module => ({ default: module.OPHotelSettings })));
const OPAddEmployees = lazy(() => import("./PagesOP/OPAddEmployees").then(module => ({ default: module.OPAddEmployees })));
const OPViewEmployees = lazy(() => import("./PagesOP/OPViewEmployees").then(module => ({ default: module.OPViewEmployees })));
const OPAddBench = lazy(() => import("./PagesOP/OPAddBench").then(module => ({ default: module.OPAddBench })));
const OPViewBench = lazy(() => import("./PagesOP/OPViewBench").then(module => ({ default: module.OPViewBench })));
const OPViewMenuCard = lazy(() => import("./PagesOP/OPViewMenuCard").then(module => ({ default: module.OPViewMenuCard })));
const OPAddMenuCard = lazy(() => import("./PagesOP/OPAddMenuCard").then(module => ({ default: module.OPAddMenuCard })));
const OPHotelSignup = lazy(() => import("./PagesOP/OPHotelSignup").then(module => ({ default: module.OPHotelSignup })))
const OPHotelLogin = lazy(() => import("./PagesOP/OPHotelLogin").then(module => ({ default: module.OPHotelLogin })))
const OPEmployeeEntry = lazy(() => import("./PagesOP/OPEmployeeEntry").then(module => ({ default: module.OPEmployeeEntry })))
const OPEmployeeLogin = lazy(() => import("./PagesOP/OPEmployeeLogin").then(module => ({ default: module.OPEmployeeLogin })))
const OPEmployeeUser = lazy(() => import("./PagesOP/OPEmployeeUser").then(module => ({ default: module.OPEmployeeUser })))
const OPEmployeeSettings = lazy(() => import("./PagesOP/OPEmployeeSettings").then(module => ({ default: module.OPEmployeeSettings })))
const OPServerOrderPlacing = lazy(() => import("./PagesOP/OPServerOrderPlacing").then(module => ({ default: module.OPServerOrderPlacing })))
const OPServerOrderProcessing = lazy(() => import("./PagesOP/OPSeverOrderProcessing").then(module => ({ default: module.OPServerOrderProcessing })))
const OPServerOrderCompleted = lazy(() => import("./PagesOP/OPSeverOrderCompleted").then(module => ({ default: module.OPServerOrderCompleted })))
const OPChefOrderTaking = lazy(() => import("./PagesOP/OPChefOrderTaking").then(module => ({ default: module.OPChefOrderTaking })))
const OPChefOrderCompleted = lazy(() => import("./PagesOP/OPChefOrderCompleted").then(module => ({ default: module.OPChefOrderCompleted })))
const OPCasherBilling = lazy(() => import("./PagesOP/OPCasherBilling").then(module => ({ default: module.OPCasherBilling })))
const OPError404 = lazy(() => import("./PagesOP/OPError404").then(module => ({ default: module.OPError404 })))

export const OPRoutes = () => {
    const getAppStoreData = useSelector((state) => state.appstate.login_info);
    return [
        {
            path: "/",
            element: (
                <Suspense fallback={<OPLoader />}>
                    <OPEntry />
                </Suspense>
            ),
            isloggedin: false,
        },
        {
            path: "/canteen",
            element: (
                <Suspense fallback={<OPLoader />}>
                    <OPHotelEntry />
                </Suspense>
            ),
            isloggedin: false,
        },
        {
            path: "/student",
            element: (
                <Suspense fallback={<OPLoader />}>
                    <OPEmployeeEntry />
                </Suspense>
            ),
            isloggedin: false,
        },
        {
            path: "/canteen/canteen-login",
            element: (
                <Suspense fallback={<OPLoader />}>
                    <OPHotelLogin />
                </Suspense>
            ),
            isloggedin: false,
        },
        {
            path: "/canteen/canteen-signup",
            element: (
                <Suspense fallback={<OPLoader />}>
                    <OPHotelSignup />
                </Suspense>
            ),
            isloggedin: false,
        },
        {
            path: "/student/student-login",
            element: (
                <Suspense fallback={<OPLoader />}>
                    <OPUserEntry />
                </Suspense>
            ),
            isloggedin: false,
        },
        {
            path: "/student/student-signup",
            element: (
                <Suspense fallback={<OPLoader />}>
                    <OPEmployeeSignup />
                </Suspense>
            ),
            isloggedin: false,
        },
        {
            path: `/${getAppStoreData.usertype}/settings`,
            element: (
                <Suspense fallback={<OPLoader />}>
                    <OPEmployeeSettings />
                </Suspense>
            ),
            isloggedin: true,
        },
        {
            path: `/student/order-placing`,
            element: (
                <Suspense fallback={<OPLoader />}>
                    <OPServerOrderPlacing />
                </Suspense>
            ),
            isloggedin: true,
        },
        {
            path: `/student/order-payment`,
            element: (
                <Suspense fallback={<OPLoader />}>
                    <OPServerOrderPayment />
                </Suspense>
            ),
            isloggedin: true,
        },
        {
            path: `/student/order-processing`,
            element: (
                <Suspense fallback={<OPLoader />}>
                    <OPServerOrderProcessing />
                </Suspense>
            ),
            isloggedin: true,
        },
        {
            path: `/student/order-Completed`,
            element: (
                <Suspense fallback={<OPLoader />}>
                    <OPServerOrderCompleted />
                </Suspense>
            ),
            isloggedin: true,
        },
        {
            path: `/canteen/order-taking`,
            element: (
                <Suspense fallback={<OPLoader />}>
                    <OPChefOrderTaking />
                </Suspense>
            ),
            isloggedin: true,
        },
        {
            path: `/canteen/order-done`,
            element: (
                <Suspense fallback={<OPLoader />}>
                    <OPChefOrderCompleted />
                </Suspense>
            ),
            isloggedin: true,
        },
        {
            path: `/canteen/order-close`,
            element: (
                <Suspense fallback={<OPLoader />}>
                    <OPCasherBilling />
                </Suspense>
            ),
            isloggedin: true,
        },
        {
            path: `/canteen/my-profile`,
            element: (
                <Suspense fallback={<OPLoader />}>
                    <OPHotelUser />
                </Suspense>
            ),
            isloggedin: true,
        },
        {
            path: `/canteen/addemployees`,
            element: (
                <Suspense fallback={<OPLoader />}>
                    <OPAddEmployees />
                </Suspense>
            ),
            isloggedin: true,
        },
        {
            path: `/canteen/viewemployees`,
            element: (
                <Suspense fallback={<OPLoader />}>
                    <OPViewEmployees />
                </Suspense>
            ),
            isloggedin: true,
        },
        {
            path: `/canteen/addtable`,
            element: (
                <Suspense fallback={<OPLoader />}>
                    <OPAddBench />
                </Suspense>
            ),
            isloggedin: true,
        },
        {
            path: `/canteen/viewtable`,
            element: (
                <Suspense fallback={<OPLoader />}>
                    <OPViewBench />
                </Suspense>
            ),
            isloggedin: true,
        },
        {
            path: `/canteen/settings`,
            element: (
                <Suspense fallback={<OPLoader />}>
                    <OPHotelSettings />
                </Suspense>
            ),
            isloggedin: true,
        },
        {
            path: `/canteen/addmenucard`,
            element: (
                <Suspense fallback={<OPLoader />}>
                    <OPAddMenuCard />
                </Suspense>
            ),
            isloggedin: true,
        },
        {
            path: `/canteen/viewmenucard`,
            element: (
                <Suspense fallback={<OPLoader />}>
                    <OPViewMenuCard />
                </Suspense>
            ),
            isloggedin: true,
        },
        {
            path: `/canteen/addstudents`,
            element: (
                <Suspense fallback={<OPLoader />}>
                    <OPAddStudent />
                </Suspense>
            ),
            isloggedin: true,
        },
        {
            path: `/canteen/viewstudent`,
            element: (
                <Suspense fallback={<OPLoader />}>
                    <OPViewStudents />
                </Suspense>
            ),
            isloggedin: true,
        },
        {
            path: `/canteen/vieworders`,
            element: (
                <Suspense fallback={<OPLoader />}>
                    <OPAdminOrderStatus />
                </Suspense>
            ),
            isloggedin: true,
        },
        {
            path: `/student/my-profile`,
            element: (
                <Suspense fallback={<OPLoader />}>
                    <OPServerProfile />
                </Suspense>
            ),
            isloggedin: true,
        },
        {
            path: "*",
            element: (
                <Suspense fallback={<OPLoader />}>
                    <OPError404 />
                </Suspense>
            ),
            isloggedin: false,
        },
    ]
}
