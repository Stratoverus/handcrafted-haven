import SelectRegion from "./selectRegion"
import GoogleAuthBtn from "../authBtns/googleAuthBtn";
import GitHubAuthBtn from "../authBtns/gitHubAuthBtn";

export default async function RegisterForm() {

    // wasup
    const res = await fetch("https://www.apicountries.com/countries", {cache: "no-store"});
    const data = await res.json();

    return (
        <>
            <div className="flex flex-col justify-center mb-8 px-6 lg:px-0 bg-pink">
                <div className="mt-0 sm:mx-auto sm:w-full">
        
                    <div className="flex flex-col gap-y-9 items-center">
                        <fieldset className=" bg-[#FFF] w-50 rounded-lg p-5 w-20 md:w-70 lg:w-100 shadow-xl/30">
                            <h2 className="text-center font-bold tracking-tight text-gray-900" style={{ fontSize: "1.5rem" }}>
                                Register your account with
                            </h2>

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

                            <form action="#" method="POST" className="flex flex-col space-y-6"> 
                                
                                <div className="flex min-h-full flex-col justify-center ">

                                    

                                    <div className="flex items-center p-2">
                                        <div className="h-px flex-1 bg-black/20" />
                                        <span className="mx-4 text-sm text-black/60">Or create an account</span>
                                        <div className="h-px flex-1 bg-black/20" />
                                    </div>

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

                                        {/* Region field */}
                                        <div className="mt-2">
                                            <label htmlFor="region" className="block text-sm/6 font-medium text-black-100">
                                                Region
                                            </label>
                                            <div className="mt-2 relative">
                                                <SelectRegion countries={data}/>
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
                                                className="block w-70 rounded-md bg-[#CF5C36] px-3 py-1.5 text-base font-medium text-white outline-1 -outline-offset-1 outline-white/10 hover:bg-[#b94f2f] transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 sm:text-sm/6 cursor-pointer" />
                                        </div>

                                    </div>
                                </div>
                            </form>
                        </fieldset>
                    </div>

                </div>
            </div>
        </>
    )
}