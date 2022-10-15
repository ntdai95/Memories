import { useEffect } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/authSlice";
import AddEditMemory from "./pages/AddEditMemory";
import SingleMemory from "./pages/SingleMemory";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/NotFound";
import TagMemories from "./pages/TagMemories";

function App() {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("profile"));
    useEffect(() => {
        dispatch(setUser(user));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
        <BrowserRouter>
            <div className="App">
                <Header />
                <ToastContainer />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/memories/search" element={<Home />} />
                    <Route path="/memories/tag/:tag" element={<TagMemories />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/addMemory"
                        element={
                            <PrivateRoute>
                                <AddEditMemory />
                            </PrivateRoute>
                        } />
                    <Route
                        path="/editMemory/:id"
                        element={
                            <PrivateRoute>
                                <AddEditMemory />
                            </PrivateRoute>
                        } />
                    <Route path="/memory/:id" element={<SingleMemory />} />
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        } />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;