import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Main/Main";
import Home from "../Pages/Home/Home";
import Login from "../Authentication/Login";
import SignUp from "../Authentication/SignUp";
import AddNumber from "../Pages/Add Number/AddNumber";
import Deposit from "../Pages/Deposit/Deposit";
import ConfirmDeposit from "../Pages/Deposit/ConfirmDeposit";
import MyTransaction from "../Pages/My Transaction/MyTransaction";
import ManageOrder from "../Pages/Manage Order/ManageOrder";
import MyInventory from "../Pages/MyInventory/MyInventory";
import AllUsers from "../Pages/All Users/AllUsers";
import Withdraw from "../Pages/Withdraw/Withdraw";
import WithdrawalControl from "../Pages/WithdrawalControl/WithdrawalControl";
import ConfirmWithdraw from "../Pages/Withdraw/ConfirmWithdraw";
import ManageWithdraw from "../Pages/ManageWithdraw/ManageWithdraw";
import MyWithdraw from "../Pages/MyWithdraw/MyWithdraw";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import AllTransactions from "../Pages/AllTransactions/AllTransactions";
import UpdateWithdraw from "../Pages/UpdateWithdraw/UpdateWithdraw";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <SignUp />
            },


            {
                path: '/add-number',
                element: <AdminRoute><PrivateRoute><AddNumber /></PrivateRoute></AdminRoute>
            },
            {
                path: '/manage-deposit',
                element:<AdminRoute> <PrivateRoute><ManageOrder /></PrivateRoute></AdminRoute>
            },
            {
                path: '/update-number',
                element:<AdminRoute> <PrivateRoute><MyInventory /></PrivateRoute></AdminRoute>
            },
            {
                path: '/all-users',
                element: <AdminRoute><PrivateRoute><AllUsers /></PrivateRoute></AdminRoute>
            },
            {
                path: '/add-withdrawal',
                element: <AdminRoute><PrivateRoute><WithdrawalControl /></PrivateRoute></AdminRoute>
            },
            {
                path: '/manage-withdraw',
                element: <AdminRoute><PrivateRoute><ManageWithdraw /></PrivateRoute></AdminRoute>
            },
            {
                path: '/update-withdraw',
                element: <AdminRoute><PrivateRoute><UpdateWithdraw/></PrivateRoute></AdminRoute>
            },




            {
                path: '/deposit',
                element: <PrivateRoute><Deposit /></PrivateRoute>
            },
            {
                path: '/confirm-Deposit/:id',
                element: <PrivateRoute><ConfirmDeposit /></PrivateRoute>
            },
            {
                path: '/my-deposit',
                element: <PrivateRoute><MyTransaction /></PrivateRoute>
            },


            {
                path: '/withdraw',
                element: <PrivateRoute><Withdraw /></PrivateRoute>
            },
            {
                path: '/confirm-withdraw/:id',
                element: <PrivateRoute><ConfirmWithdraw /></PrivateRoute>
            },
           
            {
                path: '/my-withdraw',
                element: <PrivateRoute><MyWithdraw /></PrivateRoute>
            },
            {
                path: '/all-transactions',
                element: <AllTransactions />
            }
        ]
    }
]);
