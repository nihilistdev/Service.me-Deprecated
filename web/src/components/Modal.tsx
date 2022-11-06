import * as React from "react";

interface SearchModalProps extends React.HTMLAttributes<HTMLElement> {
  isOpen: boolean;
  modalTitle?: React.ReactNode;
  onClose: () => void;
}

export const SearchModal = ({
  isOpen,
  onClose,
  modalTitle,
  children,
  ...props
}: SearchModalProps) => {
  return isOpen ? (
    <div
      className="fixed z-50 w-full h-full bg-white md:inset-0 md:h-full md:w-full dark:bg-gray-800 overflow-y-scroll"
      {...props}
    >
      <button
        onClick={onClose}
        type="button"
        className="text-gray-400  bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 mt-2 ml-2 mr-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span className="sr-only">Close modal</span>
      </button>
      <div className="relative p-4 w-full h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
            {modalTitle}
          </div>
          <div className="p-6 space-y-6 overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>
  ) : null;
};
