export const NumberToWord = (amount) => {
    const units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const teens = ['eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const tens = ['', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    const scales = ['', 'thousand', 'lakh', 'crore'];

    function convertToWordsLessThanThousand(n) {
        if (n < 10) {
            return units[n];
        } else if (n < 20) {
            return teens[n - 11];
        } else if (n < 100) {
            return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + units[n % 10] : '');
        } else {
            return units[Math.floor(n / 100)] + ' hundred' + (n % 100 !== 0 ? ' and ' + convertToWordsLessThanThousand(n % 100) : '');
        }
    };

    function convertAmountToWords(amount) {
        let wholePart = Math.floor(amount);
        const decimalPart = Math.round((amount - wholePart) * 100); // considering up to two decimal places

        const wholeWords = convertToWordsLessThanThousand(wholePart);
        const decimalWords = decimalPart > 0 ? 'and ' + convertToWordsLessThanThousand(decimalPart) + ' paise' : '';

        if (wholeWords === 'zero') {
            return 'zero Taka only';
        }

        const words = [];
        let scaleIndex = 0;

        while (wholePart > 0) {
            const chunk = wholePart % 1000;
            if (chunk !== 0) {
                words.unshift(convertToWordsLessThanThousand(chunk) + ' ' + scales[scaleIndex]);
            }
            wholePart = Math.floor(wholePart / 1000);
            scaleIndex++;
        }

        return words.join(' ') + ' Taka ' + decimalWords + ' only';
    };

    return convertAmountToWords(amount);
};