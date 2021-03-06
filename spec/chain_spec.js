let Chain = require("../src/blockChain.js");

describe('Chain Functionality: ', function () {

  beforeEach(function() {
    chain = new Chain.Chain();

    function Patient(name = 'Sam', id = '1') {
      this.name = name
      this.id = id
    };

    function Doctor(name = 'Daniel', id = '2') {
      this.name = name
      this.id = id
    };

    function Prescription(patient, doctor, prescription = "Morphine") {
      this.patient = patient;
      this.doctor = doctor;
      this.prescription = prescription;
    };

    function Block(prescription, previousHash = '') {
      this.index = 1;
      this.timestamp = this.currentDate();
      this.prescription = prescription;
      this.previousHash = previousHash;
      this.hash = this.calculateHash();
      this.nonce = 0;
    };

    Block.prototype.calculateHash = function() {
      return '000000123';
    };

    Block.prototype.currentDate = function() {
      return '2032018';
    };

    Block.prototype.mineBlock = function(difficulty) {
      this.hash = this.calculateHash();
    };

    patient = new Patient();
    doctor = new Doctor();
    prescription = new Prescription(patient, doctor);
    block = new Block(prescription);
  });

  it('creates first block', function() {
    expect(chain.createFirstBlock()).toEqual(chain.chain[0]);
  });

  it('adds a block', function() {
    chain.addBlock(block);
    expect(chain.chain[1]).toEqual(block);
  });

  it('finds the last block', function() {
    chain.addBlock(block);
    expect(chain.findLastBlock()).toEqual(block);
  });
});
