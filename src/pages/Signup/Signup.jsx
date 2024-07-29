import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer'
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { RiExpandUpDownFill } from 'react-icons/ri'
import { IoMdCheckmark } from 'react-icons/io'

const people = [
    { id: 1, name: 'Select type' },
    { id: 2, name: 'Box Cricket' },
    { id: 3, name: 'Cafe/Restuarant' },
    { id: 4, name: 'Hotels' },
    { id: 3, name: 'Farm' },
]

function Signup() {
    const [selected, setSelected] = useState(people[0])
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
                            <form onSubmit={(e) => e.preventDefault()}>
                                <div className="grid lg:grid-cols-12 grid-cols-1 gap-5">
                                    <div className="lg:col-span-6">
                                        <label htmlFor="name" className="font-semibold">Name:</label>
                                        <input
                                            name="name"
                                            type="text"
                                            className="mt-2 w-full py-2 px-3 h-10 bg-transparent rounded outline-none border border-gray-300 focus:ring-0 focus:border-themeColor"
                                            placeholder="Name :"
                                        />
                                    </div>
                                    <div className="lg:col-span-6">
                                        <label htmlFor="email" className="font-semibold">Email:</label>
                                        <input
                                            name="email"
                                            id="email"
                                            type="email"
                                            className="mt-2 w-full py-2 px-3 h-10 bg-transparent rounded outline-none border border-gray-300 focus:ring-0 focus:border-themeColor"
                                            placeholder="Email :"
                                        />
                                    </div>
                                    <div className="lg:col-span-12">
                                        <label htmlFor="phone" className="font-semibold">Phone Nu:</label>
                                        <input
                                            type="number"
                                            className="mt-2 w-full py-2 px-3 h-10 bg-transparent rounded outline-none border border-gray-300 focus:ring-0 focus:border-themeColor"
                                            placeholder="Phone Nu :"
                                        />
                                    </div>
                                    <div className="lg:col-span-12">
                                        <Listbox value={selected} onChange={setSelected}>
                                            <Label className="block font-semibold">Select Business Type</Label>
                                            <div className="relative mt-2">
                                                <ListboxButton className="relative w-full h-10 cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-[16px] text-gray-900 shadow-sm border border-gray-300 focus:outline-none focus:ring-0 focus:border-themeColor sm:text-sm sm:leading-6">
                                                    <span className="block truncate">{selected.name}</span>
                                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                        <RiExpandUpDownFill aria-hidden="true" className="h-5 w-5 text-gray-400" />
                                                    </span>
                                                </ListboxButton>
                                                <ListboxOptions
                                                    transition
                                                    className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-0 border-gray-300 focus:ring-0 focus:border-themeColor focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                                                >
                                                    {people.map((person) => (
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
                                </div>
                                <button className="h-10 px-6 tracking-wide inline-flex items-center justify-center font-medium rounded-md bg-teal-500 text-white mt-5 w-full">Submit</button>
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
