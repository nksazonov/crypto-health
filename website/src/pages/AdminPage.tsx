import { useEffect, useState } from "react";
import {ethers} from 'ethers';
import Button from "../components/UI/Button";
import HighlightedText from "../components/UI/HighlightedText";
import Input from "../components/UI/Input";
import AccountRoleBlock from "../components/UI/AccountRoleBlock";
import PatientGeneralInfoBlock from "../components/UI/PatientGeneralInfoBlock";
import { PatientGeneralInfo } from "../data/types";

import DialogueWindowLayout from "../components/UI/DialogueWindowLayout";
import ConfirmationBlock from "../components/UI/ConfirmationBlock";
import { AccountRolesMap } from "../data/maps";
import { shortenAddress } from "../data/adapters/addressAdapters";
import useDApp from "../hooks/useDApp";
import useCryptoHealth, { Role } from "../hooks/useCryptoHealth";
import { roleStringToId } from "../data/adapters/roleAdapters";

function AdminPage() {

  const {account, disconnectWallet} = useDApp();
  const {getRole, grantRole, getPatientInfo, deletePatient} = useCryptoHealth();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [role, setRole] = useState<Role | ''>('');

  useEffect(() => {
    if (!ethers.utils.isAddress(searchQuery)) return;

    getRole(searchQuery).then((r) => {
       setRole(r as Role);
       setAccountRoleId(roleStringToId(r as string));
    });
  }, [account, searchQuery, getRole]);

  // TODO: allow admins to view patient info
  // useEffect(() => {
  //   if (role === 'Patient') {
  //     getPatientInfo(searchQuery).then((info) => {
  //       setPatient(info!);
  //     });
  //   }
  // }, [role, searchQuery, getPatientInfo]);

  const [patient, setPatient] = useState<PatientGeneralInfo | null>(null);
  const [accountRoleId, setAccountRoleId] = useState<number>(-1);
  const [pendingAccountRoleId, setPendingAccountRoleId] = useState<number>(-1);
  const [isChangingRole, setIsChangingRole] = useState<boolean>(false);
  const [isDeletingPatient, setIsDeletingPatient] = useState<boolean>(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }

  const handleChangeRole = (roleId: number): void => {
    setAccountRoleId(roleId);

    grantRole(AccountRolesMap.get(roleId) as Role, searchQuery);

    setIsChangingRole(false);
  }

  const handleDeletePatient = (): void => {
    setPatient(null);

    deletePatient(searchQuery);

    setIsDeletingPatient(false);
  }

  return (
    <div className="flex flex-col h-5/6 w-100 px-36 pt-14">
      <div className="flex justify-between w-full mb-14">
        <div className="flex items-center w-full">
          <HighlightedText text="Admin" />
          <Input value={searchQuery} onChange={handleSearch} className="ml-16 w-2/5" />
        </div>
        <Button text="Disconnect" onClick={() => disconnectWallet()} negative />
      </div>

      {ethers.utils.isAddress(searchQuery)
        ?
          <div className="grow flex">
            <AccountRoleBlock roleId={accountRoleId} setRoleId={(roleId) => {setIsChangingRole(true); setPendingAccountRoleId(roleId)}} className="flex-1 max-w-[27vw] mr-32" />
            <PatientGeneralInfoBlock patient={patient} onDeleteClick={patient ? (() => setIsDeletingPatient(true)) : undefined} className="flex-1 max-w-[27vw]" />
          </div>
        : <></>
      }

      {
        isChangingRole &&
        <DialogueWindowLayout>
          <ConfirmationBlock heading={`Change account role for ${shortenAddress(searchQuery)} to ${AccountRolesMap.get(pendingAccountRoleId)}?`} onConfirmClick={() => handleChangeRole(pendingAccountRoleId)} onCancelClick={() => setIsChangingRole(false)} />
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
