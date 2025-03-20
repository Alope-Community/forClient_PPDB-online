import { useEffect, useState } from "react";
import { useForm, usePage } from "@inertiajs/react";

export default function EditProfile({ user, detail, documents }) {
    const { errors, flash } = usePage().props
    const [alert, setAlert] = useState({ type: '', message: '' });
    const { data, setData, post, processing } = useForm({
        name: user?.name || "",
        nisn: user?.nisn || "",
        jarak_rumah: detail?.distance || "",
        asal_sekolah: detail?.school_origin || "",
        alamat_rumah: detail?.address || "",
        nama_ayah: detail?.father_name || "",
        nomor_telepon: detail?.phone_number || "",
        pekerjaan_ayah: detail?.father_job || "tidak bekerja",
        penghasilan_orang_tua: detail?.parent_salary || "",
        nama_ibu: detail?.mother_name || "",
        nomor_ibu_hp: detail?.mother_phone || "",
        pekerjaan_ibu: detail?.mother_job || "irt",
        ongkos_sekolah: detail?.school_expense || "",
        photo: documents?.find(doc => doc.document_type === 'pas photo')?.file_path || "",
    });

    const [preview, setPreview] = useState(data.photo ? `/storage/${data.photo}` : null);

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

    const showPreviewImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreview(imageUrl);
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

    useEffect(() => {
        if (flash.success) {
            setAlert({ type: 'success', message: flash.success });
            setTimeout(() => setAlert({ type: '', message: '' }), 3000);
        }
        if (flash.error) {
            setAlert({ type: 'error', message: flash.error });
            setTimeout(() => setAlert({ type: '', message: '' }), 3000);
        }
    }, [flash]);

    return (
        <div className="flex justify-center items-center min-h-screen p-4 bg-cover bg-[url('../image/hero/hero.jpg')] after:content-[''] after:absolute relative after:bg-black/60 after:inset-0">

            <div className="bg-white z-10">
                {alert.message && (
                    <div className={`p-3 m-2 text-white rounded ${alert.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                        {alert.message}
                    </div>
                )}
                <div className="flex flex-col md:flex-row w-full max-w-5xl p-6 gap-5 rounded-lg shadow-lg">
                    {/* Kotak Foto */}
                    <div className="flex flex-col gap-5">
                        <div className="w-72 h-64 border border-secondary rounded-lg flex items-center justify-center mt-2">
                            <input
                                id="photo"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    handleFileChange(e);
                                    showPreviewImage(e);
                                }}
                                className="hidden"
                            />
                            <label
                                htmlFor="photo"
                                className="cursor-pointer flex flex-col items-center justify-center w-full h-full text-center text-gray-900 sm:text-sm"
                            >
                                {preview ? (
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                ) : (
                                    <span>Upload Pas Foto</span>
                                )}
                            </label>
                        </div>
                        <div className="">Email: <span className="font-semibold">{user.email}</span></div>
                    </div>

                    {/* Form Data */}
                    <div className="flex flex-col w-full md:w-2/3 p-5 border border-secondary rounded-lg gap-5">
                        <h2 className="text-lg font-semibold mb-2">Data Pribadi</h2>
                        {[["Nama", "name"], ["NISN", "nisn"], ["Jarak Rumah Ke Sekolah", "jarak_rumah"], ["Asal Sekolah", "asal_sekolah"], ["Alamat Rumah", "alamat_rumah"], ["Nomor Telepon Orang Tua", "nomor_telepon"]].map(([label, field]) => (
                            <div key={field} className="">
                                <div className="flex flex-col md:flex-row items-start md:items-center">
                                    <label className="w-full md:w-1/2 text-gray-700">{label}</label>
                                    <div className="w-1/2">
                                        <input
                                            type="text"
                                            className={`border p-2 w-full md:w-full rounded-md ${field == 'alamat_rumah' && errors.alamat_rumah && data.alamat_rumah === '' ? 'border-red-500' : 'border-secondary'}`}
                                            value={data[field]}
                                            onChange={(e) => setData(field, e.target.value)}
                                        />
                                        <div className="text-sm font-medium">
                                            {field == 'alamat_rumah' && errors.alamat_rumah && data.alamat_rumah === '' && <p className="text-red-500 text-sm">{errors.alamat_rumah}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <h2 className="text-lg font-semibold mb-2 mt-4">Data Ayah</h2>
                        {[["Nama Ayah", "nama_ayah"], ["Penghasilan Orang Tua", "penghasilan_orang_tua"]].map(([label, field]) => (
                            <div key={field} className="">
                                <div className="flex flex-col md:flex-row items-start md:items-center">
                                    <label className="w-full md:w-1/2 text-gray-700">{label}</label>
                                    <div className="w-1/2">
                                        <input
                                            type="text"
                                            className={`border p-2 w-full rounded-md ${field == 'nama_ayah' && errors.nama_ayah && data.nama_ayah === '' ? 'border-red-500' : 'border-secondary'}`}
                                            value={data[field]}
                                            onChange={(e) => setData(field, e.target.value)}
                                        />
                                        <div className="text-sm font-medium">
                                            {field == 'nama_ayah' && errors.nama_ayah && data.nama_ayah === '' && <p className="text-red-500 text-sm">{errors.nama_ayah}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="flex flex-col md:flex-row items-start md:items-center">
                            <label className="w-full md:w-1/2 text-gray-700">Pekerjaan Ayah</label>
                            <div className="w-1/2">
                                <select
                                    className={`border p-2 w-full rounded-md ${errors.pekerjaan_ayah && data.pekerjaan_ayah === '' ? 'border-red-500' : 'border-secondary'}`}
                                    value={fatherJobFormat}
                                    onChange={(e) => setData("pekerjaan_ayah", e.target.value)}>
                                    {fatherJobOptions.map((option) => (
                                        <option key={option} value={option.toLowerCase()}>{option}</option>
                                    ))}
                                </select>
                                <div className="text-sm font-medium">
                                    {errors.pekerjaan_ayah && data.pekerjaan_ayah === '' && <p className="text-red-500 text-sm">{errors.pekerjaan_ayah}</p>}
                                </div>
                            </div>
                        </div>

                        <h2 className="text-lg font-semibold mb-2 mt-4">Data Ibu</h2>
                        {[["Nama Ibu", "nama_ibu"]].map(([label, field]) => (
                            <div key={field} className="">
                                <div className="flex flex-col md:flex-row items-start md:items-center">
                                    <label className="w-full md:w-1/2 text-gray-700">{label}</label>
                                    <div className="w-1/2">
                                        <input
                                            type="text"
                                            className={`border p-2 w-full rounded-md ${field == 'nama_ibu' && errors.nama_ibu && data.nama_ibu === '' ? 'border-red-500' : 'border-secondary'}`}
                                            value={data[field]}
                                            onChange={(e) => setData(field, e.target.value)}
                                        />
                                        <div className="text-sm font-medium">
                                            {field == 'nama_ibu' && errors.nama_ibu && data.nama_ibu === '' && <p className="text-red-500 text-sm">{errors.nama_ibu}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="flex flex-col md:flex-row items-start md:items-center">
                            <label className="w-full md:w-1/2 text-gray-700">Pekerjaan Ibu</label>
                            <div className="w-1/2">
                                <select
                                    className={`border p-2 w-full rounded-md ${errors.pekerjaan_ibu && data.pekerjaan_ibu === '' ? 'border-red-500' : 'border-secondary'}`}
                                    value={motherJobFormat}
                                    onChange={(e) => setData("pekerjaan_ibu", e.target.value)}
                                >
                                    {motherJobOptions.map((option) => (
                                        <option key={option} value={option.toLowerCase()}>{option}</option>
                                    ))}
                                </select>
                                <div className="text-sm font-medium">
                                    {errors.pekerjaan_ibu && data.pekerjaan_ibu === '' && <p className="text-red-500 text-sm">{errors.pekerjaan_ibu}</p>}
                                </div>
                            </div>
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
        </div>
    );
}
