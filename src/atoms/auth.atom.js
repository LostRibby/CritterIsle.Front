import { atom } from 'jotai';

export const tokenAtom = atom(null);

export const isConnectedAtom = atom((get) => {
  const token = get(tokenAtom);
  return Boolean(token);
});