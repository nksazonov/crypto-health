// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import '@openzeppelin/contracts/access/AccessControl.sol';
import '@openzeppelin/contracts/utils/cryptography/SignatureChecker.sol';

import './interfaces/IHealth.sol';

contract CryptoHealth is IHealth, AccessControl {
	// ============ Constants ============

	bytes32 public constant DOCTOR_ROLE = keccak256('DOCTOR_ROLE');

	// ============ Storage ============

	mapping(address => Patient) internal _patients;

	mapping(address => Diagnosis[]) internal _diagnosesHistory;

	mapping(address => uint16[]) internal _activeDiagnoses;

	// ============ Constructor ============

	constructor() {
		_setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
		_setupRole(DOCTOR_ROLE, msg.sender);
	}

	// ============ Modifiers ============

	modifier onlyDoctorOrPatient(address patient) {
		require(hasRole(DOCTOR_ROLE, msg.sender) || msg.sender == patient, 'access denied');
		_;
	}

	// ============ Getters ============

	function getPatient(
		address patient
	) external view override onlyDoctorOrPatient(patient) returns (Patient memory) {
		_requirePatientExists(patient);
		return _patients[patient];
	}

	function getDiagnosesHistory(
		address patient
	) external view override onlyDoctorOrPatient(patient) returns (Diagnosis[] memory) {
		_requirePatientExists(patient);
		return _diagnosesHistory[patient];
	}

	function getActiveDiagnoses(
		address patient
	) external view override onlyDoctorOrPatient(patient) returns (uint16[] memory) {
		_requirePatientExists(patient);
		return _activeDiagnoses[patient];
	}

	// ============ Modifying Functions ============

	function addPatient(
		address address_,
		Patient calldata patient
	) external override onlyRole(DOCTOR_ROLE) {
		_requirePatientDoesNotExist(address_);
		_requireCorrectPatient(patient);
		_patients[address_] = patient;

		emit PatientAdded(address_, patient.name, patient.surname, patient.birthDate);
	}

	function updatePatient(
		address address_,
		Patient calldata patient
	) external override onlyRole(DOCTOR_ROLE) {
		_requirePatientExists(address_);
		_requireCorrectPatient(patient);
		_patients[address_] = patient;

		emit PatientUpdated(address_, patient.name, patient.surname, patient.birthDate);
	}

	function deletePatient(address address_) external override onlyRole(DEFAULT_ADMIN_ROLE) {
		_requirePatientExists(address_);
		delete _patients[address_];

		emit PatientDeleted(address_);
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

	// ============ Internal Functions ============

	function _requirePatientExists(address patient) internal view {
		require(!_isEmptyPatient(_patients[patient]), 'patient does not exist');
	}

	function _requirePatientDoesNotExist(address patient) internal view {
		require(_isEmptyPatient(_patients[patient]), 'patient already exists');
	}

	function _isEmptyPatient(Patient memory patient) internal pure returns (bool) {
		return
			bytes(patient.name).length == 0 &&
			bytes(patient.surname).length == 0 &&
			patient.birthDate == 0 &&
			patient.height == 0 &&
			patient.weight == 0 &&
			patient.bloodType == 0;
	}

	function _requireCorrectPatient(Patient memory patient) internal view {
		require(bytes(patient.name).length > 0, 'name is empty');
		require(bytes(patient.surname).length > 0, 'surname is empty');
		require(patient.birthDate < block.timestamp, 'birthDate is in the future');
		require(patient.height > 0, 'height is zero');
		require(patient.weight > 0, 'weight is zero');
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
