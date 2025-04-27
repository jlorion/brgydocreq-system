<?php

namespace Database\Factories;

use App\Models\Address;
use App\Models\Status;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Resident>
 */
class ResidentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'resident_firstname' => $this->faker->firstName(),
            'resident_middlename' => $this->faker->lastName(),
            'resident_lastname' => $this->faker->lastName(),
            'resident_suffix' => $this->faker->optional()->suffix(),
            'resident_birthdate' => $this->faker->date(),
            'resident_gender' => $this->faker->randomElement(['Male', 'Female']),
            'resident_precinct' => $this->faker->randomNumber(9),
            'resident_householdnum' => $this->faker->randomNumber(4, true),
            'address_id' => Address::factory(),
        ];
    }
}
