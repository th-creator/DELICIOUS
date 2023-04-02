<?php

namespace App\Http\Controllers;
use Illuminate\Support\Str;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;

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
    // login a user
    public function authenticate(Request $request) {
        $credentials = $request->validate([
            'email' => ['required','email'],
            'password' => 'required'
        ]);
        if(!auth()->attempt($credentials)) {
            return response()->json("invalid credentials",401);
        }
        $user = User::where('email',$request->email)->with('roles')->first();
        Session::put('roles', $user);
        return response()->json(["user" => $user, "token" => $user->createToken("Api Token of ".$user->name)->plainTextToken,"message" =>"user in"],200);
        
    }
    //logout user
    public function logout(Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->json("user logged out successfully",200);
    }
    //getting the authed user's info
    public function getUser(Request $request) {
        $user = User::where("id",auth()->id())->with('roles')->get();
        // Session::put('roles', $request->user()->roles[0]->name);
        // $roles = Session::get('roles');
        return response()->json($user,200);
    }
    //changing user name
    public function nameHandler(Request $request) {
        $name = $request->validate([
            "name" => "required"
        ]);

        User::where("id",auth()->id())->Update($name);
        return response()->json('name changed successfuly');
    }
    //changing user email
    public function emailHandler(Request $request) {
        $email = $request->validate([
            "email" => "required|email"
        ]);

        User::where("id",auth()->id())->Update($email);
        return response()->json('email changed successfuly');
    }
    //changing user password
    public function passwordHandler(Request $request) {
        $user = auth()->user();
        
        $validated = $request->validate([
            'current_password' => [
                'required',
                
                function ($attribute, $value, $fail) use ($user) {
                    if (!Hash::check($value, $user->password)) {
                        $fail('wrong password');
                    }
                }
            ],
            'password' => [
                'required', 'min:6', 'confirmed', 'different:current_password'
            ]
        ]);
        
        $pwd = bcrypt($validated['password']);
        User::where("id",$user->id)->Update(["password"=>$pwd]);
        return response()->json('password changed successfuly');
    }
    public function imageHandler(Request $request) {
        $data = [];
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
        $file->move(storage_path('/app/public/profile'), $image);
        
        $data['path'] = $image;
        
        User::where("id",auth()->id())->update($data);
        return response()->json(["message" => "image has Uploaded Succesfully","file type" => $extension],200);
      } 
        else  return response()->json(["message" => "Select image first."],422);
    }
}
