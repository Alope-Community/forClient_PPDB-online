import ButtonComponent from "@/Components/Button";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function PendaftaranJalurAfirmasi() {
    const { auth, registration } = usePage().props;

    const { data, setData, post, errors } = useForm({
        pas_foto: null,
        kartu_keluarga: null,
        akte_kelahiran: null,
        kia_ktp_ortu: null,
        ijazah: null,
        skhu_raport: null,
        kip_pkh_pip_sktm: null,
        jalur_registrasi: "afirmasi",
        user_id: auth.user.id,
    });

    const [previewPhoto, setPreviewPhoto] = useState({
        pas_foto: { url: "", name: "" },
        kartu_keluarga: { url: "", name: "" },
        akte_kelahiran: { url: "", name: "" },
        kia_ktp_ortu: { url: "", name: "" },
        ijazah: { url: "", name: "" },
        skhu_raport: { url: "", name: "" },
        kip_pkh_pip_sktm: { url: "", name: "" },
    });

    const handleFileChange = (e, field) => {
        const file = e.target.files[0];

        if (file) {
            const imageUrl = URL.createObjectURL(file);

            setPreviewPhoto((prev) => ({
                ...prev,
                [field]: {
                    url: imageUrl,
                    name: field !== "pas_foto" ? file.name : prev[field].name,
                },
            }));

            setData(field, file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post("/registration", {
            data: data,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    };

    return (
        <>
            <Head title="Pendaftaran Jalur Afirmasi" />
            <div className="min-h-screen md:flex items-center justify-center lg:px-20 p-6">
                <div className="relative z-10 items-center lg:mr-20">
                    <img
                        src="/image/logo.png"
                        alt="Logo MTs PUI CIKASO"
                        className="w-[400px] mt-10"
                    />
                </div>
                <div className="relative z-10 flex flex-col bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-5xl border-2 border-secondary p-8">
                    {registration ? (
                        <>
                            <p className="text-center text-xl">
                                Kamu sudah terdaftar di jalur{" "}
                                <b>{registration.registration_path}</b>
                            </p>
                            <div className="w-[200px] mx-auto mt-5">
                                <ButtonComponent
                                    text={"Kembali"}
                                    link={"/"}
                                    variant={"secondary"}
                                    color={"white"}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Judul Tengah Atas */}
                            <h2 className="text-3xl font-bold absolute text-center top-5 left-1/2 transform w-full -translate-x-1/2 bg-white px-4">
                                Pendaftaran Jalur Afirmasi
                            </h2>

                            <form
                                action="/registration"
                                method="POST"
                                className="flex flex-col"
                                encType="multipart/form-data"
                                onSubmit={handleSubmit}
                            >
                                <div className="w-full mt-10">
                                    {/* Pas Foto */}
                                    {/* <div className="md:w-1/2 flex flex-col items-center p-6">
                                        <h3 className="text-lg font-semibold">
                                            Pas Foto
                                        </h3>
                                        <div className="w-72 h-64 border border-secondary rounded-lg flex items-center justify-center mt-2">
                                            <input
                                                type="file"
                                                onChange={(e) => {
                                                    handleFileChange(
                                                        e,
                                                        "pas_foto"
                                                    );
                                                }}
                                                className="hidden"
                                                id="pas_foto"
                                            />
                                            <label
                                                htmlFor="pas_foto"
                                                className="cursor-pointer flex flex-col items-center justify-center w-full h-full text-center text-gray-900 sm:text-sm"
                                            >
                                                {previewPhoto.pas_foto.url ? (
                                                    <img
                                                        src={
                                                            previewPhoto
                                                                .pas_foto.url
                                                        }
                                                        alt="Preview"
                                                        className="w-full h-full object-cover rounded-lg"
                                                    />
                                                ) : (
                                                    <span>Upload Pas Foto</span>
                                                )}
                                            </label>
                                        </div>
                                        {errors.pas_foto && (
                                            <p className="text-sm text-red-500 mt-2">
                                                {errors.pas_foto}
                                            </p>
                                        )}
                                        <div className="bg-secondary p-5 rounded mt-10">
                                            <p className="text-xs sm:text-sm text-white mt-2 w-72 text-start">
                                                * Format File berbentuk jpg/jpeg
                                            </p>
                                            <p className="text-xs sm:text-sm text-white mt-2 w-72 text-start">
                                                * Minimal 1 MB
                                            </p>
                                            <p className="text-xs sm:text-sm text-white mt-2 w-72 text-start">
                                                * Maximal 10 MB
                                            </p>
                                            <p className="text-xs sm:text-sm text-white mt-2 w-72 text-start">
                                                * Sebelum mendaftar pastikan
                                                data sesuai
                                            </p>
                                        </div>
                                    </div> */}

                                    {/* Formulir Pendaftaran */}
                                    <div className="p-6">
                                        {[
                                            {
                                                name: "KIP/PKH/PIP/SKTM",
                                                field: "kip_pkh_pip_sktm",
                                            },
                                            {
                                                name: "Kartu Keluarga",
                                                field: "kartu_keluarga",
                                            },
                                            {
                                                name: "Akte Kelahiran",
                                                field: "akte_kelahiran",
                                            },
                                            // {
                                            //     name: "KIA/KTP ORTU",
                                            //     field: "kia_ktp_ortu",
                                            // },
                                            {
                                                name: "Ijazah/SKL",
                                                field: "ijazah",
                                            },
                                            {
                                                name: "SKHU",
                                                field: "skhu_raport",
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
                                                        {previewPhoto[doc.field]
                                                            .url ? (
                                                            <div className="flex gap-2 items-center">
                                                                <img
                                                                    src={
                                                                        previewPhoto[
                                                                            doc
                                                                                .field
                                                                        ].url
                                                                    }
                                                                    alt="Preview"
                                                                    className="w-[80px] max-h-[80px] object-contain rounded border p-1"
                                                                />
                                                                <span className="text-sm">
                                                                    {
                                                                        previewPhoto[
                                                                            doc
                                                                                .field
                                                                        ].name
                                                                    }
                                                                </span>
                                                            </div>
                                                        ) : (
                                                            <span>
                                                                Pilih File
                                                            </span>
                                                        )}
                                                    </label>
                                                </div>
                                                {errors[doc.field] && (
                                                    <p className="text-sm text-red-500 mt-2">
                                                        {errors[doc.field]}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center gap-5 mt-6 justify-center">
                                    <div>
                                        <ButtonComponent
                                            text={"Kembali"}
                                            variant={"outline-secondary"}
                                            size={"lg"}
                                            link={"/"}
                                        />
                                    </div>
                                    <div>
                                        <button className="w-fit px-20 py-2 mx-auto flex md:items-center justify-center font-semibold bg-secondary text-white rounded-md text-base transition-all duration-300 ease-in-out hover:bg-secondary/80 hover:shadow-md">
                                            Daftar
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
