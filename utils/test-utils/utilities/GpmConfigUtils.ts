//  DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
//
//   Copyright 2016-2018 Pascal ECHEMANN.
//
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//       http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.

/*!
 * This module constains utilities used to test GPM configuration files.
 */

// Utilities:
export const NAME:string = "test-ejp";
export const TARGET:string = "test-target";
export const TITLE:string = "test-title";
export const DESCRIPTION:string = "Test configuration file";
export const VERSION:string = "1.0.0";
export const AUTHOR:string = "ONSOFT SYSTEMS";
export const INVALID_NAME:any = {
  target: null, title: null, description: null, version: null, author: null
};
export const INVALID_TARGET:any = {
  name: null, title: null, description: null, version: null, author: null
};
export const INVALID_TITLE:any = {
  name: null, target: null, description: null, version: null, author: null
};
export const INVALID_DESCRIPTION:any = {
  name: null, target: null, title: null, version: null, author: null
};
export const INVALID_VERSION:any = {
  name: null, target: null, title: null, description: null, author: null
};
export const INVALID_AUTHOR:any = {
  name: null, target: null, title: null, description: null, version: null
};
export const VALID_GPM:any = {
  name: NAME,
  target: TARGET,
  title: TITLE,
  description: DESCRIPTION,
  version: VERSION,
  author: AUTHOR
};
