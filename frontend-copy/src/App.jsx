import Navbar from "./components/Navbar/Navbar"
import HomePage from "./routes/homePage/homePage"
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import ListPage from "./routes/listPage/listPage"
import Layout from "./routes/Layout/layout";
import SinglePage from "./routes/singlePage/singlePage";
import ProfilePage from "./routes/profilePage/profilePage";


function App() {
  const router=createBrowserRouter(
    [
      {
        path:"/",
        element:<Layout/>,
        children:[
          {
            path:"/",
            element:<HomePage/>
          },
          {
            path:"/list",
            element:<ListPage/>
          },
          {
            path:"/:id",
            element:<SinglePage/>
          },
          {
            path:"/profile",
            element:<ProfilePage/>
          }
        ]
      }
    ]);
  
  return (
    <RouterProvider router={router}/>
  )
}

export default App
