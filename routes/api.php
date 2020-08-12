<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//routes groups
Route::get('/group', 'GroupController@getGroup');
Route::get('/group/{id}', 'GroupController@getGroupById');
Route::post('/group', 'GroupController@createGroup');
Route::put('/group/{id}', 'GroupController@updateGroup');
Route::delete('/group/{id}', 'GroupController@deleteGroup');

//routes People
Route::get('/person', 'PersonController@getPeople');
Route::get('/person/{id}', 'PersonController@getPersonById');
Route::post('/person', 'PersonController@createPerson');
Route::put('/person/{id}', 'PersonController@updatePerson');
Route::post('/personByNum', 'PersonController@getPersonByNumber');
Route::delete('/person/{id}', 'PersonController@deletePerson');