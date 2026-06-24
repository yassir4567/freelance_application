<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $allowed_duration = ['less_than_1_month', '1_to_3_month', '3_to_6_month', 'more_than_6_month'];

        return [
            'category_id' => 'required|exists:categories,id',
            'title' => 'required|string|min:3|max:255',
            'description' => 'required|string|min:20|max:1500',
            'budget' => 'required|numeric|gt:5|max:100000',
            'experience_level' => 'required|string|in:junior,mid-level,senior',
            'size' => 'required|string|in:small,medium,large',
            'duration' => ['required', 'string', Rule::in($allowed_duration)],
            'skills' => 'required|array|min:1',
            'skills.*' => Rule::exists('category_skill', 'skill_id')->where('category_id', $this->category_id),

        ];
    }
}
