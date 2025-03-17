import { useForm } from "@inertiajs/react";
import { useState } from "react";

export default function EditProfile({ user, detail, documents }) {
    const { data, setData, post, processing } = useForm({
        name: user?.name || "",
        nisn: user?.nisn || "",
        jarak_rumah: detail?.distance || "",
        asal_sekolah: detail?.school_origin || "",
        alamat_rumah: detail?.address || "",
        nama_ayah: detail?.father_name || "",
        nomor_telepon: detail?.phone_number || "",
        pekerjaan_ayah: detail?.father_job || "",
        penghasilan_orang_tua: detail?.parent_salary || "",
        nama_ibu: detail?.mother_name || "",
        nomor_ibu_hp: detail?.mother_phone || "",
        pekerjaan_ibu: detail?.mother_job || "",
        ongkos_sekolah: detail?.school_expense || "",
        photo: documents?.find(doc => doc.document_type === 'pas photo')?.file_path || "",
    });

    const [preview, setPreview] = useState(data.photo ? `/storage/${data.photo}` : null);
    console.log('preview: ', preview);
    
    const fatherJobOptions = ["Wiraswasta", "Pegawai", "Pedagang", "Lainnya", "Tidak Bekerja"];
    const fatherJobFormat = (data.pekerjaan_ayah || "").toLowerCase();
    
    const motherJobOptions = ["IRT", "Pedagang", "Pegawai", "Lainnya"];
    const motherJobFormat = (data.pekerjaan_ibu || "").toLowerCase();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("photo", file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
    
        Object.keys(data).forEach((key) => {
            if (key === "photo") {
                if (data[key] instanceof File) {
                    formData.append(key, data[key]);
                }
            } else {
                formData.append(key, data[key] || "");
            }
        });
    
        post(route("update-profile"), {
            data: formData,
            forceFormData: true,
        });
    };

    return (
        <div className="flex justify-center items-center min-h-screen p-4 bg-cover bg-[url('../image/hero/hero.jpg')] after:content-[''] after:absolute relative after:bg-black/60 after:inset-0">
            <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white z-10 p-6 gap-5 rounded-lg shadow-lg">

                {/* Kotak Foto */}
                <div className="flex flex-col items-center md:w-1/3">
                    <div className="w-56 h-56 md:w-64 md:h-64 border border-secondary rounded-lg mb-2 overflow-hidden">
                        {preview ? (
                            <img src={preview} alt="Pas Foto" className="w-full h-full object-cover" />
                        ) : (
                            <p className="text-gray-500 text-center mt-24">Tidak ada foto</p>
                        )}
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        className="text-sm text-gray-500"
                        onChange={handleFileChange}
                    />
                    <p className="text-gray-700 font-medium mt-2">{user?.email}</p>
                </div>

                {/* Form Data */}
                <div className="w-full md:w-2/3 p-5 border border-secondary rounded-lg">
                    <h2 className="text-lg font-semibold mb-2">Data Pribadi</h2>
                    {[["Nama", "name"], ["NISN", "nisn"], ["Jarak Rumah Ke Sekolah", "jarak_rumah"], ["Asal Sekolah", "asal_sekolah"], ["Alamat Rumah", "alamat_rumah"], ["Nomor Telepon Orang Tua", "nomor_telepon"]].map(([label, field]) => (
                        <div key={field} className="flex flex-col md:flex-row items-start md:items-center">
                            <label className="w-full md:w-1/2 text-gray-700">{label}</label>
                            <input
                                type="text"
                                className="border border-secondary p-2 w-full md:w-1/2 rounded-md"
                                value={data[field]}
                                onChange={(e) => setData(field, e.target.value)}
                            />
                        </div>
                    ))}

                    <h2 className="text-lg font-semibold mb-2 mt-4">Data Ayah</h2>
                    {[["Nama Ayah", "nama_ayah"], ["Penghasilan Orang Tua", "penghasilan_orang_tua"]].map(([label, field]) => (
                        <div key={field} className="flex flex-col md:flex-row items-start md:items-center">
                            <label className="w-full md:w-1/2 text-gray-700">{label}</label>
                            <input
                                type="text"
                                className="border border-secondary p-2 w-full md:w-1/2 rounded-md"
                                value={data[field]}
                                onChange={(e) => setData(field, e.target.value)}
                            />
                        </div>
                    ))}

                    <div className="flex flex-col md:flex-row items-start md:items-center">
                        <label className="w-full md:w-1/2 text-gray-700">Pekerjaan Ayah</label>
                        <select
                            className="border border-secondary p-2 w-full md:w-1/2 rounded-md"
                            value={fatherJobFormat}
                            onChange={(e) => setData("pekerjaan_ayah", e.target.value)}>
                            {fatherJobOptions.map((option) => (
                                <option key={option} value={option.toLowerCase()}>{option}</option>
                            ))}
                        </select>
                    </div>

                    <h2 className="text-lg font-semibold mb-2 mt-4">Data Ibu</h2>
                    {[["Nama Ibu", "nama_ibu"]].map(([label, field]) => (
                        <div key={field} className="flex flex-col md:flex-row items-start md:items-center">
                            <label className="w-full md:w-1/2 text-gray-700">{label}</label>
                            <input
                                type="text"
                                className="border border-secondary p-2 w-full md:w-1/2 rounded-md"
                                value={data[field]}
                                onChange={(e) => setData(field, e.target.value)}
                            />
                        </div>
                    ))}

                    <div className="flex flex-col md:flex-row items-start md:items-center">
                        <label className="w-full md:w-1/2 text-gray-700">Pekerjaan Ayah</label>
                        <select
                            className="border border-secondary p-2 w-full md:w-1/2 rounded-md"
                            value={motherJobFormat}
                            onChange={(e) => setData("pekerjaan_ibu", e.target.value)}
                        >
                            {motherJobOptions.map((option) => (
                                <option key={option} value={option.toLowerCase()}>{option}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-end mt-4">
                        <button
                            type="submit"
                            className="bg-secondary text-white p-2 rounded-md w-full md:w-1/3 hover:bg-secondary/90"
                            onClick={handleSubmit}
                            disabled={processing}
                        >
                            Simpan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
