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

export async function getOperation(id) {
    const getResult = await fetch(`http://localhost:3000/operations/${id}`);
    const operation = await getResult.json();

    return operation;
}

export async function getOperationsByType(typeId) {
    const getResult = await fetch(
        `http://localhost:3000/operations/type/${typeId}`
    );
    const operationsByType = await getResult.json();

    return operationsByType;
}

export async function getOperationTypes() {
    const getResult = await fetch(`http://localhost:3000/operations/types`);
    const operationTypes = await getResult.json();

    return operationTypes;
}
export async function getOperationCategories() {
    const getResult = await fetch(`http://localhost:3000/categories`);
    const operationCategories = await getResult.json();

    return operationCategories;
}

export async function getOperationsByCategory(catId) {
    const getResult = await fetch(
        `http://localhost:3000/operations/category/${catId}`
    );
    const operationsByCategory = await getResult.json();

    return operationsByCategory;
}
