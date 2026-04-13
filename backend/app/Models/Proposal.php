<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Proposal extends Model
{
    //
    protected $fillable = ['project_id', 'freelancer_id', 'cover_letter', 'status', 'deadline', 'price'];
}
