<?php

namespace App\Filament\Resources;

use App\Filament\Exports\UserExporter;
use App\Filament\Resources\StudentResource\Pages;
use App\Filament\Resources\StudentResource\RelationManagers;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Actions\ExportBulkAction;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Spatie\Permission\Models\Role;

class StudentResource extends Resource
{
    protected static ?string $model = User::class;

    protected static ?string $navigationIcon = 'heroicon-o-academic-cap';

    public static function getModelLabel(): string
    {
        return 'Siswa';
    }

    public static function getPluralModelLabel(): string
    {
        return 'Calon Siswa';
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Informasi Pribadi')
                    ->description('Detail Informasi pribadi dari siswa.')
                    ->icon('heroicon-o-user')
                    ->collapsible()
                    ->schema([
                        Forms\Components\TextInput::make('nisn')
                            ->label('NISN')
                            ->required(),
                        Forms\Components\TextInput::make('name')
                            ->label('Nama Lengkap')
                            ->required(),
                        Forms\Components\TextInput::make('email')
                            ->label('Email')
                            ->email()
                            ->unique(static::getModel(), 'email', fn($record) => $record)
                            ->required(),
                        Forms\Components\TextInput::make('password')
                            ->label('Password')
                            ->minLength(8)
                            ->password()
                            ->revealable()
                            ->hidden(fn($livewire) => $livewire instanceof Pages\ViewStudent)
                            ->required(fn($livewire) => $livewire instanceof Pages\CreateStudent),
                        Forms\Components\Select::make('roles')
                            ->relationship('roles', 'name')
                            ->preload()
                            ->options(Role::all()->pluck('name', 'id'))
                            ->label('Roles')
                            ->selectablePlaceholder(false)
                            ->default(fn() => Role::where('name', 'student')->first()?->id)
                            ->extraFieldWrapperAttributes(['class' => 'h-0 opacity-0']),
                    ]),
                Forms\Components\Section::make('Informasi Orang Tua')
                    ->relationship('detail')
                    ->description('Detail Informasi orang tua dari siswa.')
                    ->icon('heroicon-o-users')
                    ->collapsible()
                    ->schema([
                        Forms\Components\TextInput::make('father_name')
                            ->label('Nama Ayah')
                            ->required(),
                        Forms\Components\TextInput::make('mother_name')
                            ->label('Nama Ibu')
                            ->required(),
                        Forms\Components\TextInput::make('phone_number')
                            ->numeric()
                            ->label('Nomor Telepon Orang Tua')
                            ->required(),
                        Forms\Components\Select::make('father_job')
                            ->label('Pekerjaan Ayah')
                            ->options([
                                'pegawai' => 'Pegawai',
                                'wiraswasta' => 'Wiraswasta',
                                'pedagang' => 'Pedagang',
                                'lainnya' => 'Lainnya',
                                'tidak bekerja' => 'Tidak Bekerja',
                            ])
                            ->required(),
                        Forms\Components\Select::make('mother_job')
                            ->label('Pekerjaan Ibu')
                            ->options([
                                'IRT' => 'IRT',
                                'pedagang' => 'Pedagang',
                                'pegawai' => 'Pegawai',
                                'lainnya' => 'Lainnya',
                            ])
                            ->required(),
                        Forms\Components\TextInput::make('parent_salary')
                            ->numeric()
                            ->label('Penghasilan Orang Tua')
                            ->prefix('Rp')
                            ->suffix(',-')
                            ->required(),
                        Forms\Components\Textarea::make('address')
                            ->label('Alamat Rumah')
                            ->rows(4)
                            ->required(),
                    ]),
                Forms\Components\Section::make('Informasi Sekolah')
                    ->relationship('detail')
                    ->description('Detail Informasi sekolah dari siswa.')
                    ->icon('heroicon-o-academic-cap')
                    ->collapsible()
                    ->schema([
                        Forms\Components\TextInput::make('school_origin')
                            ->label('Asal Sekolah')
                            ->required(),
                        Forms\Components\TextInput::make('school_expense')
                            ->label('Biaya Ongkos Sekolah')
                            ->prefix('Rp')
                            ->suffix(',-')
                            ->numeric(),
                        Forms\Components\TextInput::make('distance')
                            ->label('Jarak Rumah ke Sekolah')
                            ->suffix('KM')
                    ]),
                Forms\Components\Section::make('Pilihan Jalur')
                    ->relationship('registration')
                    ->description('Pilihan jalur pendaftaran siswa.')
                    ->icon('heroicon-o-academic-cap')
                    ->collapsible()
                    ->schema([
                        Forms\Components\Select::make('registration_path')
                            ->label('Jalur Pendaftaran')
                            ->options([
                                'reguler' => 'Reguler',
                                'afirmasi' => 'Afirmasi',
                            ])
                            ->required(),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label('Nama')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('roles.name')
                    ->badge()
                    ->label('Role')
                    ->color('info')
                    ->sortable(),
                Tables\Columns\TextColumn::make('email')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Tanggal Daftar')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('updated_at')
                    ->label('Terakhir Diubah')
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
                    ExportBulkAction::make()
                    ->exporter(UserExporter::class)
                    ->formats([
                        \Filament\Actions\Exports\Enums\ExportFormat::Xlsx,
                    ])
                    ->fileDisk('export')
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
            'index' => Pages\ListStudents::route('/'),
            'create' => Pages\CreateStudent::route('/create'),
            'view' => Pages\ViewStudent::route('/{record}'),
            'edit' => Pages\EditStudent::route('/{record}/edit'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()->whereDoesntHave('roles', function ($query) {
            $query->where('name', 'admin');
        });
    }
}
