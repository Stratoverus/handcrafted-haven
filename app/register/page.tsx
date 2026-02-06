import RegisterForm from "../ui/register/registerForm";

export default function Register(){
    return(
        <section>

            <div className="grid grid-cols-1 min-h-screen bg-gradient-to-br from-[#CF5C36] via-[#EFC88B] via-[#F4E3B2] to-[#FFF]">
                <RegisterForm />
            </div>

        </section>
    );
}
