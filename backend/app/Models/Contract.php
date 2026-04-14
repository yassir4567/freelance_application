<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Contract extends Model
{
    //
    protected $fillable = ['proposal_id', 'fichierPdf', 'description', 'status', 'final_price', 'final_deadline'];

    public function proposal() : BelongsTo {
        return $this->belongsTo(Proposal::class) ;
    }

    public function feedback() : HasOne {
        return $this->hasOne(Feedback::class) ;
    }

    public function deliverables() : HasMany {
        return $this->hasMany(Deliverable::class) ;
    }

    public function conversation() : HasOne {
        return $this->hasOne(Conversation::class) ;
    }

    public function contractsTimelines() : HasMany {
        return $this->hasMany(ContractTimeline::class) ;
    }
    

}
