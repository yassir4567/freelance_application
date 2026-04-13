<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class User extends Model
{
    //
    protected $fillable = ['username', 'email', 'password', 'role', 'firstName', 'lastName', 'age', 'phone', 'country', 'avatar', 'address', 'city'];

    // * if the user role is client
    public function projects(): HasMany
    {
        return $this->hasMany(Project::class, 'client_id');
    }

    public function wallet(): HasOne
    {
        return $this->hasOne(Wallet::class);
    }

    public function notifications(): HasMany
    {
        return $this->hasMany(Notification::class);
    }
}
