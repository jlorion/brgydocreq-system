<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('user.notifications.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});
