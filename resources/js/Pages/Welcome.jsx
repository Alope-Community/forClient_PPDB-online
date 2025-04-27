import { Head, usePage } from "@inertiajs/react";
import Navbar from "../Components/Navbar";
import Content from "../Sections/Content";
import Hero from "../Sections/Hero";
import Maps from "../Sections/Maps";
import Footer from "../Components/Footer";
import { useEffect, useState } from "react";

export default function Welcome() {
    const { props } = usePage();
    const successMessage = props.flash?.success;
    const [showToast, setShowToast] = useState(!!successMessage);

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setShowToast(false);
            }, 2000); // 2 detik = 2000 ms

            return () => clearTimeout(timer); // bersihkan timer kalau unmount
        }
    }, [successMessage]);

    return (
        <>
            {showToast && (
                <div className="bg-green-500 text-white px-6 py-3 rounded shadow fixed z-[70] w-[200px] left-1/2 -translate-x-1/2 top-4 text-center transition-all duration-300">
                    {successMessage}
                </div>
            )}

            <Head title="Welcome" />
            <Navbar />
            <Hero />
            <Content />
            <Maps />
            <Footer />
        </>
    );
}
