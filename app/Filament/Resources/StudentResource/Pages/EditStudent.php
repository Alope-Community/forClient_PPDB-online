<?php

namespace App\Filament\Resources\StudentResource\Pages;

use App\Filament\Resources\StudentResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditStudent extends EditRecord
{
    protected static string $resource = StudentResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\ViewAction::make(),
            Actions\DeleteAction::make(),
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

    protected function afterSave(): void
    {
        $documentsData = $this->form->getState()['documents'] ?? [];

        $registration = $this->record->registration;

        $registration->documents()->delete();

        foreach ($documentsData as $doc) {
            $document = $registration->documents()->create([
                'document_type' => $doc['document_type'],
                'file_path' => $doc['file_path'],
            ]);

            $document->verification()->create([
                'admin_id' => auth()->id(),
                'status' => $doc['status'] ?? 'menunggu',
                'message' => $doc['message'] ?? '',
            ]);
        }
    }
}
