//  DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
//
//   Copyright 2016-2017 Pascal ECHEMANN.
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

import {GpmConfig} from "../model/GpmConfig";
import {CheetohError} from "../exceptions/CheetohError";

/**
 * The <code>GpmProperty</code> enum provides values that define properties
 * used in GPM manifest files.
 */
export enum GpmProperty {

  /**
   * Specifies the <code>name</code> property used by GPM manifest objects.
   */
  NAME = "name",
  
  /**
   * Specifies the <code>version</code> property used by GPM manifest objects.
   */
  VERSION = "version",
  
  /**
   * Specifies the <code>target</code> property used by GPM manifest objects.
   */
  TARGET = "target",
  
  /**
   * Specifies the <code>title</code> property used by GPM manifest objects.
   */
  TITLE = "title",

  /**
   * Specifies the <code>description</code> property used by GPM manifest
   * objects.
   */
  DESCRIPTION = "description",

  /**
   * Specifies the <code>author</code> property used by GPM manifest objects.
   */
  AUTHOR = "author"
}