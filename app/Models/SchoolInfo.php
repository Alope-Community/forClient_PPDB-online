<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SchoolInfo extends Model
{
    use HasFactory;

    protected $table = 'school_infos';

    protected $fillable = ['key', 'type', 'value'];

    protected $casts = [
        'value' => 'json',
    ];
}
