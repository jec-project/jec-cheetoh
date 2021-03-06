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

import { TestSuite, Test, BeforeAll } from "jec-juta";
import { expect } from "chai";
import { ManifestConfig } from "../../../../../src/com/onsoft/cheetoh/model/ManifestConfig";

@TestSuite({
  description: "Test the ManifestConfig class properties"
})
export class ManifestConfigTest {

  public config:ManifestConfig = null;

  @BeforeAll()
  public initTest():void {
    this.config = new ManifestConfig();
  }

  @Test({
    description: "should have a 'models' property set to 'null'"
  })
  public modelsTest():void {
    expect(this.config).to.have.property("models", null);
  }
}