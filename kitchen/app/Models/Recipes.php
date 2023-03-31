<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recipes extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'recipe_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class,'user_id','id');
    }

    // protected static function boot() {
    //     self::addGlobalScope(function(Builder $builder){
    //         session_start();
    //         $id = $_SESSION['user_id'];
    //         $builder->where('user_id',$id);
    //     });
    // }
}
 