<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\CategoryController;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect()->route('posts.index');
});

Route::get('/home', function () {
    return redirect()->route('posts.index');
});

// Route::get('/posts', function () {
//     return view('posts.index',[
//         'users' => User::all(),
//         'categories' => Category::all(),
//         'posts' => Post::all(),
//     ]);
// })->name('all-posts');

// Route::get('/posts/create', function () {
//     return view('posts.create');
// });

// Route::get('/posts/x', function () {
//     return view('posts.show');
// });

// Route::get('/posts/x/edit', function () {
//     return view('posts.edit');
// });

Route::resource('posts',PostController::class);

// -----------------------------------------

// Route::get('/categories/create', function () {
//     return view('categories.create');
// });

// Route::get('/categories/x', function () {
//     return view('categories.show');
// });

Route::resource('categories',CategoryController::class);

// -----------------------------------------

Auth::routes();
