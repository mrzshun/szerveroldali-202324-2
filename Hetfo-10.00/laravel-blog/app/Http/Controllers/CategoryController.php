<?php

namespace App\Http\Controllers;

use App\Models\Category;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Session;
use Illuminate\Validation\Rule;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('categories.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if(!Auth::check()) {
            return redirect('posts');
        }
        $validated = $request->validate(
            [
                'name' => 'required|min:5|max:32',
                'style' => [
                    'required',
                    Rule::in(Category::styles()),
                ],
            ],
            [
                'name.required' => 'A név megadása kötelező!',
                'name.min' => 'A név nem elegendően hosszú (minimum 5 karakter legyen)',
            ]
        );
        \App\Models\Category::factory()->create($validated);
        Session::flash('category_created');
        Session::flash('name',$validated['name']);
        Session::flash('style',$validated['style']);

        return redirect()->route('categories.create');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
