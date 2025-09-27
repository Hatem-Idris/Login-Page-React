import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Login from "./loginpage";
import { Toaster } from "react-hot-toast";
import Homepage from "./Homepage";

export default function App() {
  return(
    <div>
    <Toaster/>
    <BrowserRouter>
    <Routes>
      <Route path="/">
      <Route index element={<Homepage/>}/>
      <Route path="login" element={<Login/>}/>
      </Route>
      <Route path="*" element={<h1 className="text-7xl flex justify-center items-center h-dvh">Error 404 page not found</h1>}/>
    </Routes>
    </BrowserRouter>
    </div>
  )
}