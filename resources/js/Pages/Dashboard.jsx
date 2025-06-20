import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import ButtonComponent from "@/Components/Button";
import { useEffect, useState } from "react";

export default function Dashboard({ auth }) {
    const { flash } = usePage().props;
    const [alert, setAlert] = useState({ type: "", message: "" });
    const getVerificationStatusColor = (status) => {
        switch (status) {
            case "menunggu":
                return "bg-yellow-500";
            case "diverifikasi":
                return "bg-green-500";
            case "ditolak":
                return "bg-red-500";
            // default:
            //     return "bg-gray-500";
            default:
                return "bg-yellow-500";
        }
    };

    const pasPhoto = auth.user?.registration?.documents?.find(
        (doc) =>
            doc.document_type === "pas photo" ||
            doc.document_type === "pas_foto"
    );

    useEffect(() => {
        if (flash.success) {
            setAlert({ type: "success", message: flash.success });
            setTimeout(() => setAlert({ type: "", message: "" }), 3000);
        }
        if (flash.error) {
            setAlert({ type: "error", message: flash.error });
            setTimeout(() => setAlert({ type: "", message: "" }), 3000);
        }
    }, [flash]);

    const { data, setData, post, processing, errors } = useForm({
        file: null,
    });

    function handleFileChange(e) {
        const name = e.target.name;
        const file = e.target.files[0];

        setData("document_type", name);
        setData("file", file);
    }

    function submit(e) {
        e.preventDefault();
        post("/update-document");
    }

    function convertToMB(bytes){
        const megabytes = bytes / (1024 * 1024);
        return megabytes.toFixed(2) + " MB";
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {alert.message && (
                        <div
                            className={`p-3 mb-4 text-white rounded ${
                                alert.type === "success"
                                    ? "bg-green-500"
                                    : "bg-red-500"
                            }`}
                        >
                            {alert.message}
                        </div>
                    )}
                    <div className="overflow-hidden bg-white shadow-lg sm:rounded-lg p-8">
                        {/* Profil Pengguna */}
                        <div className="bg-gradient-to-r border-2 from-secondary/10 p-6 rounded-lg shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-bold text-gray-800">
                                    Profil Pengguna
                                </h3>
                                {/* Tombol Ubah Data Profil */}
                                <Link
                                    href={route("edit-profile")}
                                    className="flex gap-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                                        />
                                    </svg>
                                    Ubah Data Profil
                                </Link>
                            </div>

                            <div className="flex items-center gap-6">
                                {/* Foto Profil */}
                                <img
                                    src={
                                        pasPhoto?.file_path
                                            ? `/storage/${pasPhoto.file_path}`
                                            : `https://eu.ui-avatars.com/api/?name=${auth.user.name}&size=250`
                                    }
                                    alt="Foto Profil"
                                    className="w-28 h-28 rounded-full border-4 border-white shadow-md object-cover"
                                />

                                <div className="space-y-2">
                                    <p className="text-gray-700">
                                        <strong>Nama:</strong> {auth.user.name}
                                    </p>
                                    <p className="text-gray-700">
                                        <strong>Email:</strong>{" "}
                                        {auth.user.email}
                                    </p>
                                    <p className="text-gray-700">
                                        <strong>NISN:</strong> {auth.user.nisn}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Detail Orang Tua */}
                        <div className="mt-8 bg-gradient-to-r border-2 from-white to-secondary/10 p-6 rounded-lg shadow-sm">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">
                                Detail Orang Tua
                            </h3>
                            <div className="space-y-2">
                                <p className="text-gray-700">
                                    <strong>Nama Ayah:</strong>{" "}
                                    {auth.user?.detail?.father_name || "-"}
                                </p>
                                <p className="text-gray-700">
                                    <strong>Nama Ibu:</strong>{" "}
                                    {auth.user?.detail?.mother_name || "-"}
                                </p>
                                <p className="text-gray-700">
                                    <strong>Alamat:</strong>{" "}
                                    {auth.user?.detail?.address || "-"}
                                </p>
                            </div>
                        </div>

                        {/* Informasi Pendaftaran */}
                        <div className="mt-8 bg-gradient-to-r border-2 from-secondary/10 p-6 rounded-lg shadow-sm">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">
                                Informasi Pendaftaran
                            </h3>
                            <div className="space-y-2">
                                <strong className="text-gray-700">
                                    Status:
                                </strong>
                                <p
                                    className={`px-3 py-1 rounded-md font-semibold ml-1 text-sm
                                            ${
                                                auth.user?.registration
                                                    ?.status === "diterima"
                                                    ? "bg-green-500 text-white inline-block"
                                                    : auth.user?.registration
                                                          ?.status === "ditolak"
                                                    ? "bg-red-500 text-white"
                                                    : auth.user?.registration
                                                          ?.status ===
                                                      "menunggu"
                                                    ? "bg-yellow-500 text-gray-800"
                                                    : "inline-block"
                                            }`}
                                >
                                    {auth.user?.registration?.status || "-"}
                                </p>
                                <p className="text-gray-700">
                                    <strong className="mr-1">
                                        Tanggal Pendaftaran:
                                    </strong>
                                    {(auth.user?.registration?.status !==
                                        "menunggu" &&
                                        auth.user?.registration?.created_at &&
                                        new Date(
                                            auth.user?.registration?.created_at
                                        ).toLocaleDateString("id-ID")) ||
                                        "-"}
                                </p>
                            </div>
                        </div>

                        {/* Dokumen yang Diupload */}
                        <div className="mt-8 bg-gradient-to-r border-2 from-white to-secondary/10 p-6 rounded-lg shadow-sm">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">
                                Dokumen yang Diupload
                            </h3>
                            {auth.user?.registration ? (
                                <ul className="space-y-4">
                                    {auth.user.registration.documents?.length >
                                    0 ? (
                                        auth.user.registration.documents.map(
                                            (doc, index) =>
                                                doc.document_type.toUpperCase() !=
                                                    "KIP/PKH/PIP/SKTM" &&
                                                auth.user?.registration
                                                    .registration_path !=
                                                    "afirmasi" ? (
                                                    <li
                                                        key={index}
                                                        className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm"
                                                    >
                                                        <div className="flex-1">
                                                            <span className="text-gray-700 font-bold">
                                                                {doc.document_type.toUpperCase() ==
                                                                "SKHU RAPORT"
                                                                    ? "SKHU"
                                                                    : doc.document_type.toUpperCase()}
                                                            </span>
                                                            <p className="text-gray-700 text-xs">
                                                                {doc.legacy_file_name}
                                                            </p>
                                                            <p className="text-sm text-gray-800">
                                                               {convertToMB(doc.before_size)} 
                                                            </p>
                                                            <br />

                                                            {doc.file_path !=
                                                            "" ? (
                                                                <span
                                                                    className={`px-2 py-1 rounded text-white text-sm font-semibold ${getVerificationStatusColor(
                                                                        doc
                                                                            .verification
                                                                            ?.status
                                                                    )}`}
                                                                >
                                                                    {doc
                                                                        .verification
                                                                        ?.status ||
                                                                        "Menunggu"}
                                                                </span>
                                                            ) : (
                                                                <span
                                                                    className={`px-2 py-1 rounded text-white text-sm font-semibold bg-red-500`}
                                                                >
                                                                    Belum Upload
                                                                </span>
                                                            )}
                                                        </div>
                                                        {doc.verification
                                                            ?.status !=
                                                        "diverifikasi" ? (
                                                            <form
                                                                onSubmit={
                                                                    submit
                                                                }
                                                                className="flex gap-5 mr-5"
                                                            >
                                                                <input
                                                                    type="file"
                                                                    name={doc.document_type.toUpperCase()}
                                                                    onChange={
                                                                        handleFileChange
                                                                    }
                                                                />
                                                                {/* {errors.file && (
                                                                <div className="text-red-600">
                                                                    {
                                                                        errors.file
                                                                    }
                                                                </div>
                                                            )} */}
                                                                <button
                                                                    type="submit"
                                                                    disabled={
                                                                        processing
                                                                    }
                                                                    className="flex items-center gap-1 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-200 text-xs"
                                                                >
                                                                    Kirim Ulang
                                                                </button>
                                                            </form>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {/* <div className="text-gray-600 text-sm mr-10">
                                                        {new Date(
                                                            doc.created_at
                                                        ).toLocaleDateString(
                                                            "id-ID"
                                                        )}
                                                    </div> */}

                                                        {doc.file_path != "" ? (
                                                            <a
                                                                href={`storage/${doc.file_path}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center gap-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    strokeWidth={
                                                                        1.5
                                                                    }
                                                                    stroke="currentColor"
                                                                    className="size-5"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                                                    />
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                                    />
                                                                </svg>
                                                            </a>
                                                        ) : (
                                                            <a
                                                                href={`storage/${doc.file_path}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="invisible flex items-center gap-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    strokeWidth={
                                                                        1.5
                                                                    }
                                                                    stroke="currentColor"
                                                                    className="size-5"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                                                    />
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                                    />
                                                                </svg>
                                                            </a>
                                                        )}
                                                    </li>
                                                ) : (
                                                    ""
                                                )
                                        )
                                    ) : (
                                        <p className="text-gray-600 text-center">
                                            Belum ada dokumen yang diunggah.
                                        </p>
                                    )}
                                </ul>
                            ) : (
                                <div className="text-center">
                                    <p className="text-gray-600">
                                        Anda belum melakukan registrasi, silakan
                                        registrasi terlebih dahulu.
                                    </p>
                                    <div className="flex gap-5 justify-center my-5">
                                        <ButtonComponent
                                            link="/pendaftaran-jalur-reguler"
                                            text="Jalur Reguler"
                                            variant="secondary"
                                            size="lg"
                                            color="white"
                                        />
                                        <ButtonComponent
                                            link="/pendaftaran-jalur-afirmasi"
                                            text="Jalur Afirmasi"
                                            variant="secondary"
                                            size="lg"
                                            color="white"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
