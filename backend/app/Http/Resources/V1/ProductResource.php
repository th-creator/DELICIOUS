<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
        'attributes' => [
            'id' => (string)$this->id,
            'name' => $this->name,
            'quantity' => $this->quantity,
            'price' => $this->price,
            'type' => $this->type,
            'user_id' => $this->user_id,
            'logo' => $this->logo,
            'category' => $this->category,
        ],
        'relationships' => [
            'user id' => (string)$this->user->id,
            'user name' => $this->user->name,
            'user email' => $this->user->email,
            'user role' => $this->user->role,
        ]
        ];
    }
}
