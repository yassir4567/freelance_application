<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    //

    protected $fillable = ["client_id" , "category_id" , 'title' , 'description' , "budget" , 'status' , 'experienceLevel' , "size" , "duration"];

   
    public function client() : BelongsTo {
        return $this->belongsTo(User::class , 'client_id') ;
    }

    public function category() : BelongsTo {
        return $this->belongsTo(Category::class) ;
    }

    public function proposals() : HasMany {
        return $this->hasMany(Proposal::class) ;
    }

    public function skills() : BelongsToMany {
        return $this->belongsToMany(Skill::class);
    }
    
    
}
