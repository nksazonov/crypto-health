import { useState } from "react";
import { timestampToISODateString, nowToISODateString } from "../../data/adapters/timeAdapters";
import { BloodTypesIDs, BloodTypesStr } from "../../data/maps";
import { PatientGeneralInfo } from "../../data/types";
import Button from "./Button";
import DateTimeInput from "./DateTimeInput";
import Input from "./Input";
import Select from "./Select";

interface Props {
  heading: string;
  patient?: PatientGeneralInfo;
  onConfirmClick: (patient: PatientGeneralInfo) => void;
  onCancelClick: () => void;
  className?: string;
}

function AddPatientBlock({ heading, patient, onConfirmClick, onCancelClick, className }: Props) {
  const [name, setName] = useState<string>(patient ? patient.name : '');
  const [surname, setSurname] = useState<string>(patient ? patient.surname : '');
  const [birthDate, setBirthDate] = useState<string>(patient ? timestampToISODateString(patient.birthTimestamp) : nowToISODateString());
  const [height, setHeight] = useState<number>(patient ? patient.height : 0);
  const [weight, setWeight] = useState<number>(patient ? patient.weight : 0);
  const [bloodTypeIdx, setBloodTypeIdx] = useState<number>(patient ? patient.bloodType : 0);

  const assemblePatient = (): PatientGeneralInfo => {
    return {
      name: name,
      surname: surname,
      birthTimestamp: new Date(birthDate).getTime() / 1000,
      height: height,
      weight: weight,
      bloodType: bloodTypeIdx,
    }
  }

  return (
    <div className={`bg-blue-light px-14 py-10 ${className || ''}`}>
      <h2 className="mb-16 text-4xl text-center">{heading}</h2>
      <div className="grid grid-cols-[auto_1fr] grid-rows-6 gap-x-12 gap-y-6 items-center mb-16 text-3xl">
        <span>Name:</span> <Input placeholder="Patient name" value={name} onChange={(e) => setName(e.target.value)} className="w-[15vw] !text-2xl" />
        <span>Surname:</span> <Input placeholder="Patient surname" value={surname} onChange={(e) => setSurname(e.target.value)} className="w-[15vw] !text-2xl" />
        <span>Birth:</span> <DateTimeInput value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="w-[15vw] !text-2xl" />
        <span>Height:</span> <Input placeholder="Patient height" type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-[15vw] !text-2xl" />
        <span>Weight:</span> <Input placeholder="Patient weight" type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-[15vw] !text-2xl" />
        <span>Blood type:</span> <Select selectedOptionId={bloodTypeIdx} keys={BloodTypesIDs} options={BloodTypesStr} onChange={(e) => setBloodTypeIdx(Number(e.target.value))} className="w-[15vw] !text-2xl" />
      </div>

      <div className="flex w-full justify-between">
        <Button text='Done' onClick={() => onConfirmClick(assemblePatient())} />
        <Button text='Cancel' onClick={onCancelClick} negative />
      </div>

    </div>
  )
}

export default AddPatientBlock;
