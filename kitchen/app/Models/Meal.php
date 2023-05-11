<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Delivery;

class Meal extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'description',
        'price',
        'path',
    ];

    public function deliveries() {
        return $this->belongsToMany(Delivery::class)->withPivot('quantity');
        
        // ;
    }
}
