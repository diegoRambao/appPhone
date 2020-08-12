<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Phone extends Model
{
    protected $fillable = [
        'number', 'person_id'
    ];

    public function person()
    {
        return $this->belongsTo('App\Person');
    }
}
