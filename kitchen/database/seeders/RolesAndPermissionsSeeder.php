<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run()
    {
        $adminRole = Role::create(['name' => 'admin']);
        Role::create(['name' => 'user']);
        Role::create(['name' => 'delivery']);
        Role::create(['name' => 'manager']);

        $firstUser = User::create(['firstName' => 'admin','lastName' => 'admin','email' => 'admin@gmail.com','password' => bcrypt('admin'),'path' => 'default_profile.png']);
        

        $firstUser->roles()->attach($adminRole);


        // command you need to run to seed  :   php artisan db:seed --class=RolesAndPermissionsSeeder
    }
}
