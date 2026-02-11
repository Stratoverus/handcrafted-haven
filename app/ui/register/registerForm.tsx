import SelectRegion from "./selectRegion"
import GoogleAuthBtn from "../authBtns/googleAuthBtn";
import GitHubAuthBtn from "../authBtns/gitHubAuthBtn";

export default function RegisterForm() {

    return (
        <>
            <div className="flex flex-col justify-center mb-8 px-6 lg:px-0 bg-pink">
                <div className="mt-0 sm:mx-auto sm:w-full">
        
                    <div className="flex flex-col gap-y-9 items-center">
                        <fieldset className=" bg-[#FFF] w-50 rounded-lg p-5 w-20 md:w-70 lg:w-100 shadow-xl/30">
                            <h2 className="p-2 mb-2 text-center font-bold tracking-tight text-gray-900" style={{ fontSize: "1.5rem" }}>
                                Register your account with
                            </h2>

                            <form action="#" method="POST" className="flex flex-col space-y-6"> 
                                
                                <div className="flex min-h-full flex-col justify-center ">

                                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                                        {/* Full name field */}
                                        <div>
                                            <label htmlFor="fullName" className="block text-sm/6 font-medium text-black-100">
                                                Full Name
                                            </label>    
                                            <div className="mt-2">
                                                <input
                                                    id="fullName"
                                                    name="fullName"
                                                    type="text"
                                                    required
                                                    placeholder="type your full name"
                                                    className="block w-full border border-black rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-black-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                                />
                                            </div>
                                        </div>
                                        
                                        {/* Email Field */}
                                        <div className="mt-2">
                                            <label htmlFor="email" className="block text-sm/6 font-medium text-black-100">
                                                Email address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    required
                                                    autoComplete="email"
                                                    placeholder="user@exemple.com"
                                                    className="block w-full border border-black rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-black-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                                />
                                            </div>
                                        </div>

                                        {/* Password Field */}
                                        <div className="mt-2">
                                            <div className="flex items-center justify-between">
                                                <label htmlFor="password" className="block text-sm/6 font-medium text-black-100">
                                                    Password
                                                </label>
                                            </div>
                                            <div className="mt-2">
                                                <input
                                                    id="password"
                                                    name="password"
                                                    type="password"
                                                    required
                                                    autoComplete="current-password"
                                                    placeholder="****************"
                                                    className="block w-full border border-black rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-black-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                                />
                                            </div>
                                        </div>

                                        {/* Submit Field */}
                                        <div className="flex justify-center mt-7">
                                            <input 
                                                type="submit"
                                                value="Create account" 
                                                className="w-full bg-[#CF5C36] rounded-lg p-2 text-white hover:bg-[#CF5C36]/80" />
                                        </div>

                                    </div>
                                </div>
                            </form>

                            <div className="flex items-center p-2 mt-4">
                                <div className="h-px flex-1 bg-black/20" />
                                    <span className="mx-4 text-sm text-black/60">Or continue with</span>
                                <div className="h-px flex-1 bg-black/20" />
                            </div>

                            <div className="flex flex-col gap-2 items-center">
                                <div className="gap-2 p-2">
                                    
                                    <div className="flex flex-col gap-2 p-2">
                                        {/* Google Btn */}
                                        <GoogleAuthBtn />

                                        {/* GitHub Btn */}
                                        <GitHubAuthBtn />                    
                                    </div>

                                </div>
                            </div>

                        </fieldset>
                    </div>

                </div>
            </div>
        </>
    )
}