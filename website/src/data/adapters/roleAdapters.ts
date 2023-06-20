import { AccountRolesMap } from "../maps";

export function roleStringToId(role: string): number {
  for (let [key, value] of AccountRolesMap.entries()) {
    if (value === role) return key;
  }

  return -1;
}
