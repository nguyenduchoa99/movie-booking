import AdminLayout from 'components/AdminLayout/AdminLayout';
import AuthLayout from 'components/AuthLayout';
import MainLayout from 'components/MainLayout';
import AddMovie from 'modules/Admin/pages/AdminMovie/AddMovie';
import AddShowTimes from 'modules/Admin/pages/AdminMovie/AddShowTimes';
import EditMovie from 'modules/Admin/pages/AdminMovie/EditMovie';
import MovieList from 'modules/Admin/pages/AdminMovie/MovieList';
import AddUser from 'modules/Admin/pages/AdminUser/AddUser';
import EditUser from 'modules/Admin/pages/AdminUser/EditUser';
import UserList from 'modules/Admin/pages/AdminUser/UserList';
import Login from 'modules/Authentication/pages/Login';
import Register from 'modules/Authentication/pages/Register';
import ErrorPage from 'modules/Error/page/ErrorPage';
import Home from 'modules/Home/pages/Home';
import Movie from 'modules/Movie/pages/Movie';
import Ticket from 'modules/Ticket/pages/Ticket';
import User from 'modules/User/page/User';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import CheckoutRoute from './CheckoutRoute';
const Routers = () => {
    const routing = useRoutes([
        {
            path: '/',
            element: <MainLayout />,
            children: [
                {
                    index: '/',
                    element: <Home />
                },
                {
                    path:'/movie/:movieId',
                    element:<Movie />
                },
                {
                    path:'/ticket/:ticketId',
                    element:<Ticket />
                },
                {
                    path: '/user',
                    element: <User />
                },
                {
                    path:'checkout/:checkoutId',
                    element:<CheckoutRoute />
                        
                    
                }
                

            ]
        },
        {
            path: '/',
            element: <AuthLayout />,
            children: [
                {
                    path: "/login",
                    element: <Login />
                },
                {
                    path: "/register",
                    element: <Register />
                }

            ]

        },
        {
            path: '/admin',
            element: <AdminLayout />,
            children: [
                {
                    path: '/admin/movieList',
                    element: <MovieList />,
                },
                {
                    path: '/admin/addMovie',
                    element: <AddMovie />,
                },
                {
                    path: '/admin/editMovie/:movieId',
                    element: <EditMovie />,
                },
                {
                    path: '/admin/showtimes/:movieId',
                    element: <AddShowTimes />,

                },
                {
                    path: '/admin/userList',
                    element: <UserList />,
                },
                {
                    path: '/admin/addUser',
                    element: <AddUser />,

                },
                {
                    path: '/admin/editUser/:userId',
                    element: <EditUser />,

                }
            ]
        },
        {
            path: '*',
            element: <ErrorPage />

        }
    ])
    return routing
}

export default Routers