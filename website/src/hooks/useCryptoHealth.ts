import React from "react";
import useDApp from "./useDApp";
import { ethers } from "ethers";
import CryptoHealthArtifacts from "../artifacts/CryptoHealth.json";
import { config } from "../config/config";
import { CryptoHealth, IHealth } from "../artifacts/CryptoHealth";
import {
  parseActiveDiagnoses,
  parseDiagnosesHistory,
  parsePatientInfo,
} from "../data/adapters/patientAdapters";

export type Role = "Admin" | "Doctor" | "Patient";

const AdminRole = ethers.constants.HashZero;
const DoctorRole = ethers.utils.id("DOCTOR_ROLE");

export default function useCryptoHealth() {
  const { account, provider } = useDApp();

  const CryptoHealthContract = React.useCallback(() => {
    if (!provider) return null;

    const CryptoHealth = new ethers.Contract(
      config.cryptoHealthAddress,
      CryptoHealthArtifacts.abi,
      provider.getSigner()
    ) as CryptoHealth;

    return CryptoHealth;
  }, [provider]);

  const getRole = React.useCallback(async () => {
    if (!account) return null;

    if (CryptoHealthContract() === null) return null;

    const CryptoHealth = CryptoHealthContract()!;

    let role;

    if (await CryptoHealth.hasRole(AdminRole, account)) {
      role = "Admin";
    } else if (await CryptoHealth.hasRole(DoctorRole, account)) {
      role = "Doctor";
    } else {
      role = "Patient";
    }

    return role;
  }, [account, CryptoHealthContract]);

  const getPatientInfo = React.useCallback(
    async (patientAddress: string) => {
      if (CryptoHealthContract() === null) return null;

      const CryptoHealth = CryptoHealthContract()!;
      const patientInfo = await CryptoHealth.getPatient(patientAddress);
      return parsePatientInfo(patientInfo);
    },
    [CryptoHealthContract]
  );

  const getActiveDiagnoses = React.useCallback(
    async (patientAddress: string) => {
      if (CryptoHealthContract() === null) return null;

      const CryptoHealth = CryptoHealthContract()!;
      const activeDiagnoses = await CryptoHealth.getActiveDiagnoses(
        patientAddress
      );
      return parseActiveDiagnoses(activeDiagnoses);
    },
    [CryptoHealthContract]
  );

  const getDiagnosesHistory = React.useCallback(
    async (patientAddress: string) => {
      if (CryptoHealthContract() === null) return null;

      const CryptoHealth = CryptoHealthContract()!;
      const diagnosesHistory = await CryptoHealth.getDiagnosesHistory(
        patientAddress
      );
      return parseDiagnosesHistory(diagnosesHistory);
    },
    [CryptoHealthContract]
  );

  const addPatient = React.useCallback(
    async (patientAddress: string, patient: IHealth.PatientStruct) => {
      if (!account) return null;
      if (CryptoHealthContract() === null) return null;

      const CryptoHealth = CryptoHealthContract()!;
      const tx = await CryptoHealth.addPatient(patientAddress, patient);
      await tx.wait();
    },
    [account, CryptoHealthContract]
  );

  const updatePatient = React.useCallback(
    async (patientAddress: string, patient: IHealth.PatientStruct) => {
      if (!account) return null;
      if (CryptoHealthContract() === null) return null;

      const CryptoHealth = CryptoHealthContract()!;
      const tx = await CryptoHealth.updatePatient(patientAddress, patient);
      await tx.wait();
    },
    [account, CryptoHealthContract]
  );

  const deletePatient = React.useCallback(
    async (patientAddress: string) => {
      if (!account) return null;
      if (CryptoHealthContract() === null) return null;

      const CryptoHealth = CryptoHealthContract()!;
      const tx = await CryptoHealth.deletePatient(patientAddress);
      await tx.wait();
    },
    [account, CryptoHealthContract]
  );

  const addDiagnosisRecord = React.useCallback(
    async (
      patientAddress: string,
      diagnosisCode: number,
      isDiagnosisActive: boolean
    ) => {
      if (!account) return null;
      if (CryptoHealthContract() === null) return null;

      const CryptoHealth = CryptoHealthContract()!;
      const tx = await CryptoHealth.addDiagnosisRecord(
        patientAddress,
        diagnosisCode,
        isDiagnosisActive
      );
      await tx.wait();
    },
    [account, CryptoHealthContract]
  );

  return {
    CryptoHealthContract,
    getRole,
    getPatientInfo,
    getActiveDiagnoses,
    getDiagnosesHistory,
    addPatient,
    updatePatient,
    deletePatient,
    addDiagnosisRecord,
  };
}
