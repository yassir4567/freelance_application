<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Deliverable extends Model
{
    //
    protected $fillable = ['contract_id', 'title', 'description', 'amount', 'deadline', 'deliverable_links', 'unlocked_at', 'submitted_at', 'accepted_at', 'status', 'submission_note'];
}
