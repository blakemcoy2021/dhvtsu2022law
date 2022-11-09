<?php

    class ModelUser {
        public $firstname = "n/a" ; 
        public $midname = "n/a" ; 
        public $lastname = "n/a";
        public $birthdate;
        public $photo = "n/a";
        public $validId = "n/a";
        public $contactId = 0;

        public function __construct()
        {
            $this->birthdate = date("Y-m-d G:i:s");
        }
    }
