import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function PendaftaranJalurAfirmasi() {
    const [files, setFiles] = useState({
        kipPkhPipSktm: null,
        pasFoto: null,
        kartuKeluarga: null,
        akteKelahiran: null,
        kiaKtpOrtu: null,
        ijazah: null,
        skhuRaport: null,
    });

    const [previewPhoto, setPreviewPhoto] = useState(null);

    const handleFileChange = (event, field) => {
        setFiles({ ...files, [field]: event.target.files[0] });
    };

    const showPreviewImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewPhoto(imageUrl);
        }
    };

    return (
        <>
            <Head title="Pendaftaran Jalur Afirmasi" />
            <div className="min-h-screen md:flex items-center justify-center lg:px-20 p-6 bg-[url(../image/hero/hero.jpg)] bg-cover after:content-[''] after:absolute relative after:bg-black/60 after:inset-0">
                <div className="relative z-10 items-center lg:mr-20">
                    <img
                        src="/image/logo.png"
                        alt="Logo MTs LA TAHZAN"
                        className="w-[400px] mt-10"
                    />
                </div>
                <div className="relative z-10 flex flex-col bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-5xl border-2 border-secondary p-8">
                    {/* Judul Tengah Atas */}
                    <h2 className="text-3xl font-bold absolute text-center top-5 left-1/2 transform w-full -translate-x-1/2 bg-white px-4">
                        Pendaftaran Jalur Afirmasi
                    </h2>

                    <form action="/" method="POST">
                        <div className="flex flex-col md:flex-row w-full mt-10">
                            {/* Pas Foto */}
                            <div className="md:w-1/2 flex flex-col items-center p-6">
                                <h3 className="text-lg font-semibold">
                                    Pas Foto
                                </h3>
                                <div className="w-72 h-64 border border-secondary rounded-lg flex items-center justify-center mt-2">
                                    <input
                                        type="file"
                                        onChange={(e) => {
                                            handleFileChange(e, "pasFoto");
                                            showPreviewImage(e);
                                        }}
                                        className="hidden"
                                        id="pasFoto"
                                    />
                                    <label
                                        htmlFor="pasFoto"
                                        className="cursor-pointer flex flex-col items-center justify-center w-full h-full text-center text-gray-900 sm:text-sm"
                                    >
                                        {previewPhoto ? (
                                            <img
                                                src={previewPhoto}
                                                alt="Preview"
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        ) : (
                                            <span>Upload Pas Foto</span>
                                        )}
                                    </label>
                                </div>
                                <p className="text-xs sm:text-sm text-red-500 mt-2 w-72 text-start">
                                    * Format File berbentuk jpg/jpeg
                                </p>
                                <p className="text-xs sm:text-sm text-red-500 mt-2 w-72 text-start">
                                    * Minimal 1 MB
                                </p>
                                <p className="text-xs sm:text-sm text-red-500 mt-2 w-72 text-start">
                                    * Maximal 10 MB
                                </p>
                                <p className="text-xs sm:text-sm text-red-500 mt-2 w-72 text-start">
                                    * Sebelum mendaftar pastikan data sesuai
                                </p>
                            </div>

                            {/* Formulir Pendaftaran */}
                            <div className="md:w-1/2 p-6">
                                {[
                                    {
                                        name: "KIP/PKH/PIP/SKTM",
                                        field: "kipPkhPipSktm",
                                    },
                                    {
                                        name: "Kartu Keluarga",
                                        field: "kartuKeluarga",
                                    },
                                    {
                                        name: "Akte Kelahiran",
                                        field: "akteKelahiran",
                                    },
                                    {
                                        name: "KIA/KTP ORTU",
                                        field: "kiaKtpOrtu",
                                    },
                                    { name: "Ijazah/SKL", field: "ijazah" },
                                    {
                                        name: "SKHU/Raport Kelas 5",
                                        field: "skhuRaport",
                                    },
                                ].map((doc, index) => (
                                    <div key={index} className="mb-5">
                                        <label className="block font-medium">
                                            {doc.name}
                                        </label>
                                        <div className="mt-2 border border-secondary rounded-md p-3 flex items-center justify-center w-full">
                                            <input
                                                type="file"
                                                onChange={(e) =>
                                                    handleFileChange(
                                                        e,
                                                        doc.field
                                                    )
                                                }
                                                className="hidden"
                                                id={doc.field}
                                            />
                                            <label
                                                htmlFor={doc.field}
                                                className="cursor-pointer flex items-center justify-center text-center text-gray-900 w-full"
                                            >
                                                Pilih File
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button className="w-fit px-20 py-2 mx-auto flex md:items-center justify-center font-semibold border border-secondary bg-secondary text-white rounded-md text-base mt-6 transition-all duration-300 ease-in-out hover:bg-secondary/80 hover:shadow-md">
                            Daftar
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
