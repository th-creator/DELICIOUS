<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RecepesController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('home');
});
//show register /create form
Route::get('/register',[UserController::class , 'create']);
// ->middleware('guest');

//create a new user
Route::post('/users', [UserController::class, 'store']);

//log user out
Route::post('/logout', [UserController::class, 'logout'])
->middleware('auth');

//show login form
Route::get('/login',[UserController::class, 'login'])
->name('login')->middleware('guest');

//log in user
Route::post('/users/authenticate',[UserController::class, 'authenticate']);
Route::get('{reactRoutes}', function () {
    return view('home');
})->where('reactRoutes', '^((?!api).)*$');