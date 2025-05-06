import { useEffect, useState } from "react";
import { useForm, usePage } from "@inertiajs/react";

export default function EditProfile({ user, detail, documents }) {
    const { errors, flash } = usePage().props;
    const [alert, setAlert] = useState({ type: "", message: "" });
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
        photo:
            documents?.find((doc) => doc.document_type === "pas photo")
                ?.file_path || "",

        //
        gender: detail?.gender || "",
        school_origin_type: detail?.school_origin_type || "",
        school_origin: detail?.school_origin || "",
        graduation_year: detail?.graduation_year || "",
        birth_place: detail?.birth_place || "",
        birth_date: detail?.birth_date || "",
        citizenship: detail?.citizenship || "",
        family_order: detail?.family_order || "",
        number_of_siblings: detail?.number_of_siblings || "",
        family_status: detail?.family_status || "",
        extracurricular: detail?.extracurricular.split(",") || [],
    });

    const [preview, setPreview] = useState(
        data.photo ? `/storage/${data.photo}` : null
    );

    const fatherJobOptions = [
        "Wiraswasta",
        "Pegawai",
        "Pedagang",
        "Lainnya",
        "Tidak Bekerja",
    ];
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
            setAlert({ type: "success", message: flash.success });
            setTimeout(() => setAlert({ type: "", message: "" }), 3000);
        }
        if (flash.error) {
            setAlert({ type: "error", message: flash.error });
            setTimeout(() => setAlert({ type: "", message: "" }), 3000);
        }
    }, [flash]);

    return (
        <div className="flex justify-center items-center min-h-screen p-4 bg-cover bg-[url('../image/hero/hero.jpg')] after:content-[''] after:absolute relative after:bg-black/60 after:inset-0 w-full">
            <div className="bg-white z-10">
                {alert.message && (
                    <div
                        className={`p-3 m-2 text-white rounded ${
                            alert.type === "success"
                                ? "bg-green-500"
                                : "bg-red-500"
                        }`}
                    >
                        {alert.message}
                    </div>
                )}
                <div className="flex flex-col md:flex-row w-full p-6 gap-5 rounded-lg shadow-lg">
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
                        <div className="">
                            Email:{" "}
                            <span className="font-semibold">{user.email}</span>
                        </div>
                    </div>

                    {/* Form Data */}
                    <div className="flex flex-col w-full md:w-2/3 p-5 border border-secondary rounded-lg gap-5">
                        <h2 className="text-lg font-semibold mb-2">
                            Data Pribadi
                        </h2>
                        {[
                            ["Nama", "name"],
                            ["NISN", "nisn"],
                            ["Jarak Rumah Ke Sekolah", "jarak_rumah"],
                            ["Asal Sekolah", "asal_sekolah"],
                            ["Alamat Rumah", "alamat_rumah"],
                            ["Nomor Telepon Orang Tua", "nomor_telepon"],
                        ].map(([label, field]) => (
                            <div key={field}>
                                <div className="flex flex-col md:flex-row items-start md:items-center">
                                    <label className="w-full md:w-1/2 text-gray-700">
                                        {label}
                                    </label>
                                    <div className="w-1/2">
                                        <input
                                            type="text"
                                            className={`border p-2 w-full md:w-full rounded-md ${
                                                field == "alamat_rumah" &&
                                                errors.alamat_rumah &&
                                                data.alamat_rumah === ""
                                                    ? "border-red-500"
                                                    : "border-secondary"
                                            }`}
                                            value={data[field]}
                                            onChange={(e) =>
                                                setData(field, e.target.value)
                                            }
                                        />
                                        <div className="text-sm font-medium">
                                            {field == "alamat_rumah" &&
                                                errors.alamat_rumah &&
                                                data.alamat_rumah === "" && (
                                                    <p className="text-red-500 text-sm">
                                                        {errors.alamat_rumah}
                                                    </p>
                                                )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div>
                            <label className="w-full md:w-1/2 text-gray-700 mb-2">
                                Jenis Kelamin
                            </label>
                            <div className="flex items-center gap-5">
                                <div className="flex items-center gap-1">
                                    <input
                                        type="radio"
                                        id="male"
                                        name="gender"
                                        value={"male"}
                                        checked={data.gender == "male"}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                gender: e.target.value,
                                            })
                                        }
                                    />
                                    <label
                                        htmlFor="male"
                                        className="text-gray-700"
                                    >
                                        Laki-laki
                                    </label>
                                </div>
                                <div className="flex items-center gap-1">
                                    <input
                                        type="radio"
                                        id="female"
                                        name="gender"
                                        value={"female"}
                                        checked={data.gender == "female"}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                gender: e.target.value,
                                            })
                                        }
                                    />
                                    <label
                                        htmlFor="female"
                                        className="text-gray-700"
                                    >
                                        Perempuan
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="w-full md:w-1/2 text-gray-700 mb-2">
                                Asal Sekolah
                            </label>
                            <div className="flex items-center gap-5">
                                <div className="flex items-center gap-1">
                                    <input
                                        type="radio"
                                        id="SD"
                                        name="schoolOriginType"
                                        value={"SD"}
                                        checked={
                                            data.school_origin_type == "SD"
                                        }
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                school_origin_type:
                                                    e.target.value,
                                            })
                                        }
                                    />
                                    <label
                                        htmlFor="SD"
                                        className="text-gray-700"
                                    >
                                        SD
                                    </label>
                                </div>
                                <div className="flex items-center gap-1">
                                    <input
                                        type="radio"
                                        id="MI"
                                        name="schoolOriginType"
                                        value={"MI"}
                                        checked={
                                            data.school_origin_type == "MI"
                                        }
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                school_origin_type:
                                                    e.target.value,
                                            })
                                        }
                                    />
                                    <label
                                        htmlFor="MI"
                                        className="text-gray-700"
                                    >
                                        MI
                                    </label>
                                </div>
                            </div>
                            {/* <input
                                type="text"
                                className={`border p-2 w-full md:w-full rounded-md border-secondary mt-3`}
                                value={data.school_origin}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        school_origin: e.target.value,
                                    })
                                }
                            /> */}
                        </div>

                        <div>
                            <div className="flex flex-col md:flex-row items-start md:items-center">
                                <label className="w-full md:w-1/2 text-gray-700">
                                    Tahun Lulus
                                </label>
                                <div className="w-1/2">
                                    <select
                                        className="border p-2 w-full md:w-full rounded-md border-secondary mt-3"
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                graduation_year: e.target.value,
                                            })
                                        }
                                    >
                                        <option
                                            value="2020"
                                            selected={
                                                data.graduation_year == "2020"
                                            }
                                        >
                                            2020
                                        </option>
                                        <option
                                            value="2021"
                                            selected={
                                                data.graduation_year == "2021"
                                            }
                                        >
                                            2021
                                        </option>
                                        <option
                                            value="2022"
                                            selected={
                                                data.graduation_year == "2022"
                                            }
                                        >
                                            2022
                                        </option>
                                        <option
                                            value="2023"
                                            selected={
                                                data.graduation_year == "2023"
                                            }
                                        >
                                            2023
                                        </option>
                                        <option
                                            value="2024"
                                            selected={
                                                data.graduation_year == "2024"
                                            }
                                        >
                                            2024
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="flex flex-col md:flex-row items-start md:items-center">
                                <label className="w-full md:w-1/2 text-gray-700">
                                    Tempat Lahir
                                </label>
                                <div className="w-1/2">
                                    <input
                                        type="text"
                                        className={`border p-2 w-full md:w-full rounded-md border-secondary`}
                                        value={data.birth_place}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                birth_place: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="flex flex-col md:flex-row items-start md:items-center">
                                <label className="w-full md:w-1/2 text-gray-700">
                                    Tanggal Lahir
                                </label>
                                <div className="w-1/2">
                                    <input
                                        type="date"
                                        className={`border p-2 w-full md:w-full rounded-md border-secondary`}
                                        value={data.birth_date}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                birth_date: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="flex flex-col md:flex-row items-start md:items-center">
                                <label className="w-full md:w-1/2 text-gray-700">
                                    Kewarganegaraan
                                </label>
                                <div className="w-1/2">
                                    <input
                                        type="text"
                                        className={`border p-2 w-full md:w-full rounded-md border-secondary`}
                                        value={data.citizenship}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                citizenship: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2 items-center">
                            <label className="text-sm font-medium mb-1 whitespace-nowrap">
                                Anak ke
                            </label>
                            <input
                                name="familyOrder"
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        family_order: e.target.value,
                                    })
                                }
                                type="text"
                                value={data.family_order}
                                className={`border p-2 w-full md:w-full rounded-md border-secondary`}
                            />
                            <label className="text-sm font-medium mb-1 whitespace-nowrap">
                                dari
                            </label>
                            <input
                                name="numberOfSiblings"
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        number_of_siblings: e.target.value,
                                    })
                                }
                                type="text"
                                value={data.number_of_siblings}
                                className={`border p-2 w-full md:w-full rounded-md border-secondary`}
                            />
                            <p>Bersaudara</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Anak
                            </label>
                            <span className="inline-flex gap-2 items-center mr-5">
                                <input
                                    id="fsYatim"
                                    name="familyStatus"
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            family_status: e.target.value,
                                        })
                                    }
                                    type="radio"
                                    value={"yatim"}
                                    checked={data.family_status == "yatim"}
                                />
                                <label htmlFor="fsYatim">Yatim</label>
                            </span>
                            <span className="inline-flex gap-2 items-center mr-5">
                                <input
                                    id="fsPiatu"
                                    name="familyStatus"
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            family_status: e.target.value,
                                        })
                                    }
                                    type="radio"
                                    value={"piatu"}
                                    checked={data.family_status == "piatu"}
                                />
                                <label htmlFor="fsPiatu">Piatu</label>
                            </span>
                            <span className="inline-flex gap-2 items-center">
                                <input
                                    id="fsYatimPiatu"
                                    name="familyStatus"
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            family_status: e.target.value,
                                        })
                                    }
                                    type="radio"
                                    value={"Yatim Piatu"}
                                    checked={
                                        data.family_status == "Yatim Piatu"
                                    }
                                />
                                <label htmlFor="fsYatimPiatu">
                                    Yatim Piatu
                                </label>
                            </span>
                        </div>

                        <h2 className="text-lg font-semibold mb-2 mt-4">
                            Data Ayah
                        </h2>
                        {[
                            ["Nama Ayah", "nama_ayah"],
                            ["Penghasilan Orang Tua", "penghasilan_orang_tua"],
                        ].map(([label, field]) => (
                            <div key={field} className="">
                                <div className="flex flex-col md:flex-row items-start md:items-center">
                                    <label className="w-full md:w-1/2 text-gray-700">
                                        {label}
                                    </label>
                                    <div className="w-1/2">
                                        <input
                                            type="text"
                                            className={`border p-2 w-full rounded-md ${
                                                field == "nama_ayah" &&
                                                errors.nama_ayah &&
                                                data.nama_ayah === ""
                                                    ? "border-red-500"
                                                    : "border-secondary"
                                            }`}
                                            value={data[field]}
                                            onChange={(e) =>
                                                setData(field, e.target.value)
                                            }
                                        />
                                        <div className="text-sm font-medium">
                                            {field == "nama_ayah" &&
                                                errors.nama_ayah &&
                                                data.nama_ayah === "" && (
                                                    <p className="text-red-500 text-sm">
                                                        {errors.nama_ayah}
                                                    </p>
                                                )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="flex flex-col md:flex-row items-start md:items-center">
                            <label className="w-full md:w-1/2 text-gray-700">
                                Pekerjaan Ayah
                            </label>
                            <div className="w-1/2">
                                <select
                                    className={`border p-2 w-full rounded-md ${
                                        errors.pekerjaan_ayah &&
                                        data.pekerjaan_ayah === ""
                                            ? "border-red-500"
                                            : "border-secondary"
                                    }`}
                                    value={fatherJobFormat}
                                    onChange={(e) =>
                                        setData(
                                            "pekerjaan_ayah",
                                            e.target.value
                                        )
                                    }
                                >
                                    {fatherJobOptions.map((option) => (
                                        <option
                                            key={option}
                                            value={option.toLowerCase()}
                                        >
                                            {option}
                                        </option>
                                    ))}
                                </select>
                                <div className="text-sm font-medium">
                                    {errors.pekerjaan_ayah &&
                                        data.pekerjaan_ayah === "" && (
                                            <p className="text-red-500 text-sm">
                                                {errors.pekerjaan_ayah}
                                            </p>
                                        )}
                                </div>
                            </div>
                        </div>

                        <h2 className="text-lg font-semibold mb-2 mt-4">
                            Data Ibu
                        </h2>
                        {[["Nama Ibu", "nama_ibu"]].map(([label, field]) => (
                            <div key={field} className="">
                                <div className="flex flex-col md:flex-row items-start md:items-center">
                                    <label className="w-full md:w-1/2 text-gray-700">
                                        {label}
                                    </label>
                                    <div className="w-1/2">
                                        <input
                                            type="text"
                                            className={`border p-2 w-full rounded-md ${
                                                field == "nama_ibu" &&
                                                errors.nama_ibu &&
                                                data.nama_ibu === ""
                                                    ? "border-red-500"
                                                    : "border-secondary"
                                            }`}
                                            value={data[field]}
                                            onChange={(e) =>
                                                setData(field, e.target.value)
                                            }
                                        />
                                        <div className="text-sm font-medium">
                                            {field == "nama_ibu" &&
                                                errors.nama_ibu &&
                                                data.nama_ibu === "" && (
                                                    <p className="text-red-500 text-sm">
                                                        {errors.nama_ibu}
                                                    </p>
                                                )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="flex flex-col md:flex-row items-start md:items-center">
                            <label className="w-full md:w-1/2 text-gray-700">
                                Pekerjaan Ibu
                            </label>
                            <div className="w-1/2">
                                <select
                                    className={`border p-2 w-full rounded-md ${
                                        errors.pekerjaan_ibu &&
                                        data.pekerjaan_ibu === ""
                                            ? "border-red-500"
                                            : "border-secondary"
                                    }`}
                                    value={motherJobFormat}
                                    onChange={(e) =>
                                        setData("pekerjaan_ibu", e.target.value)
                                    }
                                >
                                    {motherJobOptions.map((option) => (
                                        <option
                                            key={option}
                                            value={option.toLowerCase()}
                                        >
                                            {option}
                                        </option>
                                    ))}
                                </select>
                                <div className="text-sm font-medium">
                                    {errors.pekerjaan_ibu &&
                                        data.pekerjaan_ibu === "" && (
                                            <p className="text-red-500 text-sm">
                                                {errors.pekerjaan_ibu}
                                            </p>
                                        )}
                                </div>
                            </div>
                        </div>

                        <h2 className="text-lg font-semibold mb-2 mt-4">
                            Ekstrakulikuler
                        </h2>
                        <div>
                            <label className="text-sm font-medium mb-1 mr-5">
                                Pilih Ekstrakulikuler :
                            </label>
                            <span className="inline-flex gap-2 items-center mr-5">
                                <input
                                    id="ePaskibra"
                                    name="extracurricular"
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const checked = e.target.checked;

                                        setData({
                                            ...data,
                                            extracurricular: checked
                                                ? [
                                                      ...data.extracurricular,
                                                      value,
                                                  ] // tambahkan jika dicentang
                                                : data.extracurricular.filter(
                                                      (item) => item !== value
                                                  ), // hapus jika tidak dicentang
                                        });
                                    }}
                                    type="checkbox"
                                    value={"Paskibra"}
                                    checked={data.extracurricular.includes(
                                        "Paskibra"
                                    )}
                                />
                                <label htmlFor="ePaskibra">Paskibra</label>
                            </span>
                            <span className="inline-flex gap-2 items-center mr-5">
                                <input
                                    id="ePramuka"
                                    name="extracurricular"
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const checked = e.target.checked;

                                        setData({
                                            ...data,
                                            extracurricular: checked
                                                ? [
                                                      ...data.extracurricular,
                                                      value,
                                                  ] // tambahkan jika dicentang
                                                : data.extracurricular.filter(
                                                      (item) => item !== value
                                                  ), // hapus jika tidak dicentang
                                        });
                                    }}
                                    type="checkbox"
                                    value={"Pramuka"}
                                    checked={data.extracurricular.includes(
                                        "Pramuka"
                                    )}
                                />
                                <label htmlFor="ePramuka">Pramuka</label>
                            </span>
                            <span className="inline-flex gap-2 items-center mr-5">
                                <input
                                    id="eFutsal"
                                    name="extracurricular"
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const checked = e.target.checked;

                                        setData({
                                            ...data,
                                            extracurricular: checked
                                                ? [
                                                      ...data.extracurricular,
                                                      value,
                                                  ] // tambahkan jika dicentang
                                                : data.extracurricular.filter(
                                                      (item) => item !== value
                                                  ), // hapus jika tidak dicentang
                                        });
                                    }}
                                    type="checkbox"
                                    value={"Futsal"}
                                    checked={data.extracurricular.includes(
                                        "Futsal"
                                    )}
                                />
                                <label htmlFor="eFutsal">Futsal</label>
                            </span>
                            <span className="inline-flex gap-2 items-center mr-5">
                                <input
                                    id="eVoli"
                                    name="extracurricular"
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const checked = e.target.checked;

                                        setData({
                                            ...data,
                                            extracurricular: checked
                                                ? [
                                                      ...data.extracurricular,
                                                      value,
                                                  ] // tambahkan jika dicentang
                                                : data.extracurricular.filter(
                                                      (item) => item !== value
                                                  ), // hapus jika tidak dicentang
                                        });
                                    }}
                                    type="checkbox"
                                    value={"Voli"}
                                    checked={data.extracurricular.includes(
                                        "Voli"
                                    )}
                                />
                                <label htmlFor="eVoli">Voli</label>
                            </span>
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
