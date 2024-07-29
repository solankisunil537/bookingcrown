import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { FaBars } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-scroll'

function Header() {
    const navigate = useNavigate()
    return (
        <div className="fixed top-0 left-0 right-0 bg-white shadow z-50">
            <Disclosure as="nav" className="bg-white shadow-xl">
                <div className="mx-auto max-w-7xl py-1 px-4 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {/* Mobile menu button */}
                            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-themeLight0 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-themeColor">
                                <span className="sr-only">Open main menu</span>
                                <FaBars aria-hidden="true" className="block h-6 w-6 group-open:hidden" />
                                <IoClose aria-hidden="true" className="hidden h-6 w-6 group-open:block" />
                            </DisclosureButton>
                        </div>

                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                <Link
                                    to="home"
                                    smooth={true}
                                    duration={1000}
                                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-900 hover:text-themeColor cursor-pointer duration-300"
                                >
                                    Home
                                </Link>
                                <Link
                                    to="about"
                                    smooth={true}
                                    duration={1000}
                                    className="cursor-pointer inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-900 hover:text-themeColor duration-300"
                                >
                                    About
                                </Link>
                                <Link
                                    to="service"
                                    smooth={true}
                                    duration={1000}
                                    className="cursor-pointer inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-900 hover:text-themeColor duration-300"
                                >
                                    Services
                                </Link>
                                <Link
                                    to="feature"
                                    smooth={true}
                                    duration={1000}
                                    className="cursor-pointer inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-900 hover:text-themeColor duration-300"
                                >
                                    Features
                                </Link>
                                <Link
                                    to="contact"
                                    smooth={true}
                                    duration={1000}
                                    className="cursor-pointer inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-900 hover:text-themeColor duration-300"
                                >
                                    Contact
                                </Link>
                            </div>
                        </div>

                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <button
                                type="button"
                                onClick={() => navigate("/login")}
                                className="rounded-lg bg-themeColor text-white focus:outline-none focus:ring-2 focus:ring-themeColor focus:ring-offset-2 p-[5px_9px]"
                            >
                                Login
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate("/signup")}
                                className="rounded-lg bg-themeColor text-white focus:outline-none focus:ring-2 focus:ring-themeColor ms-4 focus:ring-offset-2 p-[5px_9px]"
                            >
                                Signup
                            </button>

                            <Menu as="div" className="relative ml-3">
                                <MenuButton className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-themeColor focus:ring-offset-2">
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                        alt=""
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        className="h-8 w-8 rounded-full"
                                    />
                                </MenuButton>
                                <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <MenuItem>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-900 hover:text-themeColor font-medium">
                                            Your Profile
                                        </a>
                                    </MenuItem>
                                    <MenuItem>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-900 hover:text-themeColor font-medium">
                                            Settings
                                        </a>
                                    </MenuItem>
                                    <MenuItem>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-900 hover:text-themeColor font-medium">
                                            Sign out
                                        </a>
                                    </MenuItem>
                                </MenuItems>
                            </Menu>
                        </div>
                    </div>
                </div>

                <DisclosurePanel className="sm:hidden">
                    <div className="space-y-1 pb-4 pt-2">
                        <DisclosureButton
                            as="a"
                            href="#"
                            className="block border-l-4 border-themeColor bg-themeLight py-2 pl-3 pr-4 text-base font-medium text-themeColor"
                        >
                            Home
                        </DisclosureButton>
                        <DisclosureButton
                            as="a"
                            href="#"
                            className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-themeLight0 hover:border-themeColor hover:bg-themeLight hover:text-themeColor"
                        >
                            About
                        </DisclosureButton>
                        <DisclosureButton
                            as="a"
                            href="#"
                            className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-themeLight0 hover:border-themeColor hover:bg-themeLight hover:text-themeColor"
                        >
                            Services
                        </DisclosureButton>
                        <DisclosureButton
                            as="a"
                            href="#"
                            className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-themeLight0 hover:border-themeColor hover:bg-themeLight hover:text-themeColor"
                        >
                            Features
                        </DisclosureButton>
                        <DisclosureButton
                            as="a"
                            href="#"
                            className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-themeLight0 hover:border-themeColor hover:bg-themeLight hover:text-themeColor"
                        >
                            Contact
                        </DisclosureButton>
                    </div>
                </DisclosurePanel>
            </Disclosure>
        </div>
    )
}

export default Header
