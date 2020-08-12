<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\Group as GroupResource;
use App\Group;
use App\Person;

class GroupController extends Controller
{
    public function getGroup(){
        $groups = Group::all();
        return response()->json($groups, 200);
    }

    public function getGroupById($id){
        $group = Group::find($id);
        return response()->json($group, 200);
    }

    public function createGroup(Request $request){
        $group = Group::create($request->all());
        return response()->json($group, 200);
    }

    public function updateGroup(Request $request, $id){
        $group = Group::findOrFail($id);
        $response = $group->update($request->all());
        return response()->json($response, 200);
    }

    public function deleteGroup($id){
        $group = Group::find($id);
        $response = $group->delete();
       return response()->json($response, 200);
    }
}
