// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from './assets/theme/theme'
import App from './App'

// pages (we’ll add them in step 3)
import Home from './components/pages/Home.jsx'
import CompanyRFQs from './components/pages/CompanyRFQs.jsx'
import NewRFQ from './components/pages/NewRFQ.jsx'
import SupplierRFQ from './components/pages/SupplierRFQ.jsx'
import SupplierRFQs from './components/pages/SupplierRFQs.jsx';
import ReviewRFQ from './components/pages/ReviewRFQ.jsx'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        { index: true, element: <Home /> },
        { path: 'company/rfqs', element: <CompanyRFQs /> },
        { path: 'company/rfqs/new', element: <NewRFQ /> },
        { path: 'company/rfqs/:id/review', element: <ReviewRFQ /> },
        { path: "supplier/rfqs", element: <SupplierRFQs /> },
        { path: "supplier/rfqs/:id", element: <SupplierRFQ /> },
      ],
    },
  ],
  {
    basename: "/demo-rfq-react", 
  }
);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
