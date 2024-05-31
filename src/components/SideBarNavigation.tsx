import React, { useState } from 'react';
import { Transition } from '@headlessui/react';

const SideBarNavigation = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-100">
            <div className={`flex flex-col ${isOpen ? 'w-64' : 'w-16'} bg-white border-r transition-width duration-300`}>
                <button
                    className="flex items-center justify-center w-12 h-12 bg-gray-200 hover:bg-gray-300 focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <svg
                        className={`w-6 h-6 text-gray-600 transition-transform duration-300 transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </button>
                <Transition
                    show={isOpen}
                    enter="transition duration-300 ease-out"
                    enterFrom="transform -translate-x-full"
                    enterTo="transform translate-x-0"
                    leave="transition duration-300 ease-out"
                    leaveFrom="transform translate-x-0"
                    leaveTo="transform -translate-x-full"
                >
                    <div className="flex flex-col flex-1 overflow-hidden">
                        {/* Sidebar content */}
                        <nav>
                            <ul>
                                <li className="p-4 hover:bg-gray-200">Item 1</li>
                                <li className="p-4 hover:bg-gray-200">Item 2</li>
                                <li className="p-4 hover:bg-gray-200">Item 3</li>
                            </ul>
                        </nav>
                    </div>
                </Transition>
            </div>
        </div>
    );
};

export default SideBarNavigation;
