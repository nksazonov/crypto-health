// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import '@openzeppelin/contracts/access/AccessControl.sol';
import '@openzeppelin/contracts/utils/cryptography/SignatureChecker.sol';

import './interfaces/IHealth.sol';

contract CryptoHealth is IHealth, AccessControl {
	// ============ Constants ============

	bytes32 public constant DOCTOR_ROLE = keccak256('DOCTOR_ROLE');

	// ============ Storage ============

	mapping(address => Patient) private _patients;

	mapping(address => Diagnosis[]) private _diagnosesHistory;

	mapping(address => uint16[]) private _activeDiagnoses;

	// ============ Constructor ============

	constructor() {
		_setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
		_setupRole(DOCTOR_ROLE, msg.sender);
	}

	// ============ Getters ============

	function getPatient(
		address patient,
		bytes calldata signature
	) external view override returns (Patient memory) {
		require(
			SignatureChecker.isValidSignatureNow(patient, keccak256(signature), signature),
			'invalid patient signature'
		);

		return _patients[patient];
	}

	function getDiagnosesHistory(
		address patient
	) external view override returns (Diagnosis[] memory) {
		return _diagnosesHistory[patient];
	}

	function getActiveDiagnoses(address patient) external view override returns (uint16[] memory) {
		return _activeDiagnoses[patient];
	}

	// ============ Modifying Functions ============

	function addPatient(Patient calldata patient) external override onlyRole(DOCTOR_ROLE) {
		_patients[msg.sender] = patient;

		emit PatientAdded(msg.sender, patient.name, patient.surname, patient.birthDate);
	}

	function updatePatient(Patient calldata patient) external override onlyRole(DOCTOR_ROLE) {
		_patients[msg.sender] = patient;

		emit PatientUpdated(msg.sender, patient.name, patient.surname, patient.birthDate);
	}

	function deletePatient(address patient) external override onlyRole(DEFAULT_ADMIN_ROLE) {
		delete _patients[patient];

		emit PatientDeleted(patient);
	}

	function addDiagnosisRecord(
		address patient,
		uint16 diagnosisCode,
		bool isDiagnosisActive
	) external override {
		_diagnosesHistory[patient].push(
			Diagnosis(diagnosisCode, isDiagnosisActive, uint64(block.timestamp), msg.sender)
		);

		_toggleActiveDiagnosis(patient, diagnosisCode, isDiagnosisActive);
	}

	function _toggleActiveDiagnosis(address patient, uint16 diagnosisCode, bool isActive) internal {
		if (isActive) {
			_activeDiagnoses[patient].push(diagnosisCode);
		} else {
			uint16[] storage activeDiagnoses = _activeDiagnoses[patient];
			for (uint256 i = 0; i < activeDiagnoses.length; i++) {
				if (activeDiagnoses[i] == diagnosisCode) {
					activeDiagnoses[i] = activeDiagnoses[activeDiagnoses.length - 1];
					activeDiagnoses.pop();
					break;
				}
			}
		}
	}
}
