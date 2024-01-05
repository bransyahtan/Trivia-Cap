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

    public function store()
    {
        $value = request()->validate([
            'question' => 'required',
            'a' => 'required',
            'b' => 'required',
            'c' => 'required',
            'answer' => 'required',
        ]);

        Quiz::create($value);
    }

    public function create()
    {
        // return view('')
    }

    public function show($quize)
    {
    }

    public function addView()
    {
    }
}
