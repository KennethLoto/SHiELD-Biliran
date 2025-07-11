<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Kenesu',
            'email' => 'kenesu@example.com',
            'password' => 1234567890,
            'email_verified_at' => now(),
        ]);
    }
}
