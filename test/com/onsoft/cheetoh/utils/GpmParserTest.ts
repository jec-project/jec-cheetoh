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

import { TestSuite, Test, BeforeAll, Async } from "jec-juta";
import { expect, assert } from "chai";
import { GpmParser } from "../../../../../src/com/onsoft/cheetoh/utils/GpmParser";
import { GpmProperty } from "../../../../../src/com/onsoft/cheetoh/utils/GpmProperty";
import { GpmConfig } from "../../../../../src/com/onsoft/cheetoh/model/GpmConfig";
import { CheetohError } from "../../../../../src/com/onsoft/cheetoh/exceptions/CheetohError";

import * as utils from "../../../../../utils/test-utils/utilities/GpmConfigUtils";

@TestSuite({
  description: "Test the GpmParser class methods"
})
export class GpmParserTest {

  public parsedFile:GpmConfig = null;
  public parser:GpmParser = null;

  @BeforeAll()
  public initTest():void {
    this.parser = new GpmParser();
  }

  @Test({
    description: "should throw an error when the 'name' property of the congiguration file is missing"
  })
  public invalidNameTest():void {
    let parseInvalidGpm:Function = function():void {
      this.parser.parse(utils.INVALID_NAME);
    };
    expect(parseInvalidGpm.bind(this)).to.throw(CheetohError);
  }

  @Test({
    description: "should throw an error when the 'target' property of the congiguration file is missing"
  })
  public invalidTargetTest():void {
    let parseInvalidGpm:Function = function():void {
      this.parser.parse(utils.INVALID_TARGET);
    };
    expect(parseInvalidGpm.bind(this)).to.throw(CheetohError);
  }

  @Test({
    description: "should throw an error when the 'title' property of the congiguration file is missing"
  })
  public invalidTitleTest():void {
    let parseInvalidGpm:Function = function():void {
      this.parser.parse(utils.INVALID_TITLE);
    };
    expect(parseInvalidGpm.bind(this)).to.throw(CheetohError);
  }

  @Test({
    description: "should throw an error when the 'description' property of the congiguration file is missing"
  })
  public invalidDescriptionTest():void {
    let parseInvalidGpm:Function = function():void {
      this.parser.parse(utils.INVALID_DESCRIPTION);
    };
    expect(parseInvalidGpm.bind(this)).to.throw(CheetohError);
  }

  @Test({
    description: "should throw an error when the 'version' property of the congiguration file is missing"
  })
  public invalidVersionTest():void {
    let parseInvalidGpm:Function = function():void {
      this.parser.parse(utils.INVALID_VERSION);
    };
    expect(parseInvalidGpm.bind(this)).to.throw(CheetohError);
  }

  @Test({
    description: "should throw an error when the 'author' property of the congiguration file is missing"
  })
  public invalidAuthorTest():void {
    let parseInvalidGpm:Function = function():void {
      this.parser.parse(utils.INVALID_AUTHOR);
    };
    expect(parseInvalidGpm.bind(this)).to.throw(CheetohError);
  }

  @Test({
    description: "should return an instance of the 'GpmConfig' class"
  })
  public parseTest():void {
    expect(this.parser.parse(utils.VALID_GPM)).to.be.an.instanceOf(GpmConfig);
  }
  
  @Test({
    description: "should define a 'name' property correctly set"
  })
  public validNameTest():void {
    expect(
      this.parser.parse(utils.VALID_GPM)
    ).to.have.property(GpmProperty.NAME, utils.NAME);
  }
  
  @Test({
    description: "should define a 'target' property correctly set"
  })
  public validTargetTest():void {
    expect(
      this.parser.parse(utils.VALID_GPM)
    ).to.have.property(GpmProperty.TARGET, utils.TARGET);
  }
  
  @Test({
    description: "should define a 'title' property correctly set"
  })
  public validTitleTest():void {
    expect(
      this.parser.parse(utils.VALID_GPM)
    ).to.have.property(GpmProperty.TITLE, utils.TITLE);
  }
  
  @Test({
    description: "should define a 'description' property correctly set"
  })
  public validDescriptionTest():void {
    expect(
      this.parser.parse(utils.VALID_GPM)
    ).to.have.property(GpmProperty.DESCRIPTION, utils.DESCRIPTION);
  }
  
  @Test({
    description: "should define a 'version' property correctly set"
  })
  public validVersionTest():void {
    expect(
      this.parser.parse(utils.VALID_GPM)
    ).to.have.property(GpmProperty.VERSION, utils.VERSION);
  }
  
  @Test({
    description: "should define a 'author' property correctly set"
  })
  public validAuthorTest():void {
    expect(
      this.parser.parse(utils.VALID_GPM)
    ).to.have.property(GpmProperty.AUTHOR, utils.AUTHOR);
  }
}