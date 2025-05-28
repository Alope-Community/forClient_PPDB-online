<?php

namespace App\Filament\Resources;

use App\Filament\Resources\DocumentResource\Pages;
use App\Filament\Resources\DocumentResource\RelationManagers;
use App\Models\Document;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class DocumentResource extends Resource
{
    protected static ?string $model = Document::class;

    protected static ?string $navigationIcon = 'heroicon-o-folder';

    public static function getModelLabel(): string
    {
        return 'Berkas';
    }

    public static function getPluralModelLabel(): string
    {
        return 'Berkas Pendaftaran';
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('registration_id')
                    ->label('Nama Pendaftar')
                    ->reactive()
                    ->options(
                        \App\Models\Registration::with('user')
                            ->get()
                            ->pluck('user.name', 'id')
                    )
                    ->afterStateHydrated(function ($set, $record) {
                        if ($record && $record->registration) {
                            $set('registration.registration_path', $record->registration->registration_path ?? '');
                        }
                    })
                    ->afterStateUpdated(function ($state, $set) {
                        $registration = \App\Models\Registration::find($state);
                        $set('registration.registration_path', $registration->registration_path ?? '');
                    })
                    ->searchable()
                    ->preload()
                    ->required(),


                Forms\Components\TextInput::make('registration.registration_path')
                    ->label('Jalur Pendaftaran')
                    ->disabled()
                    ->required(),

                Forms\Components\Select::make('document_type')
                    ->label('Jenis Dokumen')
                    ->options([
                        'ijazah' => 'Ijazah',
                        'skhu' => 'SKHU',
                        'akte' => 'Akte',
                        'kk' => 'Kartu Keluarga',
                        'ktp' => 'KTP Orang Tua',
                        'pas_foto' => 'Pas Foto',
                        'kia' => 'KIA',
                        'skl' => 'SKL',
                        'raport' => 'Raport Kelas 5',
                        'kip' => 'KIP',
                        'pkh' => 'PKH',
                        'pip' => 'PIP',
                        'sktm' => 'SKTM',

                    ])
                    ->required(),

                Forms\Components\Placeholder::make('note_document_type')
                    ->label('NOTE:')
                    ->content('Jenis dokumen yang diunggah harus sesuai dengan jenis dokumen yang dipilih.'),

                Forms\Components\FileUpload::make('file_path')
                    ->label('File')
                    ->acceptedFileTypes(['image/*'])
                    ->downloadable()
                    ->openable()
                    ->deletable()
                    ->disk('public')
                    ->directory('documents')
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('registration.user.name')
                    ->label('Nama Pendaftar')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('registration.registration_path')
                    ->label('Jalur Pendaftaran')
                    ->badge()
                    ->colors([
                        'warning' => 'reguler',
                        'success' => 'afirmasi',
                    ])
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('document_type')
                    ->formatStateUsing(fn($state) => strtoupper($state))
                    ->label('Jenis Dokumen')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('before_size')
                    ->label('Size')
                    ->formatStateUsing(function ($record) {
                        $beforeSize = number_format($record->before_size / (1024 * 1024), 2);
                        $afterSize = number_format($record->after_size / (1024 * 1024), 2);
                        $percentage = round((1 - ($record->after_size / $record->before_size)) * 100, 2);
                        return "{$beforeSize} MB -> {$afterSize} MB";
                    })
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('after_size')
                    ->label('Compression Rate')
                    ->formatStateUsing(function ($record) {
                        $percentage = round((1 - ($record->after_size / $record->before_size)) * 100, 2);
                        return "{$percentage}%";
                    })
                    ->searchable()
                    ->sortable(),
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
            'index' => Pages\ListDocuments::route('/'),
            'create' => Pages\CreateDocument::route('/create'),
            'view' => Pages\ViewDocument::route('/{record}'),
            'edit' => Pages\EditDocument::route('/{record}/edit'),
        ];
    }
}
