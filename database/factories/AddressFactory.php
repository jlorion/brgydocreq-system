<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Address>
 */
class AddressFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'province' => $this->faker->state(),
            'city' => $this->faker->city(),
            'barangay' => $this->faker->streetName(),
            'purok' => $this->faker->word(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
