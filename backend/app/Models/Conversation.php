<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Conversation extends Model
{
    //
    protected $fillable = ["contract_id"];

    public function contract() : BelongsTo {
        return $this->belongsTo(Contract::class) ;
    }

    public function messages() : HasMany {
        return $this->hasMany(Message::class) ;
    }
}
