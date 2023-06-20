import RadioGroup from "./RadioGroup";
import { AccountRolesIDs, AccountRolesStr } from "../../data/maps";

interface Props {
  roleId: number;
  setRoleId: (roleId: number) => void;
  className?: string;
}

function AccountRoleBlock({ roleId, setRoleId, className }: Props) {
  return (
    <div className={`bg-blue-light px-14 py-10 ${className || ''}`}>
      <h2 className="text-4xl mb-16 text-center">Account role</h2>
      <div className="flex flex-col items-center gap-6 text-3xl">
        <RadioGroup selectedId={roleId} values={AccountRolesStr} keys={AccountRolesIDs} onChange={(e) => setRoleId(Number(e.target.value))} />
      </div>
    </div>
  )
}

export default AccountRoleBlock;
