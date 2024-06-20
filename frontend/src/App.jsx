import Navbar from "./components/Navbar/Navbar"
import HomePage from "./routes/homePage/homePage"
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ListPage from "./routes/listPage/listPage"
import { Layout, RequireAuth } from "./routes/Layout/layout";
import SinglePage from "./routes/singlePage/singlePage";
import ProfilePage from "./routes/profilePage/profilePage";
import Register from "./routes/register/register";
import Login from "./routes/login/login";
import ProfileUpdatePage from "./routes/profileUpdatePage/profileUpdatePage";
import NewPostPage from "./routes/newPostPage/newPostPage";
import { listLoaderPage, profileLoaderPage, singleLoaderPage } from "./lib/loader";


function App() {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <HomePage />
          },
          {
            path: "/list",
            element: <ListPage />,
            loader: listLoaderPage
          },
          {
            path: "/:id",
            element: <SinglePage />,
            loader: singleLoaderPage
          },
          {
            path: "/register",
            element: <Register />
          },
          {
            path: "/login",
            element: <Login />
          }
        ]
      },
      {
        path: "/",
        element: <RequireAuth />,
        children: [
          {
            path: "/profile",
            element: <ProfilePage />,
            loader:profileLoaderPage
          },
          {
            path: "/profile/update",
            element: <ProfileUpdatePage />
          },
          {
            path: "/add",
            element: <NewPostPage />
          }
        ]
      }
    ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
