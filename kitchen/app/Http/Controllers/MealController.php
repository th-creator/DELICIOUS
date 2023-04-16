<?php

namespace App\Http\Controllers;

use App\Models\Meal;
use Illuminate\Http\Request;

class MealController extends Controller
{
    public function index() {
        $Meals = Meal::all();
        return response()->json(["Meals" => $Meals],200);
    }

    public function store(Request $request) {
        $Meal = $request->validate([
            'name' => "required",
            'type' => "required",
            'description' => "required",
            'price' => "required",
        ]);
        if ($request->hasFile('img'))
      {
        ini_set('memory_limit','256M');
        $file = $request->file('img');
        $filename  = $file->getClientOriginalName();
        $extension = $file->getClientOriginalExtension();
        $image = date('His').'-'.$filename;

        $supported_image = array(
            'gif',
            'jpg',
            'jpeg',
            'png', 
            'jfif'
        );
        if (!in_array($extension,$supported_image)) {
            return response()->json("unsupported image type",422);
        }

        //move file to storage/app/public/image folder
        $file->move(storage_path('/app/public/meals'), $image);
        
        $Meal['path'] = $image;
        
      } 
        else  $Meal['path'] = "defaultImage.png";

        $Meal["user_id"] = auth("sanctum")->id();

        Meal::create($Meal);

        return response()->json(["Meal created"],200);
    }
    public function show($id) {

        $Meal = Meal::findOrFail($id);

        return response()->json(["Meal" => $Meal],200);
    }
    public function update(Request $request,$id) {
        $Meal = $request->validate([
            'name' => "required",
            'type' => "required",
            'description' => "required",
            'price' => "required",
        ]);

        $Meal = Meal::findOrFail($id)->update($Meal);

        return response()->json("Meal updated",200);
    }

    public function destroy($id) {

        Meal::destroy($id);

        return response()->json("Meal deleted",200);
    }
}