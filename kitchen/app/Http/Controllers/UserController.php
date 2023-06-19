<?php

namespace App\Http\Controllers;
use App\Http\Requests\ForgotPasswordRequest;
use App\Http\Requests\ResetPasswordRequest;
use App\Http\Resources\UserResource;
use App\Models\PasswordReset;
use App\Notifications\PasswordResetNotification;
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
            'firstName' => ['required','min:2'],
            'lastName' => ['required','min:2'],
            'email' => ['required','email',Rule::unique('users','email')],
            'password' => 'required|confirmed|min:6'
        ]);

        //hash password
        $formFields['password'] = bcrypt($formFields['password']);
        $formFields['path'] = "default_profile.png";
        // create user
        $user = User::create($formFields);
        $user->roles()->attach([2]);
        //login
        return response()->json(["user" => $user, "token" => $user->createToken("Api Token of ".$user->firstName)->plainTextToken,"message" =>"user created and in"],200);
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

        if ($user->active == false ) {
            return response()->json("Your Account Is Blocked",401);
        }

        Session::put('roles', $user);
        return response()->json(["user" => $user, "token" => $user->createToken("Api Token of ".$user->firstName)->plainTextToken,"message" =>"user in"],200);
        
    }
    //logout user
    public function logout(Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->json("user logged out successfully",200);
    }
    //getting the authed user's info
    public function getUser(Request $request) {
        $user = User::where("id",auth()->id())->with('roles')->get();
        
        return response()->json($user,200);
    }
    
    public function forgot(ForgotPasswordRequest $request) {
        $user = ($query = User::query());
        $user = $user->where($query->qualifyColumn('email'),$request->input('email'))->first();
        
        if (!$user || !$user->email) {
            return response()->json('email address is incorrect',404);
        }

        $resetPasswordToken = str_pad(random_int(1,9999),4,'0',STR_PAD_LEFT);
        $userPassReset = PasswordReset::where('email',$user->email);

        if(!$userPassReset->count()) {
            PasswordReset::create([
                'email' => $user->email,
                'token' => $resetPasswordToken,
            ]);
        } else {
            $userPassReset->update([
                'email' => $user->email,
                'token' => $resetPasswordToken,
            ]);
        }

        $user->notify(new PasswordResetNotification($resetPasswordToken));
        
        return response()->json('a code has been sent to your email address',200);
    }

    public function reset(ResetPasswordRequest $request) {
        $attributes = $request->validated();

        $user = User::where("email",$attributes['email'])->first();

        if (!$user) {
            return response()->json('no record was found',404);
        }

        $resetRequest = PasswordReset::where('email',$user->email)->first();

        if (!$resetRequest || $resetRequest->token != $request->token) {
            return response()->json('token mismatch',400);
        }

        $user->fill([
            'password' => Hash::make($attributes['password']),
        ]);

        $user->save();

        $user->tokens()->delete();

        $resetRequest->delete();

        $token = $user->createToken('authToken')->plainTextToken;

        $loginResponse = [
            'user' => UserResource::make($user),
            'token' => $token
        ];

        return response()->json($loginResponse,200);
    }
    //changing user name and email
    public function infoHandler(Request $request) {
        $name = $request->validate([
            "firstName" => "required",
            "lastName" => "required",
            "email" => "required|email"
        ]);

        User::where("id",auth()->id())->Update($name);
        return response()->json('name changed successfuly');
    }
    //changing user password
    public function passwordHandler(Request $request) {
        $user = auth()->user();
        
        // $validated = $request->validate([
        //     'current_password' => [
        //         'required',
                
        //         function ($attribute, $value, $fail) use ($user) {
        //             if (!Hash::check($value, $user->password)) {
        //                 $fail('wrong password');
        //             }
        //         }
        //     ],
        //     'password' => [
        //         'required', 'min:6', 'confirmed', 'different:current_password'
        //     ]
        // ]);
        $validated = $request->validate([
            'password' => [
                'required', 'min:6', 'confirmed'
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
            'jfif',
            "webp"
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
