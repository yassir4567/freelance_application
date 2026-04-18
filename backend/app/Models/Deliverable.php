<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Deliverable extends Model
{
    //
    use HasFactory;
    protected $fillable = ['contract_id', 'title', 'description', 'amount', 'deadline', 'deliverable_links', 'unlocked_at', 'submitted_at', 'accepted_at', 'status', 'submission_note'];

    public function contract(): BelongsTo
    {
        return $this->belongsTo(Contract::class);
    }

    public function payment() : HasOne {
        return $this->hasOne(Payment::class) ;
    }
}
