<?php

namespace App\Http\Controllers;
use Exception;
use App\Models\Recipes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

// session_start();

class RecipesController extends Controller
{
    // getting name from a database
    public function index(Request $request)
    {   
        try {
            
            // $id = $_SESSION['user_id'];
            $recepes = Recipes::where('user_id',auth("sanctum")->id())->get();
            
            return response()->json($recepes);
        } catch (Exception $e) {
            Log::error($e);
        }
    }
    public function edit(Request $request)
    {
        // try {
            $recepes = Recipes::find($request->get('id'));
            return response()->json($recepes);
        // } catch (Exception $e) {
        //     Log::error($e);
        // }
    }
    public function update(Request $request)
    {
        try {
            $recepe_id = $request->get('recepe_id');
            $id = $request->get('id');
            $user_id = auth("sanctum")->id();
            Recipes::find($id)->update([
                'recipe_id'=> $recepe_id
            ]);
            return response()->json([
                'recipe_id' => $recepe_id,
            ]);
        } catch (Exception $e) {
            Log::error($e);
        }
    }
    public function destroy($id)
    {
        // try {
            $recipe = Recipes::where('recipe_id',$id)->where('user_id',auth("sanctum")->id())->delete();
            return response()->json($recipe);
        // } catch (Exception $e) {
        //     Log::error($e);
        // }
    }
    public function store(Request $request)
    {
            $mealId = $request->validate([
                'meal_id' => "required"
            ]);
            Recipes::create([
                'user_id' => auth("sanctum")->id(),
                'recipe_id'=> $mealId['meal_id'],
            ]);
            return response()->json([
                'user_id' => auth("sanctum")->id(),
                'recipe_id' => $mealId['meal_id'],
            ]);
    }
}

