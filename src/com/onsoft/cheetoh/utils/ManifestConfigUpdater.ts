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

import {ManifestConfig} from "../model/ManifestConfig";
import {CheetohError} from "../exceptions/CheetohError";
import * as fs from "fs-extra";

/**
 * The <code>ManifestConfigUpdater</code> class provides utilities for updating
 * GPM manifest files.
 */
export class ManifestConfigUpdater {
  
  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>ManifestConfigUpdater</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Updates the specified manifest object.
   * 
   * @param {string} file the path to the GPM manifest file to update.
   * @param {ManifestConfig} manifest an object that represents the GPM
   *                                  manifest to update.
   * @param {Function} callback the callback method called when the manifest is
   *                            updated.
   */
  public update(file:string, manifest:ManifestConfig, 
                                       callback:(err:CheetohError)=>void):void {
    let error:CheetohError = null;
    fs.writeJSON(file, manifest)
      .then(()=> {
        callback(null);
      })
      .catch((reason:any)=>{
        error = new CheetohError("GPM manifest update error:\n" + reason);
        error.stack = reason;
        callback(error);
      });
  }
}