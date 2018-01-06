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

import { TestSuite, Test } from "jec-juta";
import { expect } from "chai";
import { GpmProperty } from "../../../../../src/com/onsoft/cheetoh/utils/GpmProperty";

import * as utils from "../../../../../utils/test-utils/utilities/GpmPropertyTestUtils";

@TestSuite({
  description: "Test the GpmProperty class methods"
})
export class GpmPropertyTest {

  @Test({
    description: "NAME should be equal to 'name'"
  })
  public nameTest():void {
    expect(GpmProperty.NAME).to.equal(utils.NAME);
  }
  
  @Test({
    description: "TARGET should be equal to 'target'"
  })
  public targetTest():void {
    expect(GpmProperty.TARGET).to.equal(utils.TARGET);
  }
  
  @Test({
    description: "TITLE should be equal to 'title'"
  })
  public titleTest():void {
    expect(GpmProperty.TITLE).to.equal(utils.TITLE);
  }
  
  @Test({
    description: "DESCRIPTION should be equal to 'description'"
  })
  public descriptionTest():void {
    expect(GpmProperty.DESCRIPTION).to.equal(utils.DESCRIPTION);
  }
  
  @Test({
    description: "VERSION should be equal to 'version'"
  })
  public versionTest():void {
    expect(GpmProperty.VERSION).to.equal(utils.VERSION);
  }
  
  @Test({
    description: "AUTHOR should be equal to 'author'"
  })
  public authorTest():void {
    expect(GpmProperty.AUTHOR).to.equal(utils.AUTHOR);
  }
}