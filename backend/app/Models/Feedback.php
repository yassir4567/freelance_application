<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Feedback extends Model
{
    //
    protected $fillable = ['contract_id', 'rating', 'comment'];

    public function contract(): BelongsTo
    {
        return $this->belongsTo(Contract::class);
    }
}
