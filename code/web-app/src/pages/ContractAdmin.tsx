import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CONTRACTS, GET_FORM } from '../graphql/operations';

const ContractAdmin: React.FC = () => {
    const [contracts, setContracts] = useState<any[]>([]);
    const [selectedContract, setSelectedContract] = useState<string | null>(null);
    const { loading, error, data } = useQuery(GET_CONTRACTS);

    useEffect(() => {
        if (data && data.getContracts) {
            setContracts(data.contracts);
        }
    }, [data]);

    const handleContractChange = (contractId: string) => {
        setSelectedContract(contractId === selectedContract ? null : contractId);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Contracts</h1>
            <div>
                {data.contracts.map((contract: any, index: any) => (
                    <div key={contract.id} className="dropdown">
                        <button onClick={() => handleContractChange(contract.id)}>
                            Contract ID: {contract.id}
                        </button>
                        {selectedContract === contract.id && (
                            <div className="contract-content">
                                <p>Email: {contract.email}</p>
                                <p>First Name: {contract.firstName}</p>
                                <p>Last Name: {contract.lastName}</p>
                                <p>Signed: {contract.signed ? 'Yes' : 'No'}</p>
                                <p>Signage Date: {contract.signageDate ? contract.signageDate : 'Not signed yet'}</p>
                                <p>Checksum: {contract.checkSum}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContractAdmin;