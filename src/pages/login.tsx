import {
    ActionFunctionArgs,
    Form,
    useActionData,
    useNavigate,
} from "react-router-dom";
import { myAxios } from "../helper/axiosInstance";
import { useEffect } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
    const navigate = useNavigate();
    const actionData = useActionData() as {
        message: string;
        status: number;
    } | null;

    useEffect(() => {
        myAxios.get("/api/v1/user/info").then(() => {
            navigate("/");
        });
    }, []);

    useEffect(() => {
        if (actionData?.status && actionData?.status < 300) {
            toast.success(actionData?.message + ", redirecting to homepage", {
                position: "top-center",
                autoClose: 1900,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });

            const navigateInterval = setInterval(() => {
                navigate("/");
            }, 2000);

            return () => {
                clearInterval(navigateInterval);
            };
        } else {
            toast.error(actionData?.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
    }, [actionData]);

    return (
        <section className="bg-gray-900">
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0 ">
                <div className="w-full  rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-white">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Login to your account
                        </h1>
                        <Form method="post" className="space-y-4 md:space-y-6">
                            <div>
                                <label
                                    htmlFor="username"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Your username
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="Place your username here"
                                    required
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Login
                            </button>
                            <p className="text-sm font-light text-gray-500">
                                Don't have an account?{" "}
                                <a
                                    href="/signup"
                                    className="font-medium text-primary-600 hover:underline"
                                >
                                    Sign up
                                </a>
                            </p>
                        </Form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export const loginAction = async ({ request }: ActionFunctionArgs) => {
    const data = Object.fromEntries(await request.formData());
    try {
        const res = await myAxios.post("/api/v1/user/login", data);
        return { message: res.data, status: res.status };
    } catch (error: any) {
        if (error.response) {
            const res = error.response;
            return { message: res.data, status: res.status };
        }
        return null;
    }
};
