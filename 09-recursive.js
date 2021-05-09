function fibonacciMemoization (n) {
    const memo = [0, 1] 
    console.log(memo[4])
    const fibonacci = (n) => {
        if (memo[n] != undefined) return memo[n];
        return memo[n] = fibonacci(n - 1) + fibonacci(n - 2);

    }
    return fibonacci
}

console.log(fibonacciMemoization(25))