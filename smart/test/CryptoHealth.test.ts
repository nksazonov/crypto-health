import { ethers } from 'hardhat';
import { expect } from 'chai';
import { constants, utils } from 'ethers';

import type { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import type { CryptoHealth, TESTCryptoHealth } from '../typechain-types';
import { ACCOUNT_MISSING_ROLE } from './common';
import type { Patient } from './types';

const ADMIN_ROLE = constants.HashZero;
const DOCTOR_ROLE = utils.id('DOCTOR_ROLE');

describe('CryptoHealth', () => {
  let Admin: SignerWithAddress;
  let Someone: SignerWithAddress;
  let Patient1: SignerWithAddress;
  let Patient2: SignerWithAddress;
  let Doctor: SignerWithAddress;

  let TESTHealth: TESTCryptoHealth;
  let HealthAsSomeone: TESTCryptoHealth;
  let HealthAsPatient1: TESTCryptoHealth;
  let HealthAsPatient2: TESTCryptoHealth;
  let HealthAsDoctor: TESTCryptoHealth;
  let HealthAsAdmin: TESTCryptoHealth;

  let Patient1Data = {
    name: 'Victor',
    surname: 'Kovalenko',
    // eslint-disable-next-line unicorn/numeric-separators-style
    birthDate: 801657745,
    height: 180,
    weight: 80,
    bloodType: 1,
  };

  let Patient2Data = {
    name: 'Vlad',
    surname: 'Dyachenko',
    // eslint-disable-next-line unicorn/numeric-separators-style
    birthDate: 1054118545,
    height: 170,
    weight: 74,
    bloodType: 3,
  };

  const getAndParsePatient = async (address: string): Promise<Patient> => {
    const rawPatient = { ...(await TESTHealth.getPatientUnchecked(address)) };
    return {
      name: rawPatient.name,
      surname: rawPatient.surname,
      birthDate: rawPatient.birthDate.toNumber(),
      height: rawPatient.height,
      weight: rawPatient.weight,
      bloodType: rawPatient.bloodType,
    };
  };

  before(async () => {
    [Admin, Someone, Patient1, Patient2, Doctor] = await ethers.getSigners();
  });

  beforeEach(async () => {
    const CryptoHealthFactory = await ethers.getContractFactory('TESTCryptoHealth');
    TESTHealth = (await CryptoHealthFactory.deploy()) as TESTCryptoHealth;
    await TESTHealth.deployed();

    await TESTHealth.grantRole(DOCTOR_ROLE, Doctor.address);

    HealthAsSomeone = TESTHealth.connect(Someone);
    HealthAsDoctor = TESTHealth.connect(Doctor);
    HealthAsAdmin = TESTHealth.connect(Admin);
  });

  describe('Deployment', () => {
    it('deployer should be admin and doctor', async () => {
      expect(await TESTHealth.hasRole(ADMIN_ROLE, Admin.address)).to.be.true;
      expect(await TESTHealth.hasRole(DOCTOR_ROLE, Admin.address)).to.be.true;
    });
  });

  describe('addPatient', () => {
    it('doctor can add patient', async () => {
      await HealthAsDoctor.addPatient(Patient1.address, Patient1Data);
      expect(await getAndParsePatient(Patient1.address)).to.deep.equal(Patient1Data);
    });

    it('revert on not doctor', async () => {
      await expect(HealthAsSomeone.addPatient(Patient1.address, Patient1Data)).to.be.revertedWith(
        ACCOUNT_MISSING_ROLE(Someone.address, DOCTOR_ROLE),
      );
    });

    it('revert on already added', async () => {
      await HealthAsDoctor.addPatient(Patient1.address, Patient1Data);
      await expect(HealthAsDoctor.addPatient(Patient1.address, Patient1Data)).to.be.revertedWith(
        'patient already exists',
      );
    });
  });

  describe('updatePatient', () => {
    it('doctor can update patient', async () => {
      await HealthAsDoctor.addPatient(Patient1.address, Patient1Data);
      await HealthAsDoctor.updatePatient(Patient1.address, Patient2Data);
      expect(await getAndParsePatient(Patient1.address)).to.deep.equal(Patient2Data);
    });

    it('revert on not doctor', async () => {
      await expect(
        HealthAsSomeone.updatePatient(Patient1.address, Patient1Data),
      ).to.be.revertedWith(ACCOUNT_MISSING_ROLE(Someone.address, DOCTOR_ROLE));
    });

    it('revert on not added', async () => {
      await expect(HealthAsDoctor.updatePatient(Patient1.address, Patient1Data)).to.be.revertedWith(
        'patient does not exist',
      );
    });
  });

  describe('deletePatient', () => {
    it('admin can delete patient', async () => {
      await HealthAsDoctor.addPatient(Patient1.address, Patient1Data);
      await HealthAsAdmin.deletePatient(Patient1.address);
      await expect(TESTHealth.getPatient(Patient1.address)).to.be.revertedWith(
        'patient does not exist',
      );
    });

    it('revert on doctor', async () => {
      await HealthAsDoctor.addPatient(Patient1.address, Patient1Data);
      await expect(HealthAsDoctor.deletePatient(Patient1.address)).to.be.revertedWith(
        ACCOUNT_MISSING_ROLE(Doctor.address, ADMIN_ROLE),
      );
    });

    it('revert on not doctor or admin', async () => {
      await HealthAsDoctor.addPatient(Patient1.address, Patient1Data);
      await expect(HealthAsSomeone.deletePatient(Patient1.address)).to.be.revertedWith(
        ACCOUNT_MISSING_ROLE(Someone.address, ADMIN_ROLE),
      );
    });

    it('revert on not added', async () => {
      await expect(HealthAsAdmin.deletePatient(Patient1.address)).to.be.revertedWith(
        'patient does not exist',
      );
    });
  });

  // describe('addDiagnosisRecord', () => {});

  // describe('_toggleActiveDiagnosis', () => {});

  // describe('getPatient', () => {
  //   it('success on called by this patient');

  //   it('success on called by doctor');

  //   it('revert on not doctor or patient');
  // });

  // describe('getDiagnosesHistory', () => {});

  // describe('getActiveDiagnoses', () => {});
});
