<?php

namespace App\Http\Controllers;
use Illuminate\Validation\Rule;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // show Register
    public function create() {
        return view('users.register');
    }
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
        auth()->login($user);
        return redirect('/home')->with('message','User created and logged in');
    }

    //logout user
    public function logout(Request $request) {
        auth()->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/home')->with('message','You have been logged out!');
    }

    //show login form
    public function login() {
        return view('users.login');
    }

    //authenticate user
    public function authenticate(Request $request) {
        $formFields = $request->validate([
            'email' => ['required','email'],
            'password' => 'required'
        ]);
        if(auth()->attempt($formFields)) {
            $request->session()->regenerate();
            return redirect('/home')->with('message','you are now logged in!');
        }
        return back()->withErrors(['email' => 'invalid Credentials'])->onlyInput('email');
    }
}

