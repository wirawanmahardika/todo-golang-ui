import { useEffect } from "react";
import {
    ActionFunctionArgs,
    Form,
    useActionData,
    useNavigate,
} from "react-router-dom";
import { myAxios } from "../helper/axiosInstance";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup() {
    const navigate = useNavigate();
    const actionData = useActionData() as { message: string; status: number };

    useEffect(() => {
        if (actionData?.status < 300) {
            toast.success(actionData?.message, {
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

    useEffect(() => {
        myAxios.get("/api/v1/user/info").then(() => {
            navigate("/");
        });
    }, []);

    return (
        <section className="bg-gray-900 py-8">
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
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8 h-fit">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                            Sign Up
                        </h1>

                        <Form
                            method="post"
                            className="space-y-4 md:space-y-6 h-fit"
                        >
                            <div>
                                <label
                                    htmlFor="fullname"
                                    className="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    Fullname
                                </label>
                                <input
                                    type="text"
                                    name="fullname"
                                    id="fullname"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="john doe"
                                    required
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="name@gmail.com"
                                    required
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="username"
                                    className="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    Your username
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="johndoe"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 "
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
                                Signup
                            </button>
                            <p className="text-sm font-light text-gray-500">
                                Already have an account?{" "}
                                <a
                                    href="/login"
                                    className="font-medium text-primary-600 hover:underline"
                                >
                                    Login
                                </a>
                            </p>
                        </Form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export const signupAction = async ({ request }: ActionFunctionArgs) => {
    const data = Object.fromEntries(await request.formData()) as {
        fullname: string;
        username: string;
        email: string;
        password: string;
    };

    try {
        const res = await myAxios.post("/api/v1/user/signup", data);
        return { message: res.data, status: 200 };
    } catch (error: any) {
        console.log(error);

        return { message: error.response.data, status: 422 };
    }
};
