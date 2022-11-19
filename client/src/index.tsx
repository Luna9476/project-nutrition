import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import SignInSide from './components/Login';
import Profile from './components/Profile';
import SignUp from './components/SingUp';
import History from './components/History';
import './index.css';
import { getCurrentUser } from './services/auth.service';
import { Dashboard } from './components/Dashboard';
import { ThemeProvider } from '@emotion/react';
import createTheme from '@mui/material/styles/createTheme';
import Food from './components/Food';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: getCurrentUser() ? <Dashboard /> : <Navigate replace to={"/login"} />,
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "/login",
    element: <SignInSide />
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <Profile />
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "history",
        element: <History />
      },
      {
        path: "foods",
        element: <Food />
      }
    ]
  }
]);

const theme = createTheme({
  palette: {
    primary: {
      main: '#40916C'
    },
    info: {
      main: '#b7e4c7'
    }
  },
});

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />

    </ThemeProvider>
  </React.StrictMode>
);
