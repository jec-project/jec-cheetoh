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

import {Cheetoh} from "../Cheetoh";
import {ManifestManager} from "./ManifestManager";
import {CheetohLoggerProxy} from "../logging/CheetohLoggerProxy";
import {LogLevel} from "jec-commons";
import {CheetohError} from "../exceptions/CheetohError";
import {GpmManager} from "../core/GpmManager";
import {GpmConfig} from "../model/GpmConfig";
import * as path from "path";

/**
 * The default implementation of the <code>Cheetoh</code> interface.
 */
export class DefaultCheetohImpl implements Cheetoh {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>DefaultCheetohImpl</code> instance.
   */
  constructor() {
    this.initObj();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   */
  private initObj():void {
    CheetohLoggerProxy.getInstance();
  }

  /**
   * The wrapper function used to send decorated messages to the output stream.
   * 
   * @param {string} message the message to decorate and to send to the output
   *                         stream.
   * @param {number} logLevel the log level of the message sent to the output
   *                          stream. Valid values are the constants of the
   *                          <code>LogLevel</code> class.
   */
  private sendMessage(message:string, logLevel?:number):void {
    CheetohLoggerProxy.getInstance().log(message, logLevel);
  }

  /**
   * The wrapper function used to send decorated errors to the output stream.
   * 
   * @param {CheetohError} err the error to decorate and to send to the output
   *                           stream.
   */
  private sendError(err:CheetohError):void {
    CheetohLoggerProxy.getInstance()
                      .log(
                        `GPM install error:\n${err.message}\n${err.stack}`,
                        LogLevel.ERROR
                      );
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc 
   */
  public installGpmFromUri(uri:string, destinationPath:string,
                           callback:(err:CheetohError)=>void):void {
    let manager:ManifestManager = new ManifestManager();
    let error:CheetohError = null;
    let loader:GpmManager = null;
    this.sendMessage("GPM install start");
    this.sendMessage("Destination path is: " + destinationPath);
    manager.setGlassCatPath(destinationPath);
    manager.loadManifest(
      (err:CheetohError)=> {
        if(err) {
          this.sendError( err);
          callback(err);
        } else {
          this.sendMessage("GPM download start");
          this.sendMessage("GPM URI is: " + uri);
          loader = new GpmManager();
          loader.installFromUri(
            uri,
            destinationPath,
            (gpm:GpmConfig, err:CheetohError)=>{
              if(err) {
                this.sendError(err);
              } else {
                this.sendMessage("GPM extraction complete");
                this.sendMessage(
                  "Installation path is: " +
                  path.join(destinationPath, gpm.target)
                );
                manager.addGpm(gpm);
                this.sendMessage("GPM manifest update");
                manager.updateManifest((err:CheetohError)=>{
                  if(err) {
                    this.sendError(err);
                    callback(err);
                  } else {
                    this.sendMessage("GPM install complete");
                    callback(null);
                  }
                });
              }
            }
          );
        }
      }
    );
  }
};
