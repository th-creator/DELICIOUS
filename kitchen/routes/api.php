<?php

use App\Http\Controllers\DeliveryController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\MealController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RecipesController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Admin\RoleController;

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

Route::get('login/{provider}', [LoginController::class, 'redirectToProvider'])->middleware('guest');
Route::get('login/{provider}/callback', [LoginController::class, 'handleProviderCallback'])->middleware('guest');

Route::post('forgot',[UserController::class,'forgot'])->middleware('guest');
Route::post('reset',[UserController::class,'reset'])->middleware('guest');

// Route::resource( name: 'recipes', controller: RecipesController::class);


Route::get('/recipes',[RecipesController::class,'index']);

Route::post('/recipes/create',[RecipesController::class,'store']);

Route::get('/recipes/{id}/edit',[RecipesController::class,'edit']);

Route::PUT('/recipes/{id}/update',[RecipesController::class,'update']);

Route::delete('/recipes/{id}',[RecipesController::class,'destroy']);

Route::post('/register', [UserController::class, 'store']);

Route::middleware('auth:sanctum')->post('/logout', [UserController::class, "logout"]);

// to login a user
Route::post('/authenticate',[UserController::class, 'authenticate'])->middleware('guest')->name('login');

//getting user's info
Route::middleware('auth:sanctum')->get('/user', [UserController::class, "getUser"]);

Route::middleware("auth:sanctum")->post('/user/infoHandler',[UserController::class, 'infoHandler']);
Route::middleware("auth:sanctum")->post('/user/passwordHandler',[UserController::class, 'passwordHandler']);
Route::middleware("auth:sanctum")->post('/user/imageHandler',[UserController::class, 'imageHandler']);

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
 
Route::apiResource("/Reservation", ReservationController::class);
Route::get("/getReservations/{id}", [ReservationController::class,"getReservations"]);
Route::apiResource("/Meals", MealController::class);
Route::get("/Meals", [MealController::class,"index"]);

Route::post("/DetachOrder/{id}", [DeliveryController::class,"DetachOrder"]);
Route::get("/getOrders", [DeliveryController::class,"getOrders"]);
Route::post("/setDeliveries", [DeliveryController::class,'store']);

Route::group(['middleware'=>"delivery"], function () {
  Route::put("/setStateDelivery/{id}", [DeliveryController::class,'setStateDelivery']);
  Route::apiResource("/Orders", DeliveryController::class);
  Route::apiResource("/Deliveries", DeliveryController::class);
});

Route::group(['middleware'=>"delivery"], function () {
  Route::put("/setStateReservation/{id}", [ReservationController::class,"setStateReservation"]);
});

Route::group(['middleware'=>"admin"], function () {
  Route::put('/users/active/{id}', [AdminUserController::class,'updateActive']);
  Route::apiResource('roles', RoleController::class);
  Route::apiResource('users', AdminUserController::class);
});