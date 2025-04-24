import { Head, Link, usePage } from "@inertiajs/react";
import Navbar from "../Components/Navbar";
import Content from "../Sections/Content";
import Hero from "../Sections/Hero";
import Maps from "../Sections/Maps";
import Footer from "../Components/Footer";

export default function Welcome() {
    return (
        <>
            <Head title="Welcome" />
            <Navbar />
            <Hero />
            <Content />
            <Maps />
            <Footer />
        </>
    );
}
