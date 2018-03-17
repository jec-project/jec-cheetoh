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

import {JsonLoader, JsonLoaderError} from "jec-commons";
import {DefaultJsonLoader} from "jec-commons-node";
import {CheetohError} from "../exceptions/CheetohError";
import {GpmConfig} from "../model/GpmConfig";
import {ManifestConfig} from "../model/ManifestConfig";
import * as path from "path";
import {GpmParser} from "../utils/GpmParser";
import {ManifestConfigUpdater} from "../utils/ManifestConfigUpdater";

/**
 * The <code>ManifestManager</code> class allows to work with GPM manifest
 * files.
 */
export class ManifestManager {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>ManifestManager</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The current GPM manifest file representation.
   */
  private _manifestConfig:ManifestConfig = null;

  /**
   * The path to the current GPM manifest file.
   */
  private _manifestPath:string = null;
  
  /**
   * The path to the GlassCat server that holds the current GPM manifest file.
   */
  private _glasscatPath:string = null;
  
  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Validates the specified <code>data</code> object. Throws a
   * <code>CheetohError</code> exception whether the <code>models</code>
   * property is missing, or <code>models</code> is not of type of
   * <code>Array</code>.
   * 
   * @param {any} data the object to validate.
   * @param {Function} callback the callback method called when the validation 
   *                            is complete.
   */
  private validate(data:any, callback:(err:CheetohError)=>void):void {
    let error:CheetohError = null;
    if(data.models === undefined) {
      error = new CheetohError("Invalid GPM config: missing property 'models'");
    } else if(data.models !== null && !Array.isArray(data.models)) {
      error = new CheetohError("Invalid GPM config: 'models' must be an array");
    }
    callback(error);
  }

  /**
   * Parses the specified <code>data</code> object and sets the
   * <code>_manifestConfig</code> property with a new
   * <code>ManifestConfig</code> instance.
   * 
   * @param {any} data the object to parse.
   * @param {Function} callback the callback method called when the object 
   *                            is parsed.
   */
  private parse(data:any, callback:(err:CheetohError)=>void):void {
    const gpmModels:Array<GpmConfig> = new Array<GpmConfig>();
    const parser:GpmParser = new GpmParser();
    const models:Array<any> = data.models;
    this._manifestConfig = new ManifestConfig();
    let len:number = models.length;
    let gpm:GpmConfig = null;
    try {
      while(len--) {
        gpm = parser.parse(models[len]);
        gpmModels.push(gpm);
      }
      this._manifestConfig.models = gpmModels;
      callback(null);
    } catch(e) {
      callback((e as CheetohError));
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Returns the path to the GlassCat server that holds the current GPM manifest
   * file.
   * 
   * @return {string} the path to the server that holds the current GPM manifest
   *                  file.
   */
  public getGlassCatPath():string {
    return this._glasscatPath;
  }

  /**
   * Sets the path to the GlassCat server that holds the current GPM manifest
   * file.
   * 
   * @param {string} glasscatPath the path to the server that holds the current 
   *                              GPM manifest file.
   */
  public setGlassCatPath(glasscatPath:string):void {
    this._glasscatPath = glasscatPath;
    if(glasscatPath) {
      this._manifestPath = path.join(glasscatPath, "manifest.json");
    }
  }

  /**
   * Loads the current GPM manifest file at the specified GlassCat server path.
   * 
   * @param {Function} callback the callback method called when the manifest is
   *                            loaded.
   */
  public loadManifest(callback:(err:CheetohError)=>void):void {
    let error:CheetohError = null;
    let loader:JsonLoader = null;
    if(!this._manifestPath) {
      error = new CheetohError(
        "Invalid GPM config: server path must be specified"
      );
      callback(error);
    } else {
      loader = new DefaultJsonLoader();
      loader.load(
        this._manifestPath,
        (data:any)=> {
          this.validate(data, (err:CheetohError)=>{
            if(err) {
              callback(err);
            } else {
              this.parse(data, (err:CheetohError)=>{
                callback(err);
              });
            }
          });
        },
        (err:JsonLoaderError)=> {
          error = new CheetohError(err.message);
          error.stack = err.stack;
          callback(error);
        }
      );
    }
  }
  
  /**
   * Updates the current GPM manifest file at the specified GlassCat server
   * path.
   * 
   * @param {Function} callback the callback method called when the manifest is
   *                            updated.
   */
  public updateManifest(callback:(err:CheetohError)=>void):void {
    let error:CheetohError = null;
    let updater:ManifestConfigUpdater = null;
    if(!this._manifestPath) {
      error = new CheetohError(
        "Invalid GPM config: server path must be specified"
      );
      callback(error);
    } else {
      updater = new ManifestConfigUpdater();
      updater.update(
        this._manifestPath,
        this._manifestConfig,
        (err:CheetohError)=>{
          callback(err);
        }
      )
    }
  }

  /**
   * Adds the specified GPM config to the current GPM manifest.
   * 
   * @param {GpmConfig} gpmConfig the GPM configto add to the current GPM
   *                              manifest.
   */
  public addGpm(gpmConfig:GpmConfig):void {
    this._manifestConfig.models.push(gpmConfig);
  }
};
