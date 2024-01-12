<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Avatar extends Model
{
    use HasFactory;


    protected $table = 'avatars';

    protected $fillable = [
        'name',
        'price',
        'image_url',
        'isPremium',
    ];
}
