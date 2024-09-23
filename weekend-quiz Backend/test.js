let size = 5;

// Upper part of diamond
for (let i = 1; i <= size; i++) {
    let str = ' '.repeat(size - i) + '*'.repeat(2 * i - 1);
    console.log(str);
}

// Lower part of diamond
for (let i = size - 1; i >= 1; i--) {
    let str = ' '.repeat(size - i) + '*'.repeat(2 * i - 1);
    console.log(str);
}