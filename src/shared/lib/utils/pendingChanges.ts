import type { PendingChange } from "@/shared/types/pendingChanges";

export const addPendingChange = (change: PendingChange) => {
  const pendingChangesStr = localStorage.getItem("pendingChanges");
  const pendingChanges: PendingChange[] = pendingChangesStr
    ? JSON.parse(pendingChangesStr)
    : [];
  pendingChanges.push(change);
  localStorage.setItem("pendingChanges", JSON.stringify(pendingChanges));
};

export const getPendingChanges = (): PendingChange[] => {
  const pendingChangesStr = localStorage.getItem("pendingChanges");
  return pendingChangesStr ? JSON.parse(pendingChangesStr) : [];
};

export const clearPendingChanges = () => {
  localStorage.removeItem("pendingChanges");
};
