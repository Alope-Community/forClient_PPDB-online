import { usePage } from "@inertiajs/react";
import ButtonLogout from "./ButtonLogout";

import ButtonComponent from "./Button";
import { useState } from "react";

export default function DropdownWelcome() {
    const { auth } = usePage().props;
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <div className="relative">
            {auth.user ? (
                <div className="relative">
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex gap-2 text-primary px-4 py-2 rounded-md focus:outline-none"
                    >
                        {auth.user.name}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                    </button>
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden">
                            <a
                                href="/dashboard"
                                className="block px-4 py-2 text-gray-700 hover:underline"
                            >
                                Dashboard
                            </a>
                            <ButtonLogout variant="text"/>
                        </div>
                    )}
                </div>
            ) : (
                <div className="hidden md:flex space-x-2">
                    <ButtonComponent
                        text="Login"
                        variant="secondary"
                        size="md"
                        color="white"
                        link={"/login"}
                    />
                    <ButtonComponent
                        text="Register"
                        variant="secondary"
                        size="md"
                        color="white"
                        link={"/register"}
                    />
                </div>
            )}
        </div>
    );
}
