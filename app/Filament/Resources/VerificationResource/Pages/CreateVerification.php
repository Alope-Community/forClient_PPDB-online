<?php

namespace App\Filament\Resources\VerificationResource\Pages;

use App\Filament\Resources\VerificationResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateVerification extends CreateRecord
{
    protected static string $resource = VerificationResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $data['admin_id'] = auth()->id();
        if ($data['status'] == 'diverifikasi') {
            $data['verified_at'] = now();
        }
        return $data;
    }
}
