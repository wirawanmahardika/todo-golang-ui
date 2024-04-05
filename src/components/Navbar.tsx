import { Link, useNavigate } from "react-router-dom";
import { myAxios } from "../helper/axiosInstance";

export default function Navbar() {
    const navigate = useNavigate();
    const logoutAction = async () => {
        const res = await myAxios.delete("/api/v1/user/logout");
        if (res.status < 300) {
            navigate("/login");
        }
    };

    return (
        <nav className="rounded flex gap-x-4 font-semibold">
            <Link className="hover:text-black transition" to={"/"}>
                Home
            </Link>
            <Link className="hover:text-black transition" to={"/login"}>
                Login
            </Link>
            <Link className="hover:text-black transition" to={"/signup"}>
                Signup
            </Link>
            <button
                onClick={logoutAction}
                className="hover:text-black transition"
            >
                Logout
            </button>
        </nav>
    );
}
