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

import {JsonLoader, JsonLoaderError, UrlStringsEnum} from "jec-commons";
import {DefaultJsonLoader} from "jec-commons-node";
import {CheetohError} from "../exceptions/CheetohError";
import {GpmConfig} from "../model/GpmConfig";
import {GpmParser} from "../utils/GpmParser";
import {TarballUtil} from "../utils/TarballUtil";
import * as fs from "fs-extra";
import * as path from "path";

/**
 * The <code>GpmManager</code> class allows to download and manage GPM archives.
 */
export class GpmManager {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>GpmManager</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Loads the <code>gpm.json</code> file for the current GPM and builds a
   * <code>GpmConfig</code> instance from the loaded data.
   * 
   * @param {string} extractPath the path where the GPM archive has been
   *                             extracted.
   * @param {Function} callback the callback method called when the build is
   *                            complete.
   */
  private buildGpmConfig(extractPath:string,
                        callback:(gpm:GpmConfig, err:CheetohError)=>void):void {
    let error:CheetohError = null;
    let gpm:GpmConfig = null;
    let parser:GpmParser = null;
    let loader:JsonLoader = new DefaultJsonLoader();
    loader.load(
      path.join(extractPath, "gpm/gpm.json"),
      (data:any)=> {
        // TODO: add a gpm.json validator
        parser = new GpmParser();
        gpm = parser.parse(data.project);
        callback(gpm, error);
      },
      (err:JsonLoaderError)=>{
        error = new CheetohError("GPM manifest config error:\n" + err);
        error.stack = err.stack;
        callback(gpm, error);
      }
    );
  }

  /**
   * Moves the current GPM files from the extracted path to the target folder.
   * 
   * @param {string} source the path where the GPM archive has been extracted.
   * @param {string} dest the path where the files must be moved.
   * @param {Function} callback the callback method called when the process is
   *                            complete.
   */
  private extractGpmConfig(source:string, dest:string,
                                       callback:(err:CheetohError)=>void):void {
    let error:CheetohError = null;
    fs.move(
      source,
      dest,
    ).then(()=> {
      callback(error);
    }).catch((reason:any)=>{
      error = new CheetohError("GPM extraction error:\n" + reason);
      error.stack = reason.stack;
      callback(error);
    });
  }

  /**
   * Deletes the repository wher the current GPM temporaryfiles have been
   * extracted.
   * 
   * @param {string} tmpFolder the repository to delete.
   * @param {Function} callback the callback method called when the repository 
   *                            has been deleted.
   */
  private deleteTmpFolder(tmpFolder:string,
                                       callback:(err:CheetohError)=>void):void {
    let error:CheetohError = null;
    fs.remove(
      tmpFolder,
    ).then(()=> {
      callback(error);
    }).catch((reason:any)=>{
      error = new CheetohError("GPM extraction error:\n" + reason);
      error.stack = reason.stack;
      callback(error);
    });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Donwloads the GPM at the specified URI and Installs it into the the
   * destination path.
   * 
   * @param {string} uri the URL from which to download the GPM.
   * @param {string} destinationPath the path into which to install the GPM.
   * @param {Function} callback the callback method called when installation is
   *                            complete.
   */
  public installFromUri(uri:string, destinationPath:string,
                        callback:(gpm:GpmConfig, err:CheetohError)=>void):void {
    let error:CheetohError = null;
    let gpm:GpmConfig = null;
    let tarballUtil:TarballUtil = new TarballUtil();
    let folder:string = uri.substring(
      uri.lastIndexOf(UrlStringsEnum.SLASH) + 1, uri.lastIndexOf("-")
    );
    let extractPath:string = path.join(destinationPath, folder);
    tarballUtil.download(
      uri,
      destinationPath,
      (err:any)=> {
        if(err) {
          error = new CheetohError("GPM download error:\n" + err);
          error.stack = err;
          callback(gpm, error);
        } else {
          this.buildGpmConfig(
            extractPath,
            (gpm:GpmConfig, err:CheetohError)=>{
              if(err) {
                callback(gpm, err);
              } else {
                this.extractGpmConfig(
                  path.join(destinationPath, folder, "gpm"),
                  path.join(destinationPath, gpm.target),
                  (err:CheetohError)=>{
                    this.deleteTmpFolder(
                      extractPath,
                      (err:CheetohError)=>{
                        callback(gpm, err);
                      }
                    );
                  }
                );
              }
            }
          );
        }
      }
    );
  }
};
