export function applyCurrencyMask(value: String): String {
  let parsedValue = parseInt(value.replace(/\D/g, '') || '0', 10);
  if (value.includes(',') || value.includes('.')) {
    parsedValue = parsedValue / 100;
  }

  const formattedValue = parsedValue
    .toFixed(2)
    .replace('.', ',')
    .replace(/\d(?=(\d{3})+\.)/g, '$&.');

  const isNegative = value.split('-').length === 2;

  return `${isNegative ? '-' : ''}R$ ${formattedValue}`;
}
