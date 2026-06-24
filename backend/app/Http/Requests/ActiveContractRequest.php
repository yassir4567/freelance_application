<?php

namespace App\Http\Requests;

use App\Models\Contract;
use Illuminate\Foundation\Http\FormRequest;

class ActiveContractRequest extends FormRequest
{

    public function authorize(): bool
    {
        $user = $this->user();

        if (!$user || $user->role !== 'client') {
            return false;
        }

        $contractId = $this->route('id');

        $contract = Contract::with('proposal.project')->find($contractId);

        if (!$contract) {
            return false;
        }

        return $contract->proposal->project->client_id === $user->id;
    }

    protected function prepareForValidation()
    {
        if (is_string($this->deliverables)) {
            $this->merge([
                'deliverables' => json_decode($this->deliverables, true)
            ]);
        }
    }

    public function rules(): array
    {
        return [
            //
            'description' => 'required|string|min:100|max:2000',
            'final_price' => 'required|numeric|min:5',
            'final_deadline' => 'required|date|after:today',
            'contract_pdf' => 'required|file|mimes:pdf|max:5120',

            'deliverables' => 'required|array|min:1',
            'deliverables.*.title' => 'required|string',
            'deliverables.*.amount' => 'required|numeric|min:1',
            'deliverables.*.description' => 'required|string|min:30',
            'deliverables.*.position' => 'required|integer|min:1|distinct',
        ];
    }
}
