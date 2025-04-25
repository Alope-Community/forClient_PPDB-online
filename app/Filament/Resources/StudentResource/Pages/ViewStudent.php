<?php

namespace App\Filament\Resources\StudentResource\Pages;

use App\Filament\Resources\StudentResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;

class ViewStudent extends ViewRecord
{
    protected static string $resource = StudentResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\EditAction::make(),
        ];
    }

    protected function mutateFormDataBeforeFill(array $data): array
    {
        $data['documents'] = $this->record->registration?->documents?->map(function ($document) {
            return [
                'document_type' => $document->document_type,
                'file_path' => $document->file_path,
                'status' => $document->verification?->status,
                'message' => $document->verification?->message,
            ];
        })->toArray();

        return $data;
    }
}
