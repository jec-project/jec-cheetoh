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

/**
 * A data object that contains information for a GlassCat Project Model.
 */
export class GpmConfig {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>GpmConfig</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Public properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The name of this GPM object.
   */
  public name:string = null;
  
  /**
   * The current version of this GPM object.
   */
  public version:string = null;

  /**
   * The target used to extract this GPM object.
   */
   public target:string = null;
  
  /**
   * The title for this GPM object.
   */
   public title:string = null;

  /**
   * The description of this GPM object.
   */
  public description:string = null;
  
  /**
   * The author of this GPM object.
   */
  public author:string = null;
}
