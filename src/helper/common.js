import queryString from 'query-string'
import swal from 'sweetalert';
import { message } from 'antd';

export function simpleCopyToClipboard(text) {
  navigator.clipboard.writeText(text);
  message.success("Copy thành công")
}

export function copyToClipboard(text) {
  var selected = false;
  var el = document.createElement('textarea');
  el.value = text;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  if (document.getSelection().rangeCount > 0) {
    selected = document.getSelection().getRangeAt(0)
  }
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
  swal("Copy link thành công", {
    icon: "success",
  });

}

export const getQueryString = (query) => {
  const result = queryString.stringify(
    query,
  )

  if (!result) return ''
  return `?${result}`
}

export const debounced = (delay, fn) => {
  let timerId

  return (...args) => {
    if (timerId) {
      clearTimeout(timerId)
    }

    timerId = setTimeout(() => {
      fn(...args)
      timerId = null
    }, delay)
  }
}

export const capitalizeFirstLetter = (stringText) => {
  return stringText.charAt(0).toUpperCase() + stringText.slice(1)
}

export const getParameterByName = (name, url) => {
  if (!url) url = ''
  // eslint-disable-next-line
  name = name.replace(/[\[\]]/g, '\\$&')
  let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

export const isEquivalent = (a, b) => {
  // Create arrays of property names
  let aProps = Object.getOwnPropertyNames(a)
  let bProps = Object.getOwnPropertyNames(b)
  // If number of properties is different,
  // objects are not equivalent
  if (aProps.length !== bProps.length) {
    return false
  }
  for (let i = 0; i < aProps.length; i++) {
    let propName = aProps[i]
    // If values of same property are not equal,
    // objects are not equivalent
    if (a[propName] !== b[propName]) {
      return false
    }
  }
  // If we made it this far, objects
  // are considered equivalent
  return true
}

export const xoa_dau = (str) => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  return str;
}

export const number_to_price = (v) => {

  if (v === 0) { return '0'; }

  if (!v || v === "") {
    return v
  }
  v = v.toString();

  v = v.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");

  v = v.split(',').join('*').split('.').join(',').split('*').join('.');
  return v;
}

export const price_to_number = (v) => {
  if (!v) { return 0; }
  v = v.split(',').join('');
  // v = v.split('.').join(',');

  return Number(v);
}

export function validateEmail(email) {
  // eslint-disable-next-line
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function validatePass(pass) {
  const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
  return passw.test(pass);
}

export function validateNumberPhone(number) {
  let c1 = number.substring(0, 4);
  if (c1 === "+855") {
    return true;
  }
  c1 = number.substring(0, 3);
  return c1 === "+60" || c1 === "+84";
}

export function convertFileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
}

export function convertPhoneNumber(phoneNumber) {
  if (phoneNumber) {
    const areaCode = "+84";
    let checkareaCode = phoneNumber.substring(0, 2);
    let checkZero = phoneNumber.substring(0, 1);
    if (checkareaCode === areaCode) {
      return phoneNumber;
    } else if (checkZero === "0") {
      return areaCode + phoneNumber.substring(1, phoneNumber.length);
    } else {
      return areaCode + phoneNumber;
    }
  }

  return ""
}

export function formatToUSDPrice(x, postFix = true, prefix = false) {
  return `${prefix ? '$' : ''}${formatToPrice(x)}${postFix ? ' $' : ''}`;
}

export function formatToUSDTPrice(x, postFix = true, prefix = false) {
  return `${prefix ? 'USDT ' : ''}${formatToPrice(x)}${postFix ? ' USDT' : ''}`;
}

export function formatToVNDPrice(x, postFix = true, prefix = false) {
  return `${prefix ? 'VND ' : ''}${formatToPrice(x)}${postFix ? ' VND' : ''}`;
}

export function formatToFACPrice(x, postFix = true, prefix = false) {
  return `${prefix ? 'Fi ' : ''}${formatToPrice(x)}${postFix ? ' Fi ' : ''}`;
}

export function formatToBTCPrice(x, postFix = true, prefix = false) {
  return `${prefix ? 'BTC ' : ''}${formatToPrice(x, 6)}${postFix ? ' BTC' : ''}`;
}

export function formatToPrice(x, digits = 2) {
  if (typeof x === 'string' || x instanceof String)
    x = x.replaceAll(',', '');
  if (x && x > 0) {
    var parts = parseFloat(Number(x).toFixed(digits)).toString();
    parts = parts.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  } else {
    return '';
  }
}

export function formatToNInputPrice(x, digits = 2) {
  if (typeof x === 'string' || x instanceof String)
    x = x.replaceAll(',', '');
  if (x && x > 0) {
    var parts = parseFloat(Number(x).toFixed(digits)).toString();
    parts = parts.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  } else {
    return 0;
  }
}

export function removeCommaFromPayload(x) {
  console.log(x);
  if (x instanceof Object && x) {
    let obj = Object.assign({}, x);
    Object.keys(obj).forEach(key => {
      if (typeof obj[key] === 'string') {
        obj[key] = obj[key].replace(",", "")
      }
    })
    return obj;
  }
}