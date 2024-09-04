<?php

namespace App\Jobs;

use App\Events\GotMessage;
use App\Models\Message;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use function Sodium\crypto_aead_chacha20poly1305_ietf_decrypt;

class SendMessage implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(public Message $message)
    {
        //
    }

    /**
     * Executed when the job is processed by a queue worker.
     */
    public function handle(): void
    {
        $senderName = User::where('id', $this->message->user_id)->value('name');
        $receiverName = User::where('id', $this->message->to_id)->value('name');

        // dispatch() first calls the GotMessage constructor, then Laravel's broadcasting system will call the GotMessage::broadcastOn() method.
        GotMessage::dispatch([
            'id' => $this->message->id,
            'user_id' => $this->message->user_id,
            'senderName' => $senderName,
            'receiverName' => $receiverName,
            'to_id' => $this->message->to_id,
            'text' => $this->message->text,
            'time' => $this->message->time, // calls app/Models/Message.php, getTimeAttribute Laravel accessor method
        ]);
    }
}
