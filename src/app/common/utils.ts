export function applyCurrencyMask(value: String): String {
  const initialParse = value.replace(/[^\d.,]/g, '');
  const decimalSeparator =
    initialParse.includes(',') &&
    initialParse.lastIndexOf(',') > initialParse.lastIndexOf('.')
      ? ','
      : '.';
  let tmpValue = initialParse.replace(
    new RegExp(`[^\\d${decimalSeparator}]`, 'g'),
    ''
  );

  let numericValue = parseFloat(tmpValue.replace(decimalSeparator, '.'));

  if (
    (initialParse.lastIndexOf('.') != -1 &&
      initialParse.length - initialParse.lastIndexOf('.') === 4) ||
    (initialParse.lastIndexOf(',') != -1 &&
      initialParse.length - initialParse.lastIndexOf(',') === 4)
  ) {
    numericValue *= 10;
  } else if (
    (initialParse.lastIndexOf('.') != -1 &&
      initialParse.length - initialParse.lastIndexOf('.') === 2) ||
    (initialParse.lastIndexOf(',') != -1 &&
      initialParse.length - initialParse.lastIndexOf(',') === 2)
  ) {
    numericValue /= 10;
  }
  const formattedValue = numericValue
    .toFixed(2)
    .replace('.', ',')
    .replace(/\d(?=(\d{3})+\.)/g, '$&.');

  const isNegative = value.split('-').length === 2;

  return `${isNegative ? '-' : ''}R$ ${formattedValue}`;
}
