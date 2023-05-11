<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Meal;
use App\Models\User;

class Delivery extends Model
{
    use HasFactory;

    protected $fillable = [
        'place',
        'date',
        'user_id',
        'total',
    ];

    public function meals() {
        return $this->belongsToMany(Meal::class)->withPivot('quantity');
        //add this for the quantity column
        // ;
    }

    public function users()
    {
        return $this->belongsTo(User::class);
    }
}
