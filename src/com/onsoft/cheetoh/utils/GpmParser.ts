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
 * The <code>GpmParser</code> class provides utilities for parsing GPM manifest
 * files.
 */
export class GpmParser {
  
  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>GpmParser</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Validates the specified <code>manifest</code> object. Throws a
   * <code>CheetohError</code> exception whether GPM properties are missing.
   * 
   * @param {any} manifest the object to validate.
   */
  private validate(manifest:any):void {
    let prop:string = null;
    if(!manifest.name) prop = "name";
    else if(!manifest.version) prop = "version";
    else if(!manifest.target) prop = "target";
    else if(!manifest.title) prop = "title";
    else if(!manifest.description) prop = "description";
    else if(!manifest.author) prop = "author";
    if(prop !== null) {
      throw new CheetohError(`Invalid GPM config: missing property '${prop}'`);
    }
  }

  /**
   * Builds and returns a new <code>GpmConfig</code> instance from the specified
   * <code>manifest</code> object.
   * 
   * @param {any} manifest the source for the <code>GpmConfig</code> instance to
   *                       build.
   * @return {GpmConfig} a new <code>GpmConfig</code> instance.
   */
  private build(manifest:any):GpmConfig {
    let config:GpmConfig = new GpmConfig();
    config.name = manifest.name;
    config.version = manifest.version;
    config.target = manifest.target;
    config.title = manifest.title;
    config.description = manifest.description;
    config.author = manifest.author;
    return config;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Parses the specified object built from a manifest file and returns the
   * corresponding <code>GpmConfig</code> instance.
   * 
   * @param {any} manifest an object that represents a GPM configuration.
   * @return {GpmConfig} a new <code>GpmConfig</code> instance.
   */
  public parse(manifest:any):GpmConfig {
    let config:GpmConfig = null;
    this.validate(manifest);
    config = this.build(manifest);
    return config;
  }
}