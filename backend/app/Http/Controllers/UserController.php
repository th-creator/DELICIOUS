<?php

namespace App\Http\Controllers;
use Illuminate\Support\Str;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;


class UserController extends Controller
{
    // create new user
    public function store(Request $request) {
        $formFields = $request->validate([
            'name' => ['required','min:3'],
            'email' => ['required','email',Rule::unique('users','email')],
            'password' => 'required|confirmed|min:6'
        ]);

        //hash password
        $formFields['password'] = bcrypt($formFields['password']);
        // create user
        $user = User::create($formFields);
        //login
        return response()->json(["user" => $user, "token" => $user->createToken("Api Token of ".$user->name)->plainTextToken,"message" =>"user created and in"],200);
        }

    //logout user
    public function logout(Request $request) {
        Auth::user()->currentAccessToken()->delete();

        return response()->json("user logged out successfully",200);
    }

    public function authenticate(Request $request) {
        $formFields = $request->validate([
            'email' => ['required','email'],
            'password' => 'required'
        ]);
        if(!Auth::attempt($formFields)) {
            return response()->json("invalid credentials",401);
        }
        $user = User::where('email',$request->email)->first();

        return response()->json(["user" => $user, "token" => $user->createToken("Api Token of ".$user->name)->plainTextToken,"message" =>"user in"],200);
        
    }
}
