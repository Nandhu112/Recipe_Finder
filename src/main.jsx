import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from "react-router-dom"
import { Provider } from 'react-redux';
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import Home from './components/Home.jsx';
import Favorites from './components/Favorites.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>

    <Route path="/" element={<App/>}>
      <Route path="/home" element={<Home/>} />
      <Route path="/favorites" element={<Favorites/>} />
    </Route>
  </>
   
  )

)

ReactDOM.createRoot(document.getElementById('root')).render(

    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>

);