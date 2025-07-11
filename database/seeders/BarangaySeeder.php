<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class BarangaySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = json_decode(file_get_contents(database_path('seeders/data/barangays.json')), true);

        foreach ($data as $item) {
            // Get the municipality ID by name
            $municipality = DB::table('municipalities')
                ->where('municipal', $item['tmp_muni'])
                ->first();

            if (!$municipality) {
                logger()->warning("No matching municipality found for barangay: " . $item['barangay']);
                continue;
            }

            // Insert barangay
            DB::table('barangays')->insert([
                'id' => Str::uuid(),
                'municipality_id' => $municipality->id,
                'barangay' => $item['barangay'],
                'code' => $item['code'],
                'longitude' => $item['longitude'] ?? null,
                'latitude' => $item['latitude'] ?? null,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // Insert geom separately via raw SQL
            DB::statement("
                UPDATE barangays 
                SET geom = ST_GeomFromText(?, 4326) 
                WHERE code = ?
            ", [$item['geom'], $item['code']]);
        }
    }
}
