<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\Registration;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RegistrationContoller extends Controller
{
    public function regularPath()
    {
        return Inertia::render('PendaftaranJalurReguler');
    }

    public function afirmationPath()
    {
        return Inertia::render('PendaftaranJalurAfirmasi');
    }

    public function registration(Request $request)
    {
        $request->validate([
            'pas_foto' => 'required|file|mimes:jpg,jpeg|max:10240',
            'kartu_keluarga' => 'required|file|mimes:jpg,jpeg|max:10240',
            'akte_kelahiran' => 'required|file|mimes:jpg,jpeg|max:10240',
            'kia_ktp_ortu' => 'required|file|mimes:jpg,jpeg|max:10240',
            'ijazah' => 'required|file|mimes:jpg,jpeg|max:10240',
            'skhu_raport' => 'required|file|mimes:jpg,jpeg|max:10240',
            'user_id' => 'required',
            'jalur_registrasi' => 'required',
        ]);

        $fileFields = ['pas_foto', 'kartu_keluarga', 'akte_kelahiran', 'kia_ktp_ortu', 'ijazah', 'skhu_raport'];

        $filePaths = collect($fileFields)->mapWithKeys(fn($field) => [
            $field => $request->file($field)->store("documents/$field")
        ])->toArray();

        $registration = Registration::create([
            'user_id' => $request->user_id,
            'jalur_registrasi' => $request->jalur_registrasi,
        ]);

        $documentTypes = [
            'pas_foto' => 'pas photo',
            'kartu_keluarga' => 'kartu keluarga',
            'akte_kelahiran' => 'akte kelahiran',
            'kia_ktp_ortu' => 'ktp ortu',
            'ijazah' => 'ijazah',
            'skhu_raport' => 'skhu raport',
        ];

        $documents = array_map(fn($field) => [
            'registration_id' => $registration->id,
            'document_type' => $documentTypes[$field],
            'file_path' => $filePaths[$field],
        ], $fileFields);

        Document::insert($documents);

        return redirect("/");
    }
}
