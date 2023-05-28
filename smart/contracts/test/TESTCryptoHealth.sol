// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import '../CryptoHealth.sol';

contract TESTCryptoHealth is CryptoHealth {
	function getPatientUnchecked(address patient) external view returns (Patient memory) {
		return _patients[patient];
	}

	function toggleActiveDiagnosis(address patient, uint16 diagnosisCode, bool isActive) internal {
		_toggleActiveDiagnosis(patient, diagnosisCode, isActive);
	}
}
