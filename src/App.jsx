import './App.css';
import "@mui/material/Button";
import React from "react";
import {createBrowserRouter, Router, RouterProvider} from "react-router-dom";
import SearchPage from "./components/SearchPage";
import CandlesPage from "./components/CandlesPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <SearchPage/>,
    },
    {
        path: "/:ticker",
        element: <CandlesPage/>
    }
])

function App() {
    return (
        <div className="App">
            <React.StrictMode>
                <RouterProvider router={router}/>
            </React.StrictMode>
        </div>
    );
}

export default App;
