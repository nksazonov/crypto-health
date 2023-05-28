// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

interface IHealth {
	// ============ Structs ============

	struct Patient {
		string name;
		string surname;
		uint64 birthDate;
		uint16 height;
		uint16 weight;
		uint8 bloodType;
	}

	struct Diagnosis {
		uint16 code;
		bool isActive;
		uint64 date;
		address doctor;
	}

	// ============ Events ============

	event PatientAdded(address indexed patient, string name, string surname, uint64 birthDate);

	event PatientUpdated(address indexed patient, string name, string surname, uint64 birthDate);

	event PatientDeleted(address indexed patient);

	event DiagnosisRecordAdded(address indexed patient, uint16 code, bool isActive, address doctor);

	event DiagnosisAdded(address indexed patient, uint16 code);

	event DiagnosisRemoved(address indexed patient, uint16 code);

	// ============ Getters ============

	function getPatient(
		address patient,
		bytes calldata signature
	) external view returns (Patient memory);

	function getDiagnosesHistory(address patient) external view returns (Diagnosis[] memory);

	function getActiveDiagnoses(address patient) external view returns (uint16[] memory);

	// ============ Modifying Functions ============

	function addPatient(Patient calldata patient) external;

	function updatePatient(Patient calldata patient) external;

	function deletePatient(address patient) external;

	function addDiagnosisRecord(
		address patient,
		uint16 diagnosisCode,
		bool isDiagnosisActive
	) external;
}
