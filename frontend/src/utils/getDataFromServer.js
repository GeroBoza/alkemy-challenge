export async function getBalance() {
    const getResult = await fetch("http://localhost:3000/operations/balance");
    const operationsBalance = await getResult.json();

    return operationsBalance;
}

export async function getLastTenOperations() {
    const getResult = await fetch("http://localhost:3000/operations/lastTen");
    const allOperations = await getResult.json();

    return allOperations;
}
