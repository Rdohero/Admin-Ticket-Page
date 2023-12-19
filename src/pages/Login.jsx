import {Link} from "react-router-dom";
import {BiUser} from "react-icons/bi";
import {AiOutlineEye, AiOutlineEyeInvisible, AiOutlineLock} from "react-icons/ai";
import {useState} from "react";
import {login} from "../service/authService.js";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    // const [token, setToken] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const email = e.target.elements.email.value;
            const password = e.target.elements.password.value;

            const token2 = await login(email,password);
            if (rememberMe === true) {
                window.localStorage.setItem("token", token2);
                window.localStorage.setItem("isLoggedIn", true);
                window.location.href = "/";
            } else {
                window.sessionStorage.setItem("token", token2);
                window.sessionStorage.setItem("isLoggedIn", true);
                window.location.href = "/";
            }
            e.target.elements.email.value = "";
            e.target.elements.password.value = "";
            console.log("Login successful! Token:", token2);
        } catch (error) {
            console.error(error.message);
        }
    };

    // const printToken = () => {
    //     console.log(token)
    //     console.log(window.sessionStorage.getItem("token"));
    // };
    //
    // const clearToken = () => {
    //     window.sessionStorage.clear();
    // };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleRememberMe = () => {
        setRememberMe(!rememberMe);
    };

    return (
        <div className="h-screen">
            <div className='h-full flex justify-center items-center bg-blue-500'>
                <div className="bg-slate-50 rounded-[15px] p-6 shadow-lg backdrop-filter backdrop-blur-sm relative">
                    <h1 className="text-4xl text-center mb-6">Log in</h1>
                    <h1 className="font-montserrat font-medium text-xs text-[#727272] text-center mb-10">
                        Welcome! Select method to log in
                    </h1>
                    <form onSubmit={handleLogin}>
                        <div className="relative my-4">
                            <input name="email" type="text" className="md:w-[40vh] block py-2.5 px-8 text-[17px] bg-transparent border-b-2 border-black border-opacity-50 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Email" required/>
                            <BiUser className="absolute top-4 left-2"/>
                        </div>
                        <div className="relative my-4">
                            <input name="password" type={showPassword ? "text" : "password"} className="md:w-[40vh] block py-2.5 px-8 text-[17px] bg-transparent border-b-2 border-black border-opacity-50 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Password" required/>
                            <AiOutlineLock className="absolute top-4 left-2"/>
                            <div onClick={togglePasswordVisibility} className="cursor-pointer">{showPassword ? <AiOutlineEye className="absolute top-4 right-4"/> : <AiOutlineEyeInvisible className="absolute top-4 right-4"/>}</div>
                        </div>
                        <div className="flex justify-between items-center mt-8 mb-2">
                            <div className="flex gap-2 items-center">
                                <input type="checkbox" name="" id="" onChange={toggleRememberMe}/>
                                <label htmlFor="Remember Me" className="text-sm">Remember Me</label>
                            </div>
                            <Link to="/login2" className="text-blue-500 text-sm">Forgot Password ?</Link>
                        </div>
                        <button className="w-full mb-4 text-[20px] mt-6 rounded-[10px] bg-slate-200 text-blue-500 hover:bg-blue-600 hover:text-white py-2 transition-colors duration-300" type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;