"use client";

import { FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";

const Signup = () => {
    const [error, setError] = useState();
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const formData = new FormData(event.currentTarget);
            const signupResponse = await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/signup`, {
                email: formData.get("email"),
                password: formData.get("password"),
                name: formData.get("name"),
            });

            await signIn("credentials", {
                email: signupResponse.data.email,
                password: formData.get("password"),
                redirect: true,
            });

        } catch (error) {
            console.log(error);
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data.message;
                setError(errorMessage);
            }
        }
    };

    return (
        <section className="h-screen flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="p-6 xs:p-10 w-full max-w-[350px] flex flex-col justify-between items-center gap-2.5	
                bg-[#202123] rounded text-white"
            >
                {error && <div className="">{error}</div>}
                <h1 className="w-full my-5 text-2xl font-bold text-center">Create an account</h1>

                <input
                    type="text"
                    placeholder="Fullname"
                    className="w-full h-8 border border-solid border-[#4D4D4F] py-1 px-2.5 rounded bg-[#2A2B32] text-[13px] focus:outline-none focus:border-[#4D4D4F]"
                    name="name"
                />

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full h-8 mt-2.5 border border-solid border-[#4D4D4F] py-1 px-2.5 rounded bg-[#2A2B32] text-[13px] focus:outline-none focus:border-[#4D4D4F]"
                    name="email"
                />

                <div className="flex w-full mt-2.5">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="w-full h-8 border border-solid border-[#4D4D4F] py-1 px-2.5 rounded-l bg-[#2A2B32] text-[13px] focus:outline-none focus:border-[#4D4D4F]"
                        name="password"
                    />
                    <button
                        className="w-2/12 border-y border-r border-solid border-[#4D4D4F] bg-[#2A2B32] rounded-r flex items-center justify-center transition duration-150 ease hover:bg-[#202123]"
                        onClick={(e) => {
                            e.preventDefault();
                            setShowPassword(!showPassword)
                        }}
                        type='button'
                    >
                        {showPassword
                            ? <svg
                                data-testid="geist-icon"
                                height="16"
                                strokeLinejoin="round"
                                viewBox="0 0 16 16"
                                width="16"
                                style={{ color: 'currentColor' }}
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M4.02168 4.76932C6.11619 2.33698 9.88374 2.33698 11.9783 4.76932L14.7602 7.99999L11.9783 11.2307C9.88374 13.663 6.1162 13.663 4.02168 11.2307L1.23971 7.99999L4.02168 4.76932ZM13.1149 3.79054C10.422 0.663244 5.57797 0.663247 2.88503 3.79054L-0.318359 7.5106V8.48938L2.88503 12.2094C5.57797 15.3367 10.422 15.3367 13.1149 12.2094L16.3183 8.48938V7.5106L13.1149 3.79054ZM6.49997 7.99999C6.49997 7.17157 7.17154 6.49999 7.99997 6.49999C8.82839 6.49999 9.49997 7.17157 9.49997 7.99999C9.49997 8.82842 8.82839 9.49999 7.99997 9.49999C7.17154 9.49999 6.49997 8.82842 6.49997 7.99999ZM7.99997 4.99999C6.34311 4.99999 4.99997 6.34314 4.99997 7.99999C4.99997 9.65685 6.34311 11 7.99997 11C9.65682 11 11 9.65685 11 7.99999C11 6.34314 9.65682 4.99999 7.99997 4.99999Z"
                                    fill="currentColor"
                                ></path>
                            </svg>
                            : <svg
                                data-testid="geist-icon"
                                height="16"
                                strokeLinejoin="round"
                                viewBox="0 0 16 16"
                                width="16"
                                style={{ color: 'currentColor' }}
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M0.191137 2.06228L0.751694 2.56055L14.2517 14.5605L14.8122 15.0588L15.8088 13.9377L15.2482 13.4394L13.4399 11.832L16.3183 8.48938V7.51059L13.1149 3.79053C10.6442 0.921301 6.36413 0.684726 3.59378 3.07992L1.74824 1.43943L1.18768 0.941162L0.191137 2.06228ZM14.7602 7.99998L12.3187 10.8354L10.6699 9.36978C11.249 8.24171 11.0661 6.82347 10.1213 5.87865C9.08954 4.8469 7.49326 4.72376 6.32676 5.50923L4.72751 4.08767C6.88288 2.36327 10.1023 2.59076 11.9783 4.76931L14.7602 7.99998ZM7.52702 6.57613L9.46929 8.30259C9.56713 7.82531 9.43091 7.30959 9.06063 6.93931C8.64578 6.52446 8.0484 6.4034 7.52702 6.57613ZM-0.318359 7.51059L1.40386 5.5106L2.54051 6.48938L1.23971 7.99998L4.02168 11.2307C5.52853 12.9805 7.90301 13.4734 9.89972 12.7017L10.4405 14.1008C7.88008 15.0904 4.82516 14.4625 2.88503 12.2094L-0.318359 8.48938V7.51059Z"
                                    fill="currentColor"
                                ></path>
                            </svg>}
                    </button>
                </div>

                <button className="w-full bg-[#2A2B32] border border-solid border-[#4D4D4F] py-1.5 mt-4 rounded transition duration-150 ease hover:bg-[#202123] text-[13px]"
                    type='submit'
                >
                    Signup
                </button>

                <div className="relative flex items-center justify-center w-full h-10">
                    <div className="absolute h-px w-full top-2/4 bg-[#4D4D4F]"></div>
                    <p className="w-8 h-6 bg-[#202123] z-10 text-xs flex items-center justify-center">OR</p>
                </div>

                <button
                    className="flex py-2 px-4 text-sm	align-middle items-center rounded text-999 bg-[#2A2B32] 
                        border border-solid border-[#4D4D4F] transition duration-150 ease hover:bg-[#202123] gap-3"
                    onClick={() => signIn("google")}
                    type='button'
                >
                    <svg
                        data-testid="geist-icon"
                        height="20"
                        strokeLinejoin="round"
                        viewBox="0 0 16 16"
                        width="20"
                        style={{ color: 'currentColor' }}
                    >
                        <path
                            d="M8.15991 6.54543V9.64362H12.4654C12.2763 10.64 11.709 11.4837 10.8581 12.0509L13.4544 14.0655C14.9671 12.6692 15.8399 10.6182 15.8399 8.18188C15.8399 7.61461 15.789 7.06911 15.6944 6.54552L8.15991 6.54543Z"
                            fill="#4285F4"
                        ></path>
                        <path
                            d="M3.6764 9.52268L3.09083 9.97093L1.01807 11.5855C2.33443 14.1963 5.03241 16 8.15966 16C10.3196 16 12.1305 15.2873 13.4542 14.0655L10.8578 12.0509C10.1451 12.5309 9.23598 12.8219 8.15966 12.8219C6.07967 12.8219 4.31245 11.4182 3.67967 9.5273L3.6764 9.52268Z"
                            fill="#34A853"
                        ></path>
                        <path
                            d="M1.01803 4.41455C0.472607 5.49087 0.159912 6.70543 0.159912 7.99995C0.159912 9.29447 0.472607 10.509 1.01803 11.5854C1.01803 11.5926 3.6799 9.51991 3.6799 9.51991C3.5199 9.03991 3.42532 8.53085 3.42532 7.99987C3.42532 7.46889 3.5199 6.95983 3.6799 6.47983L1.01803 4.41455Z"
                            fill="#FBBC05"
                        ></path>
                        <path
                            d="M8.15982 3.18545C9.33802 3.18545 10.3853 3.59271 11.2216 4.37818L13.5125 2.0873C12.1234 0.792777 10.3199 0 8.15982 0C5.03257 0 2.33443 1.79636 1.01807 4.41455L3.67985 6.48001C4.31254 4.58908 6.07983 3.18545 8.15982 3.18545Z"
                            fill="#EA4335"
                        ></path>
                    </svg> Sign in with Google
                </button>
                <Link href="/login" className="text-sm text-[#8e8ea0] transition duration-150 ease hover:text-white">
                    Already have an account?
                </Link>
            </form>
        </section>
    );
}

export default Signup;
