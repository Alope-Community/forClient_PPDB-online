<?php

namespace App\Filament\Resources;

use App\Filament\Resources\VerificationResource\Pages;
use App\Filament\Resources\VerificationResource\RelationManagers;
use App\Models\Verification;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class VerificationResource extends Resource
{
    protected static ?string $model = Verification::class;

    protected static ?string $navigationIcon = 'heroicon-o-document-check';

    public static function getModelLabel(): string
    {
        return 'Verifikasi Dokumen';
    }

    public static function getPluralModelLabel(): string
    {
        return 'Verifikasi Dokumen';
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make([
                    Forms\Components\Select::make('document_id')
                        ->label('Dokumen')
                        ->options(
                            \App\Models\Document::all()->mapWithKeys(function ($document) {
                                return [
                                    $document->id => "{$document->document_type} - {$document->registration->user->name}"
                                ];
                            })
                        )
                        ->searchable()
                        ->required(),
                    Forms\Components\ToggleButtons::make('status')
                        ->label('Status')
                        ->inline()
                        ->default('menunggu')
                        ->options([
                            'menunggu' => 'Menunggu',
                            'diverifikasi' => 'Diverifikasi',
                            'ditolak' => 'Ditolak',
                        ])
                        ->icons([
                            'menunggu' => 'heroicon-o-clock',
                            'diverifikasi' => 'heroicon-o-check-circle',
                            'ditolak' => 'heroicon-o-x-circle',
                        ])
                        ->colors([
                            'menunggu' => 'warning',
                            'diverifikasi' => 'success',
                            'ditolak' => 'danger',
                        ]),
                    Forms\Components\Textarea::make('message')
                        ->label('Pesan'),
                ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('document.registration.user.name')
                    ->searchable()
                    ->label('Nama Pendaftar'),
                Tables\Columns\TextColumn::make('document.registration.registration_path')
                    ->searchable()
                    ->badge()
                    ->colors([
                        'info' => 'reguler',
                        'success' => 'afirmasi',
                    ])
                    ->label('Jalur Pendaftaran'),
                Tables\Columns\TextColumn::make('document.document_type')
                    ->searchable()
                    ->label('Jenis Dokumen')
                    ->formatStateUsing(fn($state) => strtoupper($state)),
                Tables\Columns\TextColumn::make('status')
                    ->sortable()
                    ->searchable()
                    ->badge()
                    ->colors([
                        'danger' => 'ditolak',
                        'success' => 'diverifikasi',
                        'warning' => 'menunggu',
                    ])
                    ->label('Status'),
                Tables\Columns\TextColumn::make('message')
                    ->tooltip(fn($record) => $record->message)
                    ->limit(30)
                    ->label('Pesan'),
                Tables\Columns\TextColumn::make('verified_at')
                    ->sortable()
                    ->searchable()
                    ->label('Terverifikasi Pada'),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListVerifications::route('/'),
            'create' => Pages\CreateVerification::route('/create'),
            'view' => Pages\ViewVerification::route('/{record}'),
            'edit' => Pages\EditVerification::route('/{record}/edit'),
        ];
    }
}
