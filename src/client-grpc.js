/*
 *
 * Copyright 2015 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = __dirname + '/protos/mensa.proto';
const packageDefinition = protoLoader.loadSync(
  PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  },
);

const rgbmensaapi_proto = grpc.loadPackageDefinition(packageDefinition).rgbmensaapi;

function main() {
  /*
  const clientIngredients = new rgbmensaapi_proto.Ingredients('localhost:50051', grpc.credentials.createInsecure());
  clientIngredients.getIngredients({
    key: '1',
  }, (err, response) => {
    console.log('Response:', response);
  });
  */
  const clientMenus = new rgbmensaapi_proto.Menus('localhost:50051', grpc.credentials.createInsecure());
  clientMenus.getMenus({
  }, (err, response) => {
    console.log('Response:', response);
  });
}

main();
