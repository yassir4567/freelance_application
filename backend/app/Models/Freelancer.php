<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Freelancer extends Model
{
    //
    protected $fillable = ['user_id', 'category_id', 'title', 'bio', 'portfolio_url', 'resume_url'];
}
