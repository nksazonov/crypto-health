import React from "react";
import useDApp from "./useDApp";
import { ethers } from "ethers";
import CryptoHealthArtifacts from "../artifacts/CryptoHealth.json";
import { config } from "../config/config";
import { CryptoHealth } from "../artifacts/CryptoHealth";

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

  const getPatientInfo = React.useCallback(async () => {
    if (!account) return null;
    if (CryptoHealthContract() === null) return null;

    const CryptoHealth = CryptoHealthContract()!;
    const patientInfo = await CryptoHealth.getPatient(account);
    return patientInfo;
  }, [account, CryptoHealthContract]);

  const getActiveDiagnoses = React.useCallback(async () => {
    if (!account) return null;
    if (CryptoHealthContract() === null) return null;

    const CryptoHealth = CryptoHealthContract()!;
    const activeDiagnoses = await CryptoHealth.getActiveDiagnoses(account);
    return activeDiagnoses;
  }, [account, CryptoHealthContract]);

  const getDiagnosesHistory = React.useCallback(async () => {
    if (!account) return null;
    if (CryptoHealthContract() === null) return null;

    const CryptoHealth = CryptoHealthContract()!;
    const diagnosesHistory = await CryptoHealth.getDiagnosesHistory(account);
    return diagnosesHistory;
  }, [account, CryptoHealthContract]);

  return {
    CryptoHealthContract,
    getRole,
    getPatientInfo,
    getActiveDiagnoses,
    getDiagnosesHistory,
  };
}
