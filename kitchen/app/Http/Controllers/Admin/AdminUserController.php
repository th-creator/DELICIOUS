<?php

namespace App\Http\Controllers\Admin;


use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AdminUserController extends Controller
{
    public function index()
    {
        return response()->json(["Users"=>User::with('roles')->get()],200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'firstName' => 'required|string',
            'lastName' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|confirmed|min:6'
            // 'roles' => 'nullable|array',
        ]);

        $data['password'] = bcrypt($data['password']);

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
      } 
        else  $data['path'] = "default_profile.png";

        $user = User::create($data);
        $user->roles()->attach($request->roles);

        return response()->json(['message' => 'User created successfully', 'user' => $user], 201);
    }

    public function show(User $user)
    {
        return $user->load('roles');
    }

    public function updateActive(Request $request, $id)
    {
        $data = $request->validate([
            'active' => 'required',
        ]);

        $user = User::where("id",$id)->update($data);

        return response()->json(['message' => 'User updated successfully', 'user' => $user,"id" => $id], 200);
    }
    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'firstName' => 'required|string',
            'lastName' => 'nullable|string',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:7|confirmed',
            'roles' => 'nullable|array',
        ]);

        if ($request->filled('password')) {
            $data['password'] = bcrypt($data['password']);
        }
        $data['path'] = "default_profile.png";
        $user->update($data);
        $user->roles()->sync($request->roles);

        return response()->json(['message' => 'User updated successfully', 'user' => $user], 200);
    }

    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(['message' => 'User deleted successfully'], 200);
    }

    public function getUserDatasets($id) {
        $user = User::where("id",$id)->with('datasets')->get();
        
        return response()->json($user,200);
    }

    public function getUserReports($id) {
        $user = User::where("id",$id)->with('reports')->get();
        
        return response()->json($user,200);
    }
}
