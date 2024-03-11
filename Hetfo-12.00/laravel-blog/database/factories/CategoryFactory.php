<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => collect(fake()->words(5))->max(),
            'bg_color' => fake()->safeHexColor()."ff",
            'txt_color' => fake()->safeHexColor()."ff",
        ];
    }
}
