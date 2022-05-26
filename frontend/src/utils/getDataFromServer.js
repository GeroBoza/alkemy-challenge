export async function getBalance(token) {
    const getResult = await fetch("http://localhost:3000/operations/balance", {
        headers: {
            Authorization: token,
        },
    });
    const operationsBalance = await getResult.json();

    return operationsBalance;
}

export async function getLastTenOperations(token) {
    const getResult = await fetch("http://localhost:3000/operations/lastTen", {
        headers: {
            Authorization: token,
        },
    });
    const allOperations = await getResult.json();

    return allOperations;
}

export async function getOperation(id, token) {
    console.log(id);
    const getResult = await fetch(`http://localhost:3000/operations/${id}`, {
        headers: {
            Authorization: token,
        },
    });
    const operation = await getResult.json();

    return operation;
}

export async function getOperationsByType(typeId, token) {
    const getResult = await fetch(
        `http://localhost:3000/operations/type/${typeId}`,
        {
            headers: {
                Authorization: token,
            },
        }
    );
    const operationsByType = await getResult.json();

    return operationsByType;
}

export async function getOperationTypes() {
    const getResult = await fetch(`http://localhost:3000/types`);
    const operationTypes = await getResult.json();

    return operationTypes;
}
export async function getOperationCategories(token) {
    const getResult = await fetch(`http://localhost:3000/categories`, {
        headers: {
            Authorization: token,
        },
    });
    const operationCategories = await getResult.json();

    return operationCategories;
}

export async function getOperationsByCategory(catId, token) {
    const getResult = await fetch(
        `http://localhost:3000/operations/category/${catId}`,
        {
            headers: {
                Authorization: token,
            },
        }
    );
    const operationsByCategory = await getResult.json();

    return operationsByCategory;
}
