<?php

namespace App\Models;

use GuzzleHttp\Client;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Project extends Model
{
    //

    protected $fillable = ["client_id" , "category_id" , 'title' , 'description' , "budget" , 'status' , 'experienceLevel' , "size" , "duration"];

   



}
