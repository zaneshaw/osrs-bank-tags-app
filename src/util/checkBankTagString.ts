/**
 * Example of a valid bank tag string:
 banktags,1,ecumenical,11942,2554,2562,1704,23191,12512,layout,0,147,1,159,2,165,3,11942,4,8013,5,19564,6,
 22114,7,2564,8,7462,9,4151,10,20232,11,542,12,3105,13,1035,14,3144,15,2552,16,2558,17,2556
 */

export interface CheckBankTagStringResult {
  result: {
    isValid?: boolean;
    message?: string;
  };
  layout: boolean | null;
  icon: string | null;
  tagName: string | null;
}

export function checkBankTagString(tag: string): CheckBankTagStringResult {
  // default layout to false, we'll check for it later
  let layout = false;
  // convert the tag string into an array
  const tagStringArr = bankTagStringToArray(tag);
  // check if the first 2 items are correct and if the length is at least 4
  // the 4th item is required as the tab icon
  if (
    tagStringArr[0] !== 'banktags' ||
    !Number.isInteger(Number(tagStringArr[1])) ||
    tagStringArr.length < 4
  ) {
    return {
      result: { isValid: false, message: 'Invalid header or length' },
      layout: null,
      icon: null,
      tagName: null,
    };
  }

  // iterate through the rest of the items and check if they are valid
  for (let i = 3; i < tagStringArr.length; i++) {
    const item = tagStringArr[i];
    if (item === 'layout') {
      layout = true;
      continue;
    }
    // check if the item is a valid number or if it is not a 32-bit signed integer
    if (!Number.isFinite(Number(item)) || !is32BitSignedInteger(Number(item))) {
      return {
        result: { isValid: false, message: 'Invalid number or not a 32-bit signed integer' },
        layout: null,
        icon: null,
        tagName: null,
      };
    }
  }

  return { result: { isValid: true }, layout, icon: tagStringArr[3], tagName: tagStringArr[2] };
}

function bankTagStringToArray(tag: string): string[] {
  return tag.split(',');
}

function is32BitSignedInteger(num: number): boolean {
  if (!Number.isInteger(num)) {
    return false;
  }

  return (num | 0) === num;
}
