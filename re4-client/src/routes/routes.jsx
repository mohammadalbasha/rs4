import { createBrowserRouter, Outlet } from 'react-router-dom';
import LandingPage from '../pages/landing-page/landing-page';
import { ErrorPage } from '../pages/error/error';
import { Attentions } from '../components/profile-section/attentions/attentions';
import { Login } from '../components/login/login';
import { Authenticated } from './protected-routes/authenticated';
import { Surnames } from '../components/profile-section/surnames/surnames';
import { Groups } from '../components/profile-section/groups/groups';
import { Employees } from '../components/profile-section/employee/employees';
import { ConfirmAttention } from '../components/profile-section/attentions/confirm-attention/confirm-attention';
import { Authorized } from './protected-routes/authorized';

export const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    element: <LandingPage />,
    children: [
      {
        path: '/',
        element: (
          <Authenticated>
            <div style={{display: "flex", justifyContent:"center"}}>
            <img
             
             src="https://hstp-events.com/templates/jl_balder_pro/custom/images/logo.png"
           />
            </div>

                    </Authenticated>
        )
      },
      {
        path: '/profile/attentions',
        element: (
          <Authorized action="manage" subject="attention">
            <Attentions />
          </Authorized>
        )
        // errorElement: <CreatePost.ErrorBoundary />,
      },
      {
        path: '/profile/general',
        element: (
          <Authenticated>
            <>Hello</>
          </Authenticated>
        )
      },
      {
        path: '/clients/attentions/:id/confirm',
        element: <ConfirmAttention />
        // errorElement: <CreatePost.ErrorBoundary />,
      },
      {
        path: '/profile/surnames',
        element: (
          <Authorized action="manage" subject="surname">
            <Surnames />
          </Authorized>
        )
        // errorElement: <CreatePost.ErrorBoundary />,
      },
      {
        path: '/profile/groups',
        element: (
          <Authorized action="manage" subject="group">
            <Groups />
          </Authorized>
        )
        // errorElement: <CreatePost.ErrorBoundary />,
      },
      {
        path: '/profile/employees',
        element: (
          <Authorized action="manage" subject="centralUser">
            <Employees />
          </Authorized>
        )
        // errorElement: <CreatePost.ErrorBoundary />,
      },
      {
        path: '/login',
        element: <Login />
        // errorElement: <CreatePost.ErrorBoundary />,
      }
      //   {
      //     path: "/post/:postId",
      //     element: <SinglePost />,
      //     loader: SinglePost.loader,
      //   },
    ]
  }
]);
