<?php

namespace App\Http\Controllers;

use App\Models\Barangay;
use App\Http\Requests\StoreBarangayRequest;
use App\Http\Requests\UpdateBarangayRequest;
use Inertia\Inertia;

class BarangayController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Barangays/Index', [
            'barangays' => Barangay::with('municipality')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBarangayRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Barangay $barangay)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Barangay $barangay)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBarangayRequest $request, Barangay $barangay)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Barangay $barangay)
    {
        //
    }
}
