<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserDetail extends Model
{
    // protected $fillable = [
    //     'user_id',
    //     'father_name',
    //     'mother_name',
    //     'phone_number',
    //     'father_job',
    //     'mother_job',
    //     'parent_salary',
    //     'school_origin',
    //     'school_expense',
    //     'distance',
    //     'address',
    // ];
    protected $guarded = ['id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
