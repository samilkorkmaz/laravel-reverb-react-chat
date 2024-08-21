<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Log;

class Message extends Model
{
    use HasFactory;

    public $table = 'messages';

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

    //getTimeAttribute is a Laravel accessor. It is automatically invoked when you try to access the time attribute on a Message model instance (e.g., $message->time).
    public function getTimeAttribute(): string
    {
        return date("d M Y, H:i:s", strtotime($this->attributes['created_at']));
    }
}
