<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use Illuminate\Http\Request;

class QuizeController extends Controller
{
    public function index()
    {
        $quizes = Quiz::all();

        return response()->json([
            "data" => $quizes
        ]);
    }
}
