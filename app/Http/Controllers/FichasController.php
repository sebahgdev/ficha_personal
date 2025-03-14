<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ficha;
use Yajra\DataTables\Facades\DataTables;

class FichasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        /*     if ($request->ajax()) {
                return DataTables::of(Ficha::query())->make(true);
            }

            return response()->json(['message' => 'Método no permitido'], 405); */
            $fichas = Ficha::select('id', 'nombres', 'direccion', 'telefono','correo','urgencia')->get();
            return response()->json($fichas);
        }


    public function store(Request $request)
    {
          // Validar los datos del formulario
          $request->validate([
            'nombres' => 'required|string|max:255',
            'direccion' => 'required|string|max:255',
            'telefono' => 'required|string|max:20',
            'correo' => 'required|email|max:255',
            'urgencia' => 'required|string|max:255',
        ]);

        // Crear una nueva ficha
        $ficha = Ficha::create([
            'nombres' => $request->nombres,
            'direccion' => $request->direccion,
            'telefono' => $request->telefono,
            'correo' => $request->correo,
            'urgencia' => $request->urgencia,
        ]);

        $data = DataTables::of(Ficha::query())->make(true);
        return DataTables::of(Ficha::query())->make(true);
      /*   return response()->json([
            'message' => 'Ficha creada exitosamente',
            'ficha' => $ficha,
            'data' =>  $data
        ], 201); */
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
