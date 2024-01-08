<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use Illuminate\Http\Request;
use Symfony\Component\VarDumper\VarDumper;

class QuizeController extends Controller
{
    public function index()
    {
        return view('pages.quiz.index', ["quizes" => Quiz::all()]);
    }

    public function store()
    {
        $value = request()->validate([
            'question' => 'required',
            'a' => 'required',
            'b' => 'required',
            'c' => 'required',
            'optionA' => 'nullable',
            'optionB' => 'nullable',
            'optionC' => 'nullable',
        ]);

        if (isset($value['optionA'])) {
            $value['answer'] = $value['a'];
            unset($value['optionA']);
        } else if (isset($value['optionB'])) {
            $value['answer'] = $value['b'];
            unset($value['optionB']);
        } else {
            $value['answer'] = $value['c'];
            unset($value['optionC']);
        }

        Quiz::create($value);

        return redirect('/quizes')->with('success-create', 'Quiz has been saved');
    }

    public function create()
    {
        return view('pages.quiz.create');
    }

    public function show(string $id)
    {
        return view('pages.quiz.detail', [
            'quiz' => Quiz::findOrFail($id),
        ]);
    }

    public function destroy(string $id)
    {
        Quiz::destroy($id);
        return redirect('/quizes')->with('success-delete', 'Quiz has been deleted');
    }

    public function findAll()
    {
        $quizes = Quiz::all();
        return response()->json([
            'status' => 'OK',
            'data' => $quizes
        ]);
    }

    public function findById(string $id)
    {
        $quizes = Quiz::findById($id);
        return response()->json([
            'status' => 'OK',
            'data' => $quizes
        ]);
    }
}
