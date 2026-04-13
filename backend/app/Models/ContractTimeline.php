<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContractTimeline extends Model
{
    //
    protected $fillable = ['contract_id', 'event_type', 'title', 'description'];
}
