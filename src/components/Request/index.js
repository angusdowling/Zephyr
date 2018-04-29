import React from 'react';

const formatHeaders = (headers) => {
    let headerMap = {};
    headers = headers.trim().split(/[\r\n]+/);

    headers.forEach(function (line) {
        let parts  = line.split(': ');
        let header = parts.shift();
        let value  = parts.join(': ');
        headerMap[header] = value;
    });

    return headerMap;
}

export const formatUrl = (components) => {
    let {protocol, resource, taxonomy, args} = components;
    let url = `${protocol}://${resource}/${taxonomy}`;
    
    if(args.size > 0){
        url += "?";

        args.forEach(function(value, key, map){
            url += (url[url.length - 1] === "?" ? "" : "&") + `${key}=${value}`;
        });
    }

    return url;
}

export const getData = (url, callback) => {
    const request = new XMLHttpRequest();

    request.addEventListener("load", function(event){
        let data    = JSON.parse(this.responseText);
        let headers = formatHeaders(this.getAllResponseHeaders());

        callback(data, headers);
    });

    request.open("GET", url);
    request.send();
}