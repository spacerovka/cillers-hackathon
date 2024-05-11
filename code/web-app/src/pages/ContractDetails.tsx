import React from 'react';
import { useLocation } from 'react-router-dom';

const ContractDetails: React.FC = () => {
    const location = useLocation(); // Get the location object from React Router
    const contract = location.state?.contract; // Get the contract details from location state

    if (!contract) {
        return <div>No contract details found</div>;
    }

    return (
        <div>
            <h1>Contract Details</h1>
            <p>First Name: {contract.firstName}</p>
            <p>Last Name: {contract.lastName}</p>
            <p>Email: {contract.email}</p>
        </div>
    );
};

export default ContractDetails;