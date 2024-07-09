import { Button } from "@/components/ui/button"
import { BrowserRouter , Routes, Route} from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute"
import Todo from "./pages/Todo"
function App() {


  return (
    <BrowserRouter>
      <ToastContainer/>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/sign-in" element={<Signin/>}></Route>
          <Route path="/sign-up" element={<Signup/>}></Route>
          <Route element = {<PrivateRoute/>}>
            <Route path="/todo" element={<Todo/>}></Route>
          </Route>
        </Routes>
        <Footer/>
    </BrowserRouter>
  )
}

export default App
