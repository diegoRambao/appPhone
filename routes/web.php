<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
})->middleware('auth');
Route::get('/user' , function(){
    return view('welcome');
})->middleware('auth');
Route::get('/group' , function(){
    return view('welcome');
})->middleware('auth');

Auth::routes(['register' => false]);
Auth::routes();
Route::get('logout', 'Auth\LoginController@SignOff');
