/*
 * Copyright 2010-2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://aws.amazon.com/apache2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 *
 */

///////////////////////////////////////////////////////////////
//
// Configuration
//
///////////////////////////////////////////////////////////////
var AWS         = require('aws-sdk');
var path        = require('path');
var endpoint    = new AWS.Endpoint(process.env.ES_ENDPOINT);
var creds       = new AWS.EnvironmentCredentials('AWS');
var region      = process.env.REGION || 'ap-southeast-2';

var esDomain = {
    region: region,
    endpoint: process.env.ES_ENDPOINT,
    index: 'stocks',
    doctype: 'stock_event'
};

/////////////////////////////////////////////////
//
// main()
//
/////////////////////////////////////////////////

exports.handler = function(event, context) 
{
    deleteIndex(()=>createIndex(context));
}

/*
 * Post the given document to Elasticsearch
 */
function createIndex(context) 
{
    var req = new AWS.HttpRequest(endpoint);

    req.method = 'PUT';
    req.path = path.join('/', esDomain.index);
    req.region = esDomain.region;
    req.headers['presigned-expires'] = false;
    req.headers['Host'] = endpoint.host;
    req.body = JSON.stringify({
        "mappings": {
        "stocks_event": {
            "properties": {
                    "timestamp" : {
                        "type" : "date"
                    },
                    "companyId" : {
                        "type" : "long",
                        "index" : "not_analyzed"
                    },
                    "stockValue": {
                        "type": "float"  
                    },
                    "delta" : {
                        "type" : "float"
                    }
                }
            }
        }
    });

    var signer = new AWS.Signers.V4(req , 'es');  // es: service code
    signer.addAuthorization(creds, new Date());

    var send = new AWS.NodeHttpClient();
    send.handleRequest(req, null, function(httpResp) {
        var respBody = '';
        httpResp.on('data', function (chunk) {
            respBody += chunk;
        });
        httpResp.on('end', function (chunk) {
            console.log('Response: ' + respBody);
            context.succeed('Lambda added document ' + req.body);
        });
    }, function(err) {
        console.log('Error: ' + err);
        context.fail('Lambda failed with error ' + err);
    });
}

function deleteIndex(callback) 
{
    var req = new AWS.HttpRequest(endpoint);

    req.method = 'DELETE';
    req.path = path.join('/', esDomain.index);
    req.region = esDomain.region;
    req.headers['presigned-expires'] = false;
    req.headers['Host'] = endpoint.host;
    req.body = "";

    var signer = new AWS.Signers.V4(req , 'es');  // es: service code
    signer.addAuthorization(creds, new Date());

    var send = new AWS.NodeHttpClient();
    send.handleRequest(req, null, function(httpResp) {
        var respBody = '';
        httpResp.on('data', function (chunk) {
            respBody += chunk;
        });
        httpResp.on('end', function (chunk) {
            console.log('Response: ' + respBody);
            callback();
        });
    }, function(err) {
        console.log('Error: ' + err);
        callback();        
    });
}