import './App.css';
import "@mui/material/Button";
import React from "react";
import {createHashRouter, RouterProvider} from "react-router-dom";
import SearchPage from "./components/SearchPage";
import CandlesPage from "./components/CandlesPage";

const router = createHashRouter([
    {
        path: "/",
        element: <SearchPage/>,
    },
    {
        path: "/share/:ticker",
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
