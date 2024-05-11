import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CONTRACTS } from '../graphql/operations';

const SignedContract: React.FC = () => {
    const location = useLocation(); // Get the location object from React Router
    const contract = location.state?.contract; // Get the contract details from location state
    const [contracts, setContracts] = useState<any[]>([]);
    const { loading, error, data } = useQuery(GET_CONTRACTS); 

    useEffect(() => {
      if (data && data.getContracts) {
        setContracts(data.getContracts);
    }
}, [data]);
console.log('Data from backend:', data);

if (loading) return <div>Loading...</div>;
if (error) return <div>Error fetching signed contracts: {error.message}</div>;

    return (
        <div className="min-h-screen flex flex-col">
            <div className="">
                <h1 className="text-3xl font-semibold mb-4">Signed Contracts</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contract ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Signed</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SignageDate</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Checksum</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.contracts.map((contract: any, index: any) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">{contract.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{contract.signed ? 'Yes' : 'No'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{contract.signageDate ? contract.signageDate : 'Not signed yet'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{contract.checkSum}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SignedContract;