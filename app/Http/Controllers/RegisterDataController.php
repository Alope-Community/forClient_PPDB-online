<?php

namespace App\Http\Controllers;

use App\Models\UserDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RegisterDataController extends Controller
{
    public function store(Request $request)
    {
        $userId = Auth::user()->id;

        $validatedData = $request->validate([
            'fatherName'          => 'required|string|max:255',
            'motherName'          => 'required|string|max:255',
            'phoneNumber'         => 'nullable|string|max:15',
            'fatherJob'           => 'required|string|max:100',
            'motherJob'           => 'required|string|max:100',
            'parentSalary'        => 'nullable|string|max:50',
            'distance'            => 'required|numeric|min:0',
            'address'             => 'required|string|max:500',
            'schoolOrigin'        => 'required|string|max:255',
            'schoolExpense'       => 'nullable|string|max:255',

            // Tambahan field
            'gender'              => 'required|in:male,female',
            'birthPlace'         => 'nullable|string|max:255',
            'birthDate'          => 'nullable|date',
            'religion'            => 'required|in:islam,kristen,katolik,hindu,budha,konghucu',
            'citizenship'         => 'nullable|string|max:255',
            'familyOrder'        => 'nullable|string|max:50',
            'numberOfSiblings'  => 'nullable|string|max:50',
            'familyStatus'       => 'nullable|string|max:100',
            'schoolOriginType'  => 'required|in:SD,MI',
            'graduationYear'     => 'nullable|string|max:10',
            'extracurricular'     => 'nullable',
        ], [
            'required' => ':attribute harus diisi!',
            'max'      => ':attribute terlalu panjang!',
            'numeric'  => ':attribute harus berupa angka!',
            'min'      => ':attribute tidak boleh kurang dari 0!',
            'in'       => ':attribute tidak valid!',
            'date'     => ':attribute harus berupa tanggal yang valid!',
        ], [
            'fatherName'          => 'Nama Ayah',
            'motherName'          => 'Nama Ibu',
            'phoneNumber'         => 'Nomor Telepon',
            'fatherJob'           => 'Pekerjaan Ayah',
            'motherJob'           => 'Pekerjaan Ibu',
            'parentSalary'        => 'Penghasilan Orang Tua',
            'distance'            => 'Jarak Rumah ke Sekolah',
            'address'             => 'Alamat Rumah',
            'schoolOrigin'        => 'Asal Sekolah',
            'schoolExpense'       => 'Biaya Sekolah',

            // Mapping nama field tambahan
            'gender'              => 'Jenis Kelamin',
            'birthPlace'         => 'Tempat Lahir',
            'birthDate'          => 'Tanggal Lahir',
            'religion'            => 'Agama',
            'citizenship'         => 'Kewarganegaraan',
            'familyOrder'        => 'Anak Ke-',
            'numberOfSiblings'  => 'Jumlah Saudara',
            'familyStatus'       => 'Status dalam Keluarga',
            'schoolOriginType'  => 'Jenis Asal Sekolah',
            'graduationYear'     => 'Tahun Lulus',
            'extracurricular'     => 'Ekstrakurikuler',
        ]);


        $formattedData = [
            'user_id'            => $userId,
            'father_name'        => $validatedData['fatherName'],
            'mother_name'        => $validatedData['motherName'],
            'phone_number'       => $validatedData['phoneNumber'] ?? null,
            'father_job'         => $validatedData['fatherJob'],
            'mother_job'         => $validatedData['motherJob'],
            'parent_salary'      => $validatedData['parentSalary'] ?? null,
            'distance'           => $validatedData['distance'],
            'address'            => $validatedData['address'],
            'school_origin'      => $validatedData['schoolOrigin'] ?? null,
            'school_expense'     => $validatedData['schoolExpense'] ?? null,

            // Tambahan field baru
            'gender'             => $validatedData['gender'],
            'birth_place'        => $validatedData['birthPlace'] ?? null,
            'birth_date'         => $validatedData['birthDate'] ?? null,
            'religion'           => $validatedData['religion'],
            'citizenship'        => $validatedData['citizenship'] ?? null,
            'family_order'       => $validatedData['familyOrder'] ?? null,
            'number_of_siblings' => $validatedData['numberOfSiblings'] ?? null,
            'family_status'      => $validatedData['familyStatus'] ?? null,
            'school_origin_type' => $validatedData['schoolOriginType'],
            'graduation_year'    => $validatedData['graduationYear'] ?? null,
            'extracurricular' => isset($validatedData['extracurricular'])
                ? (is_array($validatedData['extracurricular'])
                    ? implode(',', $validatedData['extracurricular'])
                    : $validatedData['extracurricular'])
                : null,
        ];

        try {
            UserDetail::create($formattedData);
            return redirect()->route('dashboard')->with('success', 'Data berhasil disimpan!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Terjadi kesalahan, coba lagi.', $e);
        }
    }
}
