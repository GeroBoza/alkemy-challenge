import React, { useEffect, useState } from 'react'
import {
    getBalance,
    getLastTenOperations,
} from "../../utils/getDataFromServer";

const Home = () => {
    const [balance, setBalance] = useState(0)
    const [operations, setOperations] = useState([])

    useEffect(() => {
        async function fetchOperationsBalance() {
            const balance = await getBalance();
            setBalance(balance);
        }
        async function fetchAllOperations() {
            const lastTen = await getLastTenOperations();
            setOperations(lastTen);
        }

        fetchAllOperations();
        fetchOperationsBalance();
    }, []);
    
  return (
    <div>
        {balance}
        <ul>
            {operations.length !== 0 ? (operations.map((operation)=> <li key={operation.id}>{operation.amount}</li>)) : ""}
        </ul>
    </div>
  )
}

export default Home