<?php

namespace App\Http\Controllers;

use App\Models\SchoolInfo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $data = SchoolInfo::all()->pluck('value', 'key');
        return Inertia::render('Welcome', [
            'info' => $data
        ]);
    }
}
