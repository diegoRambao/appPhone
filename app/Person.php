<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    protected $fillable = [
        'name', 'surname', 'group_id'
    ];

    public function group()
    {
        return $this->belongsTo('App\Group');
    }

    public function phones()
    {
        return $this->hasMany('App\Phone');
    }
}
