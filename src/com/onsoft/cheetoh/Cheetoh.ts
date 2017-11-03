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

import {CheetohError} from "./exceptions/CheetohError";

/**
 * The main Cheetoh execution entry point, which will execute a full Cheetoh
 * execution session.
 */
export interface Cheetoh {

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Downloads a GPM from the specified URL and installs it into the destination
   * path.
   * 
   * @param {string} sourceUri the URL from which to download the GPM.
   * @param {string} destinationPath the path into which to install the GPM.
   * @param {Fubntion} callback the callback method called when installation is
   *                            complete.
   */
  installGpm(sourceUri:string, destinationPath:string,
             callback:(err:CheetohError)=>void):void;
};
