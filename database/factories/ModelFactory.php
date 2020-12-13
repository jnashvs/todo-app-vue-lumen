<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Faker\Generator as Faker;
use App\Models\Tasks;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(Tasks::class, function (Faker $faker) {
    return [
        'title' => $faker->name, 
        'subtitle' => $faker->name, 
        'action'=> rand(200,300), 
        'completed'=> rand(0,1)
    ];
});
