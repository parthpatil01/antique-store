


function formatIndianCurrency(number) {
    const [integer, decimal] = number.toString().split('.');
    let lastThree = integer.slice(-3);
    const otherNumbers = integer.slice(0, -3);

    if (otherNumbers !== '') {
      lastThree = ',' + lastThree;
    }
    const result = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return `₹${result}${decimal ? '.' + decimal : ''}`;
}

export default formatIndianCurrency;