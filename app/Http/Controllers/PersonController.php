<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Person;
use App\Group;
use App\Phone;

class PersonController extends Controller
{
    public function getPeople(){
        $people = Person::all()->load('group', 'phones');
        return response()->json($people, 200);
    }

    public function getPersonById($id){
        $person = Person::find($id)->load('group', 'phones');
        return response()->json($person, 200);
    }

    public function createPerson(Request $request){
        $person = Person::create($request->all());
        $personId = $person->id;

        foreach ($request->phones as $phones) {
            $phone = new Phone();
            $phone->number = $phones;
            $phone->person_id = $personId;
            $phone->save();
        }
        return response()->json($person, 200);
    }

    public function updatePerson(Request $request, $id){
        $person = Person::findOrFail($id);
        $person->update($request->all());
        $personId = $person->id;

        $phone = Phone::where('person_id', $personId);
        $phone->delete();

        foreach ($request->phones as $phones) {
            $phone = new Phone();
            $phone->number = $phones;
            $phone->person_id = $personId;
            $phone->save();
        }
        return response()->json($person, 200);
    }

    public function getPersonByNumber(Request $request){
        $phone = DB::select('SELECT * from phones where LEFT(number,3) = ? AND RIGHT(number, 3) = ?', [$request->firstNum, $request->secondNum]);
        $id = $phone[0]->person_id;
        $person = Person::find($id)->load('group', 'phones');
        $data = [
            $person
        ];
        return response()->json($data, 200);
    }

    public function deletePerson($id){
        Phone::where('person_id', $id)->delete();
        $response = Person::find($id)->delete();
        return response()->json($response, 200);
    }
}