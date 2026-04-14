<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Skill extends Model
{
    //
    protected $fillable = ["name"];

    public function freelancers() : BelongsToMany {
        return $this->belongsToMany(Freelancer::class) ;
    }

    public function categories() : BelongsToMany {
        return $this->belongsToMany(Category::class) ;
    }

    
}
