export function applyCurrencyMask(value: String): String {
    const parsedValue = parseFloat(value.toString()).toFixed(2);
    
    const formattedValue = parsedValue
    .replace('.', ',')
    .replace(/\d(?=(\d{3})+\.)/g, '$&.');

    const isNegative = value.split('-').length === 2;

    return `${isNegative ? '-' : ''}R$ ${formattedValue}`;
  }