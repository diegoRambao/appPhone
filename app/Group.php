<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    protected $fillable = [
        'name', 'notes'
    ];

    public function people()
    {
        return $this->hasMany('App\Person');
    }
}
