import { useForm } from "@inertiajs/react";

export default function LogoutButton({ variant = "text" }) {
    const { post } = useForm()

    const handleLogout = () => {
        post("/logout")
    };

    return (
        variant === "text" ? (
            <p
                onClick={handleLogout}
                className="cursor-pointer text-red-500 hover:underline px-4 py-2"
            >
                Logout
            </p>
        ) : (
            <button
                onClick={handleLogout}
                className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
                Logout
            </button>
        )
    );
}
