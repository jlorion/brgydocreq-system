<?php

namespace Database\Factories;

use App\Models\Address;
use App\Models\Status;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BarangayOfficer>
 */
class BarangayOfficerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'officer_firstname' => $this->faker->firstName(),
            'officer_middlename' => $this->faker->lastName(),
            'officer_lastname' => $this->faker->lastName(),
            'officer_suffix' => $this->faker->optional()->suffix(),
            'officer_birthdate' => $this->faker->date(),
            'officer_position' => $this->faker->randomElement(['Chairman', 'Secretary', 'Treasurer']),
            'officer_gender' => $this->faker->randomElement(['Male', 'Female']),
            'officer_precinct' => $this->faker->randomNumber(9),
            'officer_householdnum' => $this->faker->randomNumber(4, true),
            'address_id' => Address::factory(),
            'status_id' => Status::inRandomOrder()->first()->status_id,
        ];
    }
}
