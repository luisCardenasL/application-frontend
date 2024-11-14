

import React from 'react'

const GetTimestampText = (timestamp) => {
    const options = {year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(timestamp);

    return formattedDate
}

export default GetTimestampText