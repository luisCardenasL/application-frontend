import { useState, useEffect } from 'react'

const helpFetch = () => {
  const url = 'https://backend-application-production-b7df.up.railway.app/'
  const customFetch = (endpoint, options = {}) => {
    options.method = options.method || 'GET'
    options.headers = {
      'content-type': 'application/json',
      
    }
    options.credentials = 'include'
    options.mode = 'cors'

    if (options.body) {
      options.body = JSON.stringify(options.body)
    }

    console.log(endpoint,' ',options)

    return fetch(`${url}${endpoint}`, options)
      .then((res) => {
        return res.ok
          ? res.json()
          : Promise.reject({
              error: true,
              status: res.status,
              statusText: res.statusText,
              msg: res.msg,
            })
      })
      .catch((error) => {
        console.error('Error Fetching')
        return {
          error: true,
          status: error.status,
          msg: error.msg,
        }
      })
  }

  const get = (endpoint) => customFetch(endpoint)

  const post = (endpoint, options) => {
    options.method = 'POST'
    return customFetch(endpoint, options)
  }

  const put = (endpoint, options) => {
    options.method = 'PUT'
    return customFetch(`${endpoint}`, options)
  }

  const delet = (endpoint, id) => {
    const options = {
      method: 'DELETE',
    }
    return customFetch(`${endpoint}/${id}`, options)
  }

  return { get, post, put, delet }
}

export default helpFetch
