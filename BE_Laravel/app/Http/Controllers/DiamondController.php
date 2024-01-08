<?php

namespace App\Http\Controllers;

use App\Models\Diamond;
use Illuminate\Http\Request;

class DiamondController extends Controller
{
    public function index()
    {
        return view('pages.diamond.index', ["diamonds" => Diamond::all()]);
    }

    public function create()
    {
        return view('pages.diamond.create');
    }

    public function store()
    {
        $value = request()->validate([
            'price' => 'required|integer',
            'amount' => 'required|integer',
        ]);

        Diamond::create($value);

        return redirect('/diamonds')->with('success-create', 'Diamond has been saved');
    }

    public function show(string $id)
    {
        return view('pages.diamond.detail', [
            'diamond' => Diamond::findOrFail($id),
        ]);
    }

    public function findAll()
    {
        $diamonds = Diamond::all();
        return response()->json([
            'status' => 'OK',
            'data' => $diamonds
        ]);
    }

    public function findById(string $id)
    {
        $diamond = Diamond::findById($id);
        return response()->json([
            'status' => 'OK',
            'data' => $diamond
        ]);
    }
}
