import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import { login } from "../../api/Auth";
import { useState } from "react";

function Login() {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({})
    const [value, setValue] = useState({
        email: "",
        password: ""
    })

    const handleValueChange = (e) => {
        const { name, value } = e.target
        setValue(prevState => ({
            ...prevState,
            [name]: value
        }));
        setErrors({ ...errors, [name]: false })
    }

    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!value.email.trim()) {
            newErrors.email = true
        } else if (!emailRegex.test(value.email)) {
            newErrors.email = true
        }

        if (!value.password.trim()) {
            newErrors.password = true
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault()
        if (validateForm()) {
            setLoading(true);
            try {
                const data = await login(value.email, value.password)
                if (data.success) {
                    setValue({
                        email: "",
                        password: "",
                    })
                }
            } catch (error) {
            } finally {
                setLoading(false);
            }
        }
    }
    return (
        <>
            <section className="bg-slate-50 flex items-center justify-center py-12 px-4 min-h-screen">
                <div className="grid md:grid-cols-12 grid-cols-1 items-center">
                    <div className="lg:col-span-6 md:col-span-6 hidden lg:flex justify-center">
                        <img
                            src="https://upcover-shreethemes.vercel.app/static/media/contact.adff68c5dcc9005ceb1a5566aaf4440b.svg"
                            alt=""
                            className="w-full h-[580px] max-w-[500px]"
                        />
                    </div>
                    <div className="lg:col-span-6 md:col-span-12 flex items-center justify-center md:p-0 p-6">
                        <div className="max-w-[600px] w-full bg-white rounded-md shadow p-6">
                            <div className="pb-6 text-center">
                                <h3 className="font-semibold text-2xl leading-normal mb-4">
                                    Login
                                </h3>
                                <p className="text-slate-400 max-w-xl mx-auto">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae totam consectetur culpa? Eveniet pariatur inventore quisquam ad culpa esse?
                                </p>
                            </div>
                            <div className="bg-white rounded-md shado p-6">
                                <form onSubmit={(e) => handleSubmitForm(e)}>
                                    <div className="grid lg:grid-cols-12 grid-cols-1 gap-5">
                                        <div className="lg:col-span-12">
                                            <label htmlFor="email" className="font-semibold">
                                                Your Email: {errors.email && <span className='text-[red]'>*</span>}
                                            </label>
                                            <input
                                                name="email"
                                                value={value.email}
                                                onChange={handleValueChange}
                                                type="email"
                                                className={`mt-2 w-full py-2 px-3 h-10 bg-transparent rounded outline-none border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-0 focus:border-themeColor`}
                                                placeholder="Email :"
                                            />
                                        </div>
                                        <div className="lg:col-span-12">
                                            <label htmlFor="email" className="font-semibold">
                                                Your Password:  {errors.password && <span className='text-[red]'>*</span>}
                                            </label>
                                            <input
                                                type="password"
                                                name="password"
                                                value={value.password}
                                                onChange={handleValueChange}
                                                className={`mt-2 w-full py-2 px-3 h-10 bg-transparent rounded outline-none border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-0 focus:border-themeColor`}
                                                placeholder="Password :"
                                            />
                                        </div>
                                        <div className="text-right">
                                            <p className="text-slate-600">
                                                <Link to="#" className="text-teal-500 hover:text-teal-700 font-semibold">Change Password</Link>
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        className="h-10 w-full px-6 tracking-wide inline-flex items-center justify-center font-medium rounded-md bg-teal-500 text-white mt-5"
                                    >
                                        Login
                                    </button>
                                </form>
                            </div>
                            <div className="mt-6 text-center">
                                <p className="text-slate-600">
                                    Don't have an account? <Link to="/signup" className="text-teal-500 hover:text-teal-700 font-semibold">Register</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default Login;
