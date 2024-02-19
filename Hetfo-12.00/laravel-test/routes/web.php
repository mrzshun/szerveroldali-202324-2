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

Route::get('/test/{id?}', function ($id = null) {
    return view('test', [
        'id' => $id,
    ]);
})->where('id', '[1-9][0-9]*');


Route::get('/test2', function () {
    return view('test2', [
        'animals' => [
            'bird1' => 'eagle',
            'bird2' => 'chicken',
            'mammal1' => 'wolf',
            'mammal2' => 'dolphin',
            'lizard1' => 'comodo dragon',
        ]
    ]);
});

Route::get('/search', function () {
    $request = request();
    return $request->name . " " . $request->id;
});


Route::get('/blog', function () {
    return view('posts', [
        'posts' => Post::all(),
    ]);
});

Route::get('/blog/{id}', function ($id) {
    return view('post', [
        'id' => $id,
        'post' => Post::find($id),
    ]);
});


//blog --> összes blogposzt

//blog/id --> egy blogposzt
