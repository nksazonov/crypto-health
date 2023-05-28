// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import '../CryptoHealth.sol';

contract TESTCryptoHealth is CryptoHealth {
	function getPatientUnchecked(address patient) external view returns (Patient memory) {
		return _patients[patient];
	}

	function getDiagnosisUnchecked(
		address patient,
		uint16 index
	) external view returns (Diagnosis memory) {
		return _diagnosesHistory[patient][index];
	}

	function requirePatientExists(address patient) external view {
		_requirePatientExists(patient);
	}

	function requirePatientDoesNotExist(address patient) external view {
		_requirePatientDoesNotExist(patient);
	}

	function isEmptyPatient(Patient memory patient) external pure returns (bool) {
		return _isEmptyPatient(patient);
	}

	function requireCorrectPatient(Patient memory patient) external view {
		_requireCorrectPatient(patient);
	}

	function toggleActiveDiagnosis(address patient, uint16 diagnosisCode, bool isActive) external {
		_toggleActiveDiagnosis(patient, diagnosisCode, isActive);
	}
}
