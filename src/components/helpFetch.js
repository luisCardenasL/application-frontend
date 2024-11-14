import { useState, useEffect } from 'react';
import useFetch from "./useFetch";


const helpFetch = () => {
    const url = 'http://localhost:8000/';
    const customFetch = (endpoint, options = {}) => {
        options.method = options.method || "GET"
        options.headers = {
            "content-type": "application/json"
        }

        if(options.body) {
            options.body = JSON.stringify(options.body)
        }

        console.log(options)

        return fetch(`${url}${endpoint}`,options)
                .then(res => {
                    return res.ok
                    ? res.json()
                    : Promise.reject({
                     error: true,
                     status: res.status,
                     statusText: res.statusText

                    })
                }).catch(error => error)
    }

    const post = (endpoint, options) => {
        options.method = "POST"
        return customFetch(endpoint,options).then(resp => {
            console.log(res);
        })
        .catch(error => error)
    }

    return {post}
}

export default helpFetch
