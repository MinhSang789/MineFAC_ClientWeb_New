const FOUR_1 = 'bốn';
const FOUR_2 = 'tư';
const ZERO_1 = 'lẻ';
const ZERO_2 = 'linh';

export const hunder2vn = (number, configs) => {
  const digits = ['không', 'một', 'hai', 'ba', 'bốn', 'năm',
    'sáu', 'bảy', 'tám', 'chín', 'mười',
  ];
  const digit1s = ['mươi', 'một', 'hai', 'ba', 'bốn', 'lăm',
    'sáu', 'bảy', 'tám', 'chín',
  ];
  const digit2s = ['', 'mốt', 'hai', 'ba', 'bốn', 'lăm',
    'sáu', 'bảy', 'tám', 'chín',
  ];
  if (number <= 10) {
    return digits[number];
  }
  if (number <= 19) {
    return `mười ${digit1s[number % 10]}`;
  }
  if (number < 100) {
    const firstNumber = Number.parseInt(number / 10, 10);
    let secondNumber = digit2s[number % 10];
    if (configs.four === FOUR_2 && number % 10 === 4) {
      secondNumber = 'tư';
    }
    if (secondNumber) {
      secondNumber = ` ${secondNumber}`;
    }
    if (configs.short === true && number % 10 !== 0) {
      return `${digits[firstNumber]}${secondNumber}`;
    }
    return `${digits[firstNumber]} mươi${secondNumber}`;
  }
  if (number < 1000) {
    const firstNumber = Number.parseInt(number / 100, 10);
    const hunderNumber = number % 100;
    let secondString;
    if (hunderNumber === 0) {
      secondString = '';
    } else if (hunderNumber < 10) {
      const zeroString = configs.zero === ZERO_2 ? 'linh' : 'lẻ';
      secondString = ` ${zeroString} ${hunder2vn(hunderNumber)}`;
    } else {
      secondString = ` ${hunder2vn(hunderNumber, configs)}`;
    }
    return `${digits[firstNumber]} trăm${secondString}`;
  }
  throw new Error('Number must less than 1000');
};

export const number2vn = (numberParam, configsParams) => {
  if (typeof (numberParam) !== 'number'
    && typeof (numberParam) !== 'string'
    && typeof (numberParam) !== 'bigint') {
    throw new Error('Parameter is number, string or bigint');
  }
  if (typeof (numberParam) === 'number' && numberParam > Number.MAX_SAFE_INTEGER) {
    throw new Error('Number to large, please using string');
  }
  let numberString = numberParam.toString();
  if (numberString.indexOf('.') !== -1) {
    throw new Error('Number is integer');
  }
  const configs = {
    short: false,
    four: FOUR_1,
    zero: ZERO_1,
    thousand: 'nghìn',
    million: 'triệu',
    billion: 'tỉ',
    hundredZero: true,
    ...configsParams,
  };
  const arrayNumber = [];
  const resultStrings = [];
  if (numberString === '0') {
    return 'không';
  }
  let negativeNumber = false;
  if (numberString[0] === '-') {
    numberString = numberString.substring(1);
    negativeNumber = true;
  }
  while (numberString) {
    arrayNumber.push(Number.parseInt(numberString.slice(-3), 10));
    numberString = numberString.substring(0, numberString.length - 3);
  }
  const tenPower3s = ['', configs.thousand, configs.million, configs.billion];

  for (let i = 0; i < 10; i += 1) {
    const lastTenPower3s = tenPower3s[tenPower3s.length - 1];
    tenPower3s.push(`${configs.thousand} ${lastTenPower3s}`);
    tenPower3s.push(`${configs.million} ${lastTenPower3s}`);
    tenPower3s.push(`${configs.billion} ${lastTenPower3s}`);
  }

  arrayNumber.forEach((aNumber, index) => {
    const tenPower3sString = index ? ` ${tenPower3s[index]}` : '';
    const numberVnString = aNumber !== 0 ? hunder2vn(aNumber, configs) : '';
    let numberVnStringAndTen3s = '';
    if (aNumber !== 0) {
      numberVnStringAndTen3s = `${numberVnString}${tenPower3sString}`;
    }
    if (arrayNumber.length > 1 && index === 0 && aNumber < 100 && aNumber > 0) {
      let hunderthIsZero = 'không trăm ';
      if (configs.hundredZero === false) {
        hunderthIsZero = '';
      }
      if (aNumber < 10) {
        numberVnStringAndTen3s = `${hunderthIsZero}lẻ ${numberVnString}`;
      } else {
        numberVnStringAndTen3s = `${hunderthIsZero}${numberVnString}`;
      }
    }
    if (numberVnStringAndTen3s) {
      resultStrings.unshift(numberVnStringAndTen3s);
    }
  });
  if (negativeNumber) {
    resultStrings.unshift('âm');
  }
  return resultStrings.join(' ');
};

export default number2vn;