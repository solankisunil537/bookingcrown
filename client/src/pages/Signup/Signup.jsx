import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer'
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { RiExpandUpDownFill } from 'react-icons/ri'
import { IoMdCheckmark } from 'react-icons/io'
import { signup } from '../../api/Auth'

const business = [
    { id: 1, name: 'Select type' },
    { id: 2, name: 'Box Cricket' },
    { id: 3, name: 'Cafe/Restuarant' },
    { id: 4, name: 'Hotels' },
    { id: 3, name: 'Farm' },
]

function Signup() {
    const [businessType, setbusinessType] = useState(business[0])
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState({
        name: "",
        mobilenu: "",
        email: "",
        businessName: "",
        address: ""
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
        const phoneRegex = /^\d{10}$/;
        if (!value.name.trim()) {
            newErrors.name = true;
        }

        if (!value.email.trim()) {
            newErrors.email = true
        } else if (!emailRegex.test(value.email)) {
            newErrors.email = true
        }

        if (!value.mobilenu.trim()) {
            newErrors.mobilenu = true
        } else if (!phoneRegex.test(value.mobilenu)) {
            newErrors.mobilenu = true
        }

        if (businessType.name === business[0].name) {
            newErrors.businessType = true
        }

        if (!value.businessName.trim()) {
            newErrors.businessName = true;
        }

        if (!value.address.trim()) {
            newErrors.address = true;
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleBusinessType = (value) => {
        setbusinessType(value)
        setErrors({ ...errors, businessType: false })
    }

    const handleSubmitForm = async (e) => {
        e.preventDefault()
        if (validateForm()) {
            setLoading(true);
            try {
                const data = await signup(value.name, value.mobilenu, value.email, businessType.name, value.businessName, value.address)
                if (data.success) {
                    setValue({
                        name: "",
                        mobilenu: "",
                        email: "",
                        businessName: "",
                        address: ""
                    })
                    setbusinessType(business[0])
                }
            } catch (error) {
                console.log("error creating user", error);
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <>
            <section className="bg-slate-50 flex items-center justify-center py-12 min-h-screen px-4">
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
                                <h3 className="font-semibold text-2xl leading-normal mb-4">Signup</h3>
                                <p className="text-slate-400 max-w-xl mx-auto">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae totam consectetur culpa? Eveniet pariatur inventore quisquam ad culpa esse?
                                </p>
                            </div>
                            <form onSubmit={(e) => handleSubmitForm(e)}>
                                <div className="grid lg:grid-cols-12 md:grid-cols-4 grid-cols-1 gap-5">
                                    <div className="lg:col-span-6 md:col-span-2">
                                        <label htmlFor="name" className="font-semibold">Name: {errors.name && <span className='text-[red]'>*</span>}</label>
                                        <input
                                            name="name"
                                            value={value.name}
                                            onChange={handleValueChange}
                                            type="text"
                                            className={`mt-2 w-full py-2 px-3 h-10 bg-transparent rounded outline-none border  focus:ring-0 focus:border-themeColor ${errors.name ? "border-[red]" : "border-gray-300"}`}
                                            placeholder="Name"
                                        />
                                    </div>
                                    <div className="lg:col-span-6 md:col-span-2">
                                        <label htmlFor="email" className="font-semibold">Email: {errors.email && <span className='text-[red]'>*</span>}</label>
                                        <input
                                            name="email"
                                            value={value.email}
                                            onChange={handleValueChange}
                                            id="email"
                                            type="email"
                                            className={`mt-2 w-full py-2 px-3 h-10 bg-transparent rounded outline-none border  focus:ring-0 focus:border-themeColor ${errors.email ? "border-[red]" : "border-gray-300"}`}
                                            placeholder="Email"
                                        />
                                    </div>
                                    <div className="lg:col-span-12 md:col-span-4">
                                        <label htmlFor="phone" className="font-semibold">Phone Nu: {errors.mobilenu && <span className='text-[red]'>*</span>}</label>
                                        <input
                                            type="number"
                                            name='mobilenu'
                                            value={value.mobilenu}
                                            onChange={handleValueChange}
                                            className={`mt-2 w-full py-2 px-3 h-10 bg-transparent rounded outline-none border  focus:ring-0 focus:border-themeColor ${errors.mobilenu ? "border-[red]" : "border-gray-300"}`}
                                            placeholder="Phone Nu"
                                        />
                                    </div>
                                    <div className="lg:col-span-6 md:col-span-2">
                                        <Listbox value={businessType} onChange={handleBusinessType}>
                                            <Label className="block font-semibold">Select Business Type {errors.businessType && <span className='text-[red]'>*</span>}</Label>
                                            <div className="relative mt-2">
                                                <ListboxButton className={`relative w-full h-10 cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-[16px] text-gray-900 shadow-sm border  focus:outline-none focus:ring-0 ${errors.businessType ? "border-[red]" : "border-gray-300"} focus:border-themeColor sm:text-sm sm:leading-6`}>
                                                    <span className="block truncate">{businessType.name}</span>
                                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                        <RiExpandUpDownFill aria-hidden="true" className="h-5 w-5 text-gray-400" />
                                                    </span>
                                                </ListboxButton>
                                                <ListboxOptions
                                                    transition
                                                    className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-0  focus:ring-0 focus:border-themeColor focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                                                >
                                                    {business.map((person) => (
                                                        <ListboxOption
                                                            key={person.id}
                                                            value={person}
                                                            className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-themeColor data-[focus]:text-white"
                                                        >
                                                            <span className="block truncate font-normal group-data-[selected]:font-semibold">{person.name}</span>
                                                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-themeColor group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                                                                <IoMdCheckmark aria-hidden="true" className="h-5 w-5" />
                                                            </span>
                                                        </ListboxOption>
                                                    ))}
                                                </ListboxOptions>
                                            </div>
                                        </Listbox>
                                    </div>
                                    <div className="lg:col-span-6 md:col-span-2">
                                        <label htmlFor="phone" className="font-semibold">Bussiness Name : {errors.businessName && <span className='text-[red]'>*</span>}</label>
                                        <input
                                            type="text"
                                            name='businessName'
                                            value={value.businessName}
                                            onChange={handleValueChange}
                                            className={`mt-2 w-full py-2 px-3 h-10 bg-transparent rounded outline-none border  focus:ring-0 focus:border-themeColor ${errors.businessName ? "border-[red]" : "border-gray-300"}`}
                                            placeholder="Bussiness Name"
                                        />
                                    </div>
                                    <div className="lg:col-span-6 md:col-span-4">
                                        <label htmlFor="phone" className="font-semibold">Address : {errors.address && <span className='text-[red]'>*</span>}</label>
                                        <input
                                            type="text"
                                            name='address'
                                            value={value.address}
                                            onChange={handleValueChange}
                                            className={`mt-2 w-full py-2 px-3 h-10 bg-transparent rounded outline-none border  focus:ring-0 focus:border-themeColor ${errors.address ? "border-[red]" : "border-gray-300"}`}
                                            placeholder="Address"
                                        />
                                    </div>
                                </div>
                                <button
                                    className={`h-10 px-6 tracking-wide inline-flex items-center justify-center font-medium rounded-md ${loading ? 'bg-[#0f766e]' : 'bg-teal-500'} text-white mt-5 w-full`}
                                    onClick={handleSubmitForm}
                                    disabled={loading}
                                >
                                    {loading && <span className="mr-2 spinner"></span>}
                                    {loading ? 'Submitting...' : 'Submit'}
                                </button>

                            </form>
                            <div className="mt-6 text-center">
                                <p className="text-slate-600">Already have an account? <Link to="/login" className="text-teal-500 hover:text-teal-700 font-semibold">Login</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default Signup
