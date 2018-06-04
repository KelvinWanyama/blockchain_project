let Block = require('../lib/block.js');
let Chain = require("../lib/blockChain.js");
const DATEFORMAT = require("dateformat");

describe('integration testing', function() {

  beforeEach(function() {
    jasmine.clock().install();
    testBlock = new Block.Block("Sam", "Daniel", "Morphine");
    baseTime = DATEFORMAT(new Date(), "isoDateTime");
    chain = new Chain.Chain();
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });

  describe('chain creation', function() {

    it("assign previous hash to the new block", function(){
      chain.addBlock(testBlock);
      chain.addBlock(new Block.Block("Daniel,", "Sam", "Valium"));
      expect(chain.chain[2].previousHash).toEqual(testBlock.hash);
    });
  });

  describe('block integrity', function() {

    beforeEach(function() {
      testBlock2 = new Block.Block("Gadiza", "Sam", "Valium");
      chain.addBlock(testBlock);
      chain.addBlock(testBlock2);
    });

    it('returns true if chain is valid', function() {
      expect(chain.integrityChecker()).toBe(true);
    });

    it('throws error if chain is invalid', function() {
      testBlock.doctorName = "Patryk";
      testBlock.hash = testBlock.calculateHash();
      expect(function() {
        chain.integrityChecker();
      }).toThrow("Chain is invalid");
    });
  });
});
