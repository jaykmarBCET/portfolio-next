
import {Filter} from "bad-words";

const filter = new Filter();

/**
 * Check if text contains bad words
 * @param text string
 * @returns boolean | string
 *          true if contains bad word
 *          otherwise returns original text
 */
export function checkBadWords(text: string): boolean | string {
  if (filter.isProfane(text)) {
    return true; 
  }
  return text; 
}
