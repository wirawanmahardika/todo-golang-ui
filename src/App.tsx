import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import Home, { homeLoader } from "./pages/home";
import Login, { loginAction } from "./pages/login";
import Signup from "./pages/signup";

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<Home />} loader={homeLoader} />
                <Route path="/login" element={<Login />} action={loginAction} />
                <Route path="/signup" element={<Signup />} />
            </>
        )
    );

    return <RouterProvider router={router} />;
}

export default App;
