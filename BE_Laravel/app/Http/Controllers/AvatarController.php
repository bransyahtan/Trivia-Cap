<?php

namespace App\Http\Controllers;

use App\Models\Avatar;
use Illuminate\Http\Request;

class AvatarController extends Controller
{
    public function index()
    {
        return view('pages.avatar.index', ["avatars" => Avatar::all()]);
    }

    public function create()
    {
        return view('pages.avatar.create');
    }

    public function store()
    {
        $value = request()->validate([
            'name' => 'required',
            'price' => 'required',
            'image' => 'required|image',
            'isPremium' => 'nullable',
        ]);

        $secure_url = cloudinary()->upload(request()->file('image')->getRealPath())->getSecurePath();

        Avatar::create([
            'name' => $value['name'],
            'price' => $value['price'],
            'image_url' => $secure_url,
            'isPremium' => $value['isPremium'] ?? false
        ]);

        return redirect('/avatars')->with('success-create', 'Avatar has been saved');
    }

    public function show(string $id)
    {
        return view('pages.avatar.detail', [
            'avatar' => Avatar::findOrFail($id),
        ]);
    }

    public function destroy(string $id)
    {
        Avatar::destroy($id);
        return redirect('/avatars')->with('success-delete', 'Avatars has been deleted');
    }
}
