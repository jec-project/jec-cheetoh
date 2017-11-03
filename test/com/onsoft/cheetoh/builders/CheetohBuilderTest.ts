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

import { TestSuite, Test } from "jec-juta";
import { expect } from "chai";
import { CheetohBuilder } from "../../../../../src/com/onsoft/cheetoh/builders/CheetohBuilder";
import { DefaultCheetohImpl } from "../../../../../src/com/onsoft/cheetoh/core/DefaultCheetohImpl";

@TestSuite({
  description: "Test the CheetohBuilder class methods"
})
export class CheetohBuilderTest {
  
  @Test({
    description: "should return a new DefaultCheetohImpl object"
  })
  public buildTest():void {
    let builder = new CheetohBuilder();
    expect(builder.build()).to.be.an.instanceOf(DefaultCheetohImpl);
  }
}