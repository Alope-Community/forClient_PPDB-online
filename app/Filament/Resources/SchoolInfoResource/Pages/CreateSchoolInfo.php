<?php

namespace App\Filament\Resources\SchoolInfoResource\Pages;

use App\Filament\Resources\SchoolInfoResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateSchoolInfo extends CreateRecord
{
    protected static string $resource = SchoolInfoResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        if ($data['type'] === 'picture' && isset($data['image'])) {
            $data['value'] = json_encode(['image' => $data['image']]);
            $data['key'] = asset('storage/' . $data['image']);
        }

        unset($data['image']);
        return $data;
    }
}
