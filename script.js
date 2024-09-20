function promisify(callbackFunction) {
    return function (...args) {
        return new Promise((resolve, reject) => {
            function handleErrorAndValue(error, value) {
                if (error) {
                    reject(error);
                } else {
                    resolve(value);
                }
            }
            
            callbackFunction.call(this, ...args, handleErrorAndValue);
        });
    };
}

// Example callback-based function
function adder(x, y, handleErrorAndValue) {
    const value = x + y;
    if (typeof value !== 'number') {
        const error = new Error('Not a number');
        handleErrorAndValue(error, null);
    } else {
        handleErrorAndValue(null, value);
    }
}

// Promisify the adder function
const promisifiedAdder = promisify(adder);

// Test cases
promisifiedAdder(1, 2)
    .then(result => console.log('Result:', result))  // Logs: Result: 3
    .catch(error => console.error('Error:', error));

promisifiedAdder(1, "foobar")
    .then(result => console.log('Result:', result))
    .catch(error => console.error('Error:', error));  // Logs: Error: [Error: Not a number]

module.exports=promisify;  
