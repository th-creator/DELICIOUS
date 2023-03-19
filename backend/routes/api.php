<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RecipesController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
// Route::resource( name: 'recipes', controller: RecipesController::class);

// Route::get('/recipes',[RecipesController::class,'index']);

// Route::post('/recipes/create',[RecipesController::class,'store']);

// Route::get('/recipes/{id}/edit',[RecipesController::class,'edit']);

// Route::PUT('/recipes/{id}/update',[RecipesController::class,'update']);

// Route::delete('/recipes/{id}',[RecipesController::class,'destroy']);
Route::apiResource("recipes",RecipesController::class);
 
Route::post('/authenticate',[UserController::class, 'authenticate'])->middleware('guest');;

Route::post('/users', [UserController::class, 'store']);