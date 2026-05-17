import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const tokenAtom = atomWithStorage(
  "token", 
  null
);

export const isConnectedAtom = atom((get) => {
  return Boolean(get(tokenAtom));
});