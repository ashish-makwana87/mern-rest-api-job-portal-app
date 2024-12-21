import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  AddJob,
  Admin,
  AllJobs,
  DashboardLayout,
  Error,
  Landing,
  Login,
  Profile,
  Register,
  SiteLayout,
  Stats,
} from "./pages";
import {action as registerAction} from './pages/Register'

const router = createBrowserRouter([
  {
    path: "/",
    element: <SiteLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Landing /> },
      { path: "register", element: <Register />, action: registerAction },
      { path: "login", element: <Login /> },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          { index: true, element: <AddJob /> },
          { path: "stats", element: <Stats /> },
          { path: "all-jobs", element: <AllJobs /> },
          { path: "profile", element: <Profile /> },
          { path: "admin", element: <Admin /> },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
