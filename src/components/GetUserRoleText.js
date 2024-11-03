import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useFetch from './useFetch';

//no funciona luego lo cambio
const GetUserRoleText = ({user_id})=> {
    const { data: users, error, isPending } = useFetch(`http://localhost:8000/roles?role_id=${user_id}`);


    
}

export default GetUserRoleText;