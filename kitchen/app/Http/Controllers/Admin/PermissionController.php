<?php

namespace App\Http\Controllers\Admin;

use App\Models\Permission;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PermissionController extends Controller
{
    public function index()
    {   
        $permissions = Permission::with('roles')->get();
        return response()->json(["permissions"=>$permissions],200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:permissions',
        ]);

        $permission = Permission::create($data);

        return response()->json(['message' => 'Permission created successfully', 'permission' => $permission], 201);
    }

    public function show(Permission $permission)
    {
        return $permission->load('roles');
    }

    public function update(Request $request, Permission $permission)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:permissions,name,' . $permission->id,
        ]);

        $permission->update($data);

        return response()->json(['message' => 'Permission updated successfully', 'permission' => $permission], 200);
    }

    public function destroy(Permission $permission)
    {
        $permission->delete();
        return response()->json(['message' => 'Permission deleted successfully'], 200);
    }
}