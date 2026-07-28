import { randomInt } from "node:crypto";

// 8 uppercase characters, printed on cards and typed by hand — excludes
// 0/O, 1/I/L, the glyphs guests most often misread off paper.
const ALPHABET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";
const CODE_LENGTH = 8;
const MAX_ATTEMPTS = 100;

export function generateInviteCode(): string {
  let code = "";
  for (let i = 0; i < CODE_LENGTH; i++) {
    code += ALPHABET[randomInt(ALPHABET.length)];
  }
  return code;
}

// existingCodes: every invite_code already assigned, so the result is
// guaranteed unique against it.
export function generateUniqueInviteCode(
  existingCodes: Set<string> | string[],
): string {
  const existing =
    existingCodes instanceof Set ? existingCodes : new Set(existingCodes);

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const code = generateInviteCode();
    if (!existing.has(code)) {
      return code;
    }
  }

  throw new Error(
    `Could not generate a unique invite code after ${MAX_ATTEMPTS} attempts`,
  );
}
