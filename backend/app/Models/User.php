<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    //
    use HasApiTokens , HasFactory;

    protected $fillable = ['username', 'email', 'password', 'role', 'first_name', 'last_name', 'age', 'phone', 'country', 'avatar', 'address', 'city'];

    protected $hidden = ['password'];

    public function freelancer(): HasOne
    {
        return $this->hasOne(Freelancer::class);
    }

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

    public function messages(): HasMany
    {
        return $this->hasMany(Message::class, 'sender_id');
    }
}
