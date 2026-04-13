<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    //
    protected $fillable = ['freelancer_id', 'title', 'entreprise', 'description', 'startDate', 'endDate'];
}
