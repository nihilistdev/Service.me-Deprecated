import { logout } from "@api/auth/Logout";
import { useCloseAnywhere } from "@hooks/useCloseAnywhere";
import { useDisclosure } from "@hooks/useDisclosure";
import { getUser } from "@store/hooks/getUser";
import { AppDispatch } from "@store/index";
import { authSlice } from "@store/slices/auth";
import { useMutation } from "@tanstack/react-query";
import * as React from "react";
import { HiChartPie, HiOutlineTicket, HiUserGroup } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

interface AppLayoutProps extends React.HTMLAttributes<HTMLElement> {}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const ref = React.useRef<HTMLElement>();
  const dispatch = useDispatch<AppDispatch>();
  const user = getUser();
  const navigate = useNavigate();
  const logoutMutation = useMutation(logout, {
    onSuccess: () => {
      dispatch(authSlice.actions.logout());
    },
  });
  const {
    onClose,
    getButtonProps: menuBtnProps,
    getDisclosureprops: menuBtnDisclosureProps,
  } = useDisclosure();

  useCloseAnywhere(ref as React.MutableRefObject<HTMLElement>, onClose);
  return (
    <main className="app-main">
      <header className="fixed h-16 w-full bg-white shadow flex items-center dark:bg-gray-800 justify-between">
        <div className="flex items-center h-full">
          <div className="flex justify-start items-center text-center h-full w-[15rem] px-10">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="w-full text-primary dark:text-white text-xl">
              Service me
            </span>
          </div>
          <div className="flex items-center w-64"></div>
        </div>
        <div className="flex items-center h-full text-sm">
          <div className="flex items-center h-full">
            <a
              href="#"
              className="flex items-center text-primary dark:text-white h-full px-4"
            >
              Support
            </a>
            <ThemeToggle />
            <div className="group relative h-full pr-14 ml-3 py-2">
              <button
                type="button"
                className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                {...menuBtnProps()}
              >
                <div className="flex overflow-hidden relative justify-center items-center w-[3rem] h-12 bg-gray-100 rounded-full dark:bg-gray-600">
                  <span className="font-medium text-xl text-gray-600 dark:text-gray-300">
                    {user?.first_name[0]}
                    {user?.last_name[0]}
                  </span>
                </div>
              </button>
              <div
                className="z-50 absolute top-16 right-16 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                animate={menuBtnDisclosureProps().hidden ? "closed" : "open"}
                ref={ref}
                {...menuBtnDisclosureProps()}
              >
                <a
                  href="#"
                  className="block text-left py-3 px-3 text-primary hover:bg-gray-100 text-md"
                >
                  My Account
                </a>
                <a
                  href="#"
                  className="block text-left py-3 px-3 text-primary hover:bg-gray-100 text-md"
                >
                  Edit Account
                </a>
                <button
                  onClick={async () => {
                    await logoutMutation.mutateAsync();
                    navigate("/");
                  }}
                  className="flex flex-row py-3 px-3 text-primary hover:bg-gray-100 text-md w-full"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div>
        <aside className="flex pt-[4rem] justify-start w-60 h-screen bg-white shadow-lg dark:bg-gray-800 dark:border-gray-700">
          {user && (
            <div className="overflow-y-auto py-4 px-3 bg-white rounded dark:bg-gray-800">
              <ul className="flex flex-col space-y-5 gap-1 w-full justify-start self-center p-2">
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 w-full text-base font-normal text-primary rounded-md dark:text-white dark:hover:bg-gray-700 hover:bg-gray-100"
                  >
                    <HiChartPie className="w-5 h-5" />
                    <span className="ml-3">Dashboard</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 w-full text-base font-normal text-primary rounded-md dark:text-white dark:hover:bg-gray-700 hover:bg-gray-100"
                  >
                    <HiOutlineTicket className="w-5 h-5" />
                    <span className="ml-3">Tickets</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 w-full text-base font-normal text-primary rounded-md dark:text-white dark:hover:bg-gray-700 hover:bg-gray-100"
                  >
                    <HiUserGroup className="w-5 h-5" />
                    <span className="ml-3">Customers</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 w-full text-base font-normal text-primary rounded-md dark:text-white dark:hover:bg-gray-700 hover:bg-gray-100"
                  >
                    <HiUserGroup className="w-5 h-5" />
                    <span className="ml-3">Staff</span>
                  </a>
                </li>
              </ul>
              {/* <div className="flex flex-col absolute left-11 bottom-5 items-center justify-center">
                <div className="flex flex-col w-full justify-center items-center">
                  <div className="flex overflow-hidden relative justify-center items-center w-[3rem] h-12 bg-gray-100 rounded-full dark:bg-gray-600">
                    <span className="font-medium text-gray-600 dark:text-gray-300">
                      {user?.first_name[0]}
                      {user?.last_name[0]}
                    </span>
                  </div>
                  <div className="flex flex-col p-2 w-full justify-center items-center">
                    <p className="flex flex-row text-primary text-lg dark:text-white">
                      {user.first_name} {user.last_name}
                    </p>
                    <p className="flex flex-row text-gray-500 text-xs">
                      {user.first_name} {user.last_name}
                    </p>
                  </div>
                  <div className="flex justify-start">
                    <button
                      className="flex flex-row p-3 items-center justify-center rounded-md text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      onClick={async () => {
                        await logoutMutation.mutateAsync();
                        navigate("/");
                      }}
                    >
                      <HiArrowRightOnRectangle className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <ThemeToggle />
              </div> */}
              <div></div>
            </div>
          )}
        </aside>
        {children}
      </div>
    </main>
  );
};
