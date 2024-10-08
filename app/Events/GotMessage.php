<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class GotMessage implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(public array $message)
    {
        // as we have public $massage as a constructor argument
        // so the in the frontend there we'll have e.message
        // in the .listen((e) => { ... }) callback
    }

    /**
     * Get the channels the event should broadcast on.
     * After the constructor is executed, Laravel's broadcasting system will call the broadcastOn() method.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        if ($this->message['to_id'] == 0) { // Message is sent to everybody
            $webSocketChannel = "channel_for_everyone";
        } else {
            // Sort user IDs to ensure consistent channel name regardless of sender/receiver order
            $user_ids = [
                $this->message['user_id'],
                $this->message['to_id'],
            ];
            sort($user_ids);
            $webSocketChannel = "channelBetweenUsers.{$user_ids[0]}.{$user_ids[1]}";
        }
        //Log::info("webSocketChannel: {$webSocketChannel}");
        return [
            new PrivateChannel($webSocketChannel),
        ];
    }
}
