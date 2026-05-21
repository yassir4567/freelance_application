<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    //
    protected $table = 'feedbacks' ;
    protected $fillable = ['contenu', 'note' , 'contract_id'];

    public function contract()
    {
        return $this->belongsTo(Contract::class);
    }
}
