<?php

use Illuminate\Support\Facades\Route;
use App\Models\Post;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


Route::get('/blog', function () {
    return view('posts', [
        'posts' => Post::all(),
    ]);
});

Route::get('/blog/{id}', function ($id = -1) {
    return view('post', [
        'id' => $id,
        'post' => Post::find($id),
    ]);
});


Route::get('/test', function () {
    return response('<h1>Hello World!</h1>')
        ->header('Content-Type', 'text/plain');
});

Route::get('/test2/{id?}', function ($id = -1) {
    return view('test', [
        'id' => $id,
        'technologies' => [
            'backend-1' => 'php',
            'backend-2' => 'laravel',
            'backend-3' => 'nodejs',
            'frontend-1' => 'html',
            'frontend-2' => 'reactjs',
        ]
    ]);
})->where('id', '[0-9]+');
