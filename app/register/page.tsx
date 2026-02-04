import RegisterForm from "../ui/register/registerForm";

export default function Register(){
    return(
        <section>

            <div className="sm:bg-none sm:grid grid-cols-2 min-h-screen bg-gradient-to-b from-[#CF5C36] via-[#EFC88B] via-[#F4E3B2] to-[#FFF]">

                <div className="hidden sm:block min-h-screen bg-gradient-to-r from-[#CF5C36] via-[#EFC88B] via-[#F4E3B2] to-[#FFFFFF] ">
                    {/* There're background color here */}
                </div>

                <RegisterForm />

            </div>

        </section>
    );
}
