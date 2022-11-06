import { useDisclosure } from "../hooks/useDisclosure";
import * as React from "react";
import { ThemeToggle } from "./ThemeToggle";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "./Button";
import { getUser } from "@store/hooks/getUser";
import { useDispatch } from "react-redux";
import { getUserDetails } from "@store/actions/userActions";
import { AppDispatch } from "@store/index";

interface NavbarProps extends React.HTMLAttributes<HTMLElement> {}

export const Navbar = ({}: NavbarProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const user = getUser();
  const navigate = useNavigate();
  React.useEffect(() => {
    console.log(dispatch(getUserDetails()));
  }, [dispatch]);

  const {
    getButtonProps: mobileMenuButtonProps,
    getDisclosureprops: mobileMenuDisclosureProps,
  } = useDisclosure();

  return (
    <nav className="p-2 bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <a href="#" className="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center text-xl hidden font-semibold whitespace-nowrap dark:text-white md:flex">
            Service me
          </span>
        </a>
        <div className="flex items-center md:order-2 gap-5">
          <ThemeToggle />
          {!user ? (
            <div className="mb-4 hidden lg:flex">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Register</Button>
              </Link>
            </div>
          ) : null}
          {user ? (
            <Button onClick={() => navigate("/dashboard")}>
              Go to dashboard
            </Button>
          ) : null}
          <button
            type="button"
            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            {...mobileMenuButtonProps()}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className="justify-between items-center w-full md:flex md:w-auto md:order-1"
          {...mobileMenuDisclosureProps()}
        >
          <ul className="flex flex-col p-4 mt-4 bg-transparent rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li>
              <a
                href="#"
                className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/"
                className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Contact
              </a>
            </li>
          </ul>
          <div className="flex flex-row justify-self-center justify-center md:hidden lg:hidden">
            <Button variant="outline" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button>Register</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
