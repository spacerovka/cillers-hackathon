import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_FORM, SIGN_CONTRACT } from '../graphql/operations';
import { useNavigate } from 'react-router-dom';

const ContractDetails: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Get the location object from React Router
    const contract = location.state?.contract; // Get the contract details from location state
    const id = location.state?.id; // Get the contract id from location state
    const [signContract] = useMutation(SIGN_CONTRACT);
    const { loading, error, data } = useQuery(GET_FORM, { variables: { id: "1" } }); // Fetch form data using useQuery
    const [formData, setFormData] = useState<any>(null);

    useEffect(() => {
        if (data && data.form) {
            setFormData(data.form);
            console.log('form here', data.form)
        }
    }, [data]);

    const handleSignNow = async () => {
        try {
            console.log('Actual id: ', { id })
            const resp = await signContract({ variables: { id: id } })
            console.log('Checksum: ', resp.data.signContract.checkSum)
            navigate('/signed-contract', { state: { contract, id: resp.data.signContract.id } });
        } catch (error) {
            console.error('Error submitting contract:', error);
        }
    };

    if (!contract) {
        return <div>No contract details found</div>;
    }

    return (
        <div className="min-h-screen flex flex-col">
            <div className="navbar bg-base-300 text-neutral-content">
                <div className="flex-1">
                    <a href="/" className="p-2 normal-case text-xl">Products</a>
                    <a href="/contract" className="p-2 normal-case text-xl">Contract</a>
                </div>
            </div>

            <div className="flex flex-grow justify-center items-center bg-neutral">
                <div>
                    <h4 className='mb-5'>Please view your contract details below:</h4>
                    <p>First Name: {contract.firstName}</p>
                    <p>Last Name: {contract.lastName}</p>
                    <p>Email: {contract.email}</p>
                    {formData && <p>{formData.text}</p>}

                    <button className="btn btn-primary mt-5" onClick={handleSignNow}>Sign Contract Now</button>
                </div>
            </div>
        </div>
    );
};

export default ContractDetails;