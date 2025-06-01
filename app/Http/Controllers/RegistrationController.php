<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\Registration;
use App\Models\Verification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Services\HuffmanService;
use Illuminate\Support\Facades\Storage;

class RegistrationController extends Controller
{
    public function regularPath()
    {
        $registration = Registration::whereUserId(Auth::user()->id)->first();

        return Inertia::render('PendaftaranJalurReguler', [
            "registration" => $registration
        ]);
    }

    public function afirmationPath()
    {
        $registration = Registration::whereUserId(Auth::user()->id)->first();

        return Inertia::render('PendaftaranJalurAfirmasi', [
            "registration" => $registration
        ]);
    }

    public function registration(Request $request)
    {
        $request->validate([
            'kartu_keluarga' => 'required|file|mimes:jpg,jpeg|max:10240',
            'akte_kelahiran' => 'required|file|mimes:jpg,jpeg|max:10240',
            'ijazah' => 'nullable|file|mimes:jpg,jpeg|max:10240',
            'skhu_raport' => 'nullable|file|mimes:jpg,jpeg|max:10240',
            'kip_pkh_pip_sktm' => 'nullable|file|mimes:jpg,jpeg|max:10240',
            'user_id' => 'required',
            'jalur_registrasi' => 'required',
        ]);

        $fileFields = ['kartu_keluarga', 'akte_kelahiran', 'ijazah', 'skhu_raport'];
        $huffmanService = app(HuffmanService::class);

        $fileData = collect($fileFields)->mapWithKeys(function ($field) use ($request, $huffmanService) {
            if (!$request->hasFile($field)) {
                return [
                    $field => [
                        'path' => '',
                        'before_size' => null,
                        'after_size' => null,
                    ],
                ];
            }

            $file = $request->file($field);
            $filename = uniqid() . '.' . $file->getClientOriginalExtension();
            $directory = storage_path("app/public/documents/$field");

            if (!file_exists($directory)) {
                mkdir($directory, 0755, true);
            }

            $targetPath = "$directory/$filename";
            $file->move(dirname($targetPath), basename($targetPath));

            $beforeSize = filesize($targetPath);
            $compressedFilename = pathinfo($targetPath, PATHINFO_FILENAME) . '_compressed.' . pathinfo($targetPath, PATHINFO_EXTENSION);
            $compressedPath = dirname($targetPath) . '/' . $compressedFilename;

            copy($targetPath, $compressedPath);
            $huffmanService->compressImage($compressedPath);
            $afterSize = filesize($compressedPath);

            unlink($targetPath);
            rename($compressedPath, $targetPath);
            $huffmanService->decompressImage($targetPath);

            return [
                $field => [
                    'path' => "documents/$field/" . $filename,
                    'before_size' => $beforeSize,
                    'after_size' => $afterSize,
                ],
            ];
        })->toArray();

        // Handle file tambahan jika jalur afirmasi
        if ($request->jalur_registrasi === 'afirmasi' && $request->hasFile('kip_pkh_pip_sktm')) {
            $file = $request->file('kip_pkh_pip_sktm');
            $filename = uniqid() . '.' . $file->getClientOriginalExtension();
            $directory = storage_path("app/public/documents/kip_pkh_pip_sktm");

            if (!file_exists($directory)) {
                mkdir($directory, 0755, true);
            }

            $targetPath = "$directory/$filename";
            $file->move(dirname($targetPath), basename($targetPath));

            $beforeSize = filesize($targetPath);
            $compressedFilename = pathinfo($targetPath, PATHINFO_FILENAME) . '_compressed.' . pathinfo($targetPath, PATHINFO_EXTENSION);
            $compressedPath = dirname($targetPath) . '/' . $compressedFilename;

            copy($targetPath, $compressedPath);
            $huffmanService->compressImage($compressedPath);
            $afterSize = filesize($compressedPath);

            unlink($targetPath);
            rename($compressedPath, $targetPath);
            $huffmanService->decompressImage($targetPath);

            $fileData['kip_pkh_pip_sktm'] = [
                'path' => "documents/kip_pkh_pip_sktm/" . $filename,
                'before_size' => $beforeSize,
                'after_size' => $afterSize,
            ];
        } else {
            // tetap isi meskipun tidak ada file jika jalur afirmasi
            $fileData['kip_pkh_pip_sktm'] = [
                'path' => '',
                'before_size' => null,
                'after_size' => null,
            ];
        }

        $registration = Registration::create([
            'user_id' => $request->user_id,
            'registration_path' => $request->jalur_registrasi,
        ]);

        $documentTypes = [
            'kartu_keluarga' => 'kartu keluarga',
            'akte_kelahiran' => 'akte kelahiran',
            'ijazah' => 'ijazah',
            'skhu_raport' => 'skhu raport',
            'kip_pkh_pip_sktm' => 'kip/pkh/pip/sktm',
        ];

        $documents = [];
        foreach ($fileData as $field => $data) {
            // Skip 'kip_pkh_pip_sktm' jika jalur afirmasi
            if ($field === 'kip_pkh_pip_sktm' && $request->jalur_registrasi === 'afirmasi') {
                continue;
            }

            $documents[] = [
                'registration_id' => $registration->id,
                'document_type' => $documentTypes[$field],
                'file_path' => $data['path'],
                'before_size' => $data['before_size'],
                'after_size' => $data['after_size'],
                'created_at' => now(),
            ];
        }

        Document::insert($documents);

        return redirect("/dashboard")->with('success', 'Berhasil Daftar');
    }

    public function updateDocument(Request $request)
    {
        $request->validate([
            'document_type' => 'required',
            'file' => 'required|file|mimes:jpg,jpeg|max:10240',
        ]);

        $userId = auth()->id();
        $documentType = strtolower($request->document_type);

        $document = Document::whereHas('registration', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })->where('document_type', $documentType)->firstOrFail();

        if (Storage::disk('public')->exists($document->file_path)) {
            Storage::disk('public')->delete($document->file_path);
        }

        $newPath = $request->file('file')->store("documents/$documentType", 'public');

        $document->update([
            'file_path' => $newPath,
        ]);

        Verification::updateOrCreate(
            ['document_id' => $document->id],
            [
                'status' => 'menunggu',
                'admin_id' => 1
            ]
        );

        return redirect("/dashboard")->with('success', 'Berhasil Update Dokumen');
    }
}
