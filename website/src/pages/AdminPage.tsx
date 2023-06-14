import { useState } from "react";
import Button from "../components/UI/Button";
import HighlightedText from "../components/UI/HighlightedText";
import Input from "../components/UI/Input";
import AccountRoleBlock from "../components/UI/AccountRoleBlock";
import PatientGeneralInfoBlock from "../components/UI/PatientGeneralInfoBlock";
import { PatientGeneralInfo } from "../data/types";

import {patient as patientMockup} from '../data/mockup';
import DialogueWindowLayout from "../components/UI/DialogueWindowLayout";
import ConfirmationBlock from "../components/UI/ConfirmationBlock";
import { AccountRolesMap } from "../data/maps";
import { shortenAddress } from "../data/adapters/addressAdapters";

const patientAddress = "0x1234567890123456789012345678901234567890";

function AdminPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [patient, setPatient] = useState<PatientGeneralInfo | null>(patientMockup);
  const [accountRoleId, setAccountRoleId] = useState<number>(0);
  const [pendingAccountRoleId, setPendingAccountRoleId] = useState<number>(0);
  const [isChangingRole, setIsChangingRole] = useState<boolean>(false);
  const [isDeletingPatient, setIsDeletingPatient] = useState<boolean>(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }

  const handleChangeRole = (roleId: number): void => {
    setAccountRoleId(roleId);

    // TODO: change role TX

    setIsChangingRole(false);
  }

  const handleDeletePatient = (): void => {
    setPatient(null);

    // TODO: delete patient TX

    setIsDeletingPatient(false);
  }

  return (
    <div className="flex flex-col h-5/6 w-100 px-36 pt-14">
      <div className="flex justify-between w-full mb-14">
        <div className="flex items-center w-full">
          <HighlightedText text="Admin" />
          <Input value={searchQuery} onChange={handleSearch} className="ml-16 w-2/5" />
        </div>
        <Button text="Disconnect" negative />
      </div>

      <div className="grow flex">
        <AccountRoleBlock roleId={accountRoleId} setRoleId={(roleId) => {setIsChangingRole(true); setPendingAccountRoleId(roleId)}} className="flex-1 max-w-[27vw] mr-32" />
        <PatientGeneralInfoBlock patient={patient} onDeleteClick={() => setIsDeletingPatient(true)} className="flex-1 max-w-[27vw]" />
      </div>

      {
        isChangingRole &&
        <DialogueWindowLayout>
          <ConfirmationBlock heading={`Change account role for ${shortenAddress(patientAddress)} to ${AccountRolesMap.get(pendingAccountRoleId)}?`} onConfirmClick={() => handleChangeRole(pendingAccountRoleId)} onCancelClick={() => setIsChangingRole(false)} />
        </DialogueWindowLayout>
      }

      {
        isDeletingPatient && patient &&
        <DialogueWindowLayout>
          <ConfirmationBlock heading={`Delete account of ${patient.name + ' ' + patient.surname}?`} onConfirmClick={() => handleDeletePatient()} onCancelClick={() => setIsDeletingPatient(false)} />
        </DialogueWindowLayout>
      }
    </div>
  )
}

export default AdminPage;
