<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Log;

class Message extends Model
{
    protected $fillable = [
        'id',
        'user_id',
        'to_id',
        'text',
    ];

    public function sender(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function recipient(): BelongsTo {
        return $this->belongsTo(User::class, 'to_id');
    }

    /**
     * Get the formatted time attribute.
     * getTimeAttribute is a Laravel accessor. It is automatically invoked when you try to access the time attribute on a Message model instance (e.g. message->time).
     *
     * @return string
     */
    public function getTimeAttribute(): string
    {
        return date("d M Y, H:i:s", strtotime($this->created_at));
    }
}
