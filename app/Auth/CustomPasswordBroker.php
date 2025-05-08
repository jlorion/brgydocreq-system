<?php

namespace App\Auth;

use Illuminate\Auth\Passwords\PasswordBroker as BasePasswordBroker;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Arr;

class CustomPasswordBroker extends BasePasswordBroker
{
    /**
     * @param  array  $credentials
     * @return \Illuminate\Contracts\Auth\Authenticatable|null
     */
    public function getUser(array $credentials)
    {
        $credentials = Arr::only($credentials, ['user_email']);
        return $this->users->retrieveByCredentials($credentials);
    }
}
