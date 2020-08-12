<?php

use Illuminate\Database\Seeder;
use App\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create(array(
            'email'     => 'admin@admin',
            'name'=> 'Administrator',
            'password' => Hash::make('123456789') // Hash::make() nos va generar una cadena con nuestra contraseña encriptada
        ));
    }
}
