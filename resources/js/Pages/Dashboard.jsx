import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import {
    IconPencil,
    IconEye
} from "@tabler/icons-react";

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-lg sm:rounded-lg p-8">
                        {/* Profil Pengguna */}
                        <div className="bg-gradient-to-r border-2 from-secondary/10 p-6 rounded-lg shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-bold text-gray-800">Profil Pengguna</h3>
                                {/* Tombol Ubah Data Profil */}
                                <Link
                                    href={route('edit-profile')}
                                    className="flex gap-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                                >
                                    <IconPencil />
                                    Ubah Data Profil
                                </Link>
                            </div>

                            <div className="flex items-center gap-6">
                                {/* Foto Profil */}
                                <img
                                    src={auth.user.registration.documents.document_type == 'pas photo' || auth.user.registration.documents.document_type == 'pas_foto' || `https://eu.ui-avatars.com/api/?name=${auth.user.name}&size=250`}
                                    alt="Foto Profil"
                                    className="w-28 h-28 rounded-full border-4 border-white shadow-md"
                                />
                                <div className="space-y-2">
                                    <p className="text-gray-700"><strong>Nama:</strong> {auth.user.name}</p>
                                    <p className="text-gray-700"><strong>Email:</strong> {auth.user.email}</p>
                                    <p className="text-gray-700"><strong>NISN:</strong> {auth.user.nisn}</p>
                                </div>
                            </div>
                        </div>

                        {/* Detail Orang Tua */}
                        {auth.user.detail && (
                            <div className="mt-8 bg-gradient-to-r border-2 from-white to-secondary/10 p-6 rounded-lg shadow-sm">
                                <h3 className="text-2xl font-bold text-gray-800 mb-6">Detail Orang Tua</h3>
                                <div className="space-y-2">
                                    <p className="text-gray-700"><strong>Nama Ayah:</strong> {auth.user.detail.father_name}</p>
                                    <p className="text-gray-700"><strong>Nama Ibu:</strong> {auth.user.detail.mother_name}</p>
                                    <p className="text-gray-700"><strong>Alamat:</strong> {auth.user.detail.address}</p>
                                </div>
                            </div>
                        )}

                        {/* Informasi Pendaftaran */}
                        {auth.user.registration && (
                            <div className="mt-8 bg-gradient-to-r border-2 from-secondary/10 p-6 rounded-lg shadow-sm">
                                <h3 className="text-2xl font-bold text-gray-800 mb-6">Informasi Pendaftaran</h3>
                                <div className="space-y-2">
                                    <strong className='text-gray-700'>Status:</strong>
                                    <p className={`px-3 py-1 rounded-md font-semibold ml-1 text-sm
                                            ${auth.user.registration.status === 'diterima'
                                            ? 'bg-green-500 text-white inline-block'
                                            : auth.user.registration.status === 'ditolak'
                                                ? 'bg-red-500 text-white'
                                                : auth.user.registration.status === 'menunggu'
                                                    ? 'bg-yellow-500 text-gray-800'
                                                    : 'bg-gray-500 text-white'}`}>
                                        {auth.user.registration.status}
                                    </p>
                                    <p className="text-gray-700">
                                        <strong className='mr-1'>Tanggal Pendaftaran:</strong>
                                        {auth.user.registration.status !== 'menunggu' &&
                                            new Date(auth.user.registration.created_at).toLocaleDateString('id-ID')}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Dokumen yang Diupload */}
                        {auth.user.registration?.documents?.length > 0 && (
                            <div className="mt-8 bg-gradient-to-r border-2 from-white to-secondary/10 p-6 rounded-lg shadow-sm">
                                <h3 className="text-2xl font-bold text-gray-800 mb-6">Dokumen yang Diupload</h3>
                                <ul className="space-y-4">
                                    {auth.user.registration.documents.map((doc, index) => {
                                        return (
                                            <li key={index} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
                                                <div>
                                                    <span className="text-gray-700 font-bold">
                                                        {doc.document_type.toUpperCase()} -
                                                        <strong className={`px-2 ml-1 py-1 rounded text-white text-sm font-semibold ${!doc.verification ? 'bg-gray-500' :
                                                            doc.verification.status === 'menunggu' ? 'bg-yellow-500' :
                                                                doc.verification.status === 'diverifikasi' ? 'bg-green-500' :
                                                                    doc.verification.status === 'ditolak' ? 'bg-red-500' : 'bg-black'
                                                            }`}>
                                                            {doc.verification?.status || 'Belum Diverifikasi'}
                                                        </strong>
                                                    </span>
                                                </div>
                                                <div className="">{new Date(doc.created_at).toLocaleDateString('id-ID')}</div>
                                                <a
                                                    href={doc.file_path}
                                                    target="_blank"
                                                    className="flex gap-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                                                >
                                                    <IconEye />
                                                    Lihat Dokumen
                                                </a>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
