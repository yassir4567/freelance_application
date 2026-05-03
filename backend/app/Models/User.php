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
    use HasApiTokens, HasFactory;

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


    // * profile completion methods 

    public function getProfileCompletion()
    {
        if ($this->role === 'client') {
            return $this->getClientProfileCompletion();
        }
        if ($this->role === 'freelancer') {
            return $this->getFreelancerProfileCompletion();
        }

        return [
            'percentage' => 100,
            'is_profile_complete' => true,
            'missing_failed' => [],
        ];
    }

    public function getClientProfileCompletion()
    {
        $fields = [
            'phone' => $this->phone,
            'country' => $this->country,
            'avatar' => $this->avatar,
            'address' => $this->address,
            'city' => $this->city,
        ];

        return $this->calculateCompletion($fields);
    }

    public function getFreelancerProfileCompletion()
    {
        $freelancer = $this->freelancer;
        $fields = [
            'phone' => $this->phone,
            'country' => $this->country,
            'avatar' => $this->avatar,
            'address' => $this->address,
            'city' => $this->city,

            'category' => $freelancer->category_id,
            'title' => $freelancer->title,
            'bio' => $freelancer->bio,
            'portfolio_url' => $freelancer->portfolio_url,
            'resume_url' => $freelancer->resume_url,

        ];

        return $this->calculateCompletion($fields);
    }


    public function calculateCompletion($fields)
    {
        $total = count($fields);
        $completed = 0;
        $missing_fields = [];

        foreach ($fields as $name => $value) {
            if (!empty($value)) {
                $completed++;
            } else {
                $missing_fields[] = $name;
            }
        }

        $percentage = round(($completed / $total) * 100);

        return [
            'percentage' => $percentage,
            'is_profile_completed' => $completed === $total,
            'missing_fields' => $missing_fields,
        ];
    }

}
