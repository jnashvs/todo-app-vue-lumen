<?php

use Illuminate\Database\Seeder;
use App\Models\Tasks;

class TasksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tasks = factory(Tasks::class, 10)->create();
    }
}
