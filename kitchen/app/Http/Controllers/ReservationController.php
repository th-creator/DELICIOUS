<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    public function index() {
        $reservations = Reservation::all();
        return response()->json(["reservations" => $reservations],200);
    }
    public function store(Request $request) {
        $reservation = $request->validate([
            'user_id' => "nullable",
            'day' => "required",
            'hour' => "required",
            'name' => "required",
            'num_person' => "required",
            'phone' => "required",
        ]);
        // return response()->json($reservation);
        $reservation["user_id"] = 1;

        Reservation::create($reservation);

        return response()->json(["reservation created"],200);
    }
    public function show($id) {

        $reservation = Reservation::findOrFail($id);

        return response()->json(["reservation" => $reservation],200);
    }
    public function update(Request $request,$id) {
        $reservation = $request->validate([
            'day' => "required",
            'hour' => "required",
            'num_person' => "required",
            'phone' => "required",
        ]);

        $reservation = Reservation::findOrFail($id)->update($reservation);

        return response()->json("reservation updated",200);
    }

    public function destroy($id) {

        Reservation::destroy($id);

        return response()->json("reservation deleted",200);
    }
}
