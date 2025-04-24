<?php

namespace App\Filament\Resources\SchoolInfoResource\Pages;

use App\Filament\Resources\SchoolInfoResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditSchoolInfo extends EditRecord
{
    protected static string $resource = SchoolInfoResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\ViewAction::make(),
            Actions\DeleteAction::make(),
        ];
    }

    protected function mutateFormDataBeforeFill(array $data): array
    {
        if ($this->record->type === 'picture') {
            $json = json_decode($this->record->value, true);
            $data['image'] = $json['image'] ?? null;
        } else {
            $data['image'] = null;
        }

        return $data;
    }

    protected function mutateFormDataBeforeSave(array $data): array
    {
        if ($data['type'] === 'picture' && isset($data['image'])) {
            $data['value'] = json_encode(['image' => $data['image']]);
            $data['key'] = asset('storage/' . $data['image']);
        }

        unset($data['image']);
        return $data;
    }
}
