<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tasks extends Model
{
    protected $fillable = [
        'title', 'subtitle', 'action', 'completed'
    ];

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'tasks';
}