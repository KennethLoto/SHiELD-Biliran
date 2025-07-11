<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class MunicipalitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = json_decode(file_get_contents(database_path('seeders/data/municipalities.json')), true);

        foreach ($data as $item) {
            // Insert base data
            DB::table('municipalities')->insert([
                'id' => Str::uuid(),
                'municipal' => $item['municipal'],
                'code' => $item['code'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // Set the geom using ST_GeomFromText
            DB::statement("
                UPDATE municipalities 
                SET geom = ST_GeomFromText(?, 4326) 
                WHERE code = ?
            ", [$item['geom'], $item['code']]);
        }
    }
}
