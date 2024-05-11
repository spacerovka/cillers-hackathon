import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_CONTRACT } from '../graphql/operations';

interface Contract {
    firstName: string;
    lastName: string;
    email: string;
}

const Contract: React.FC = () => {
    const navigate = useNavigate();
    const [contract, setContract] = useState<Contract>({
        firstName: '',
        lastName: '',
        email: '',
    });
    const [createContract] = useMutation(ADD_CONTRACT);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setContract({ ...contract, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!contract.firstName.trim() || !contract.lastName.trim() || !contract.email.trim()) {
            return; // Prevent form submission if any field is empty
        }

        try {
            const resp = await createContract({ variables: { firstName: contract.firstName, lastName: contract.lastName, email: contract.email } });
            console.log('contractFirstname here:', contract.firstName)
            console.log(resp.data.addContract.id)
            // Navigate to a new route and pass the contract details as state
            navigate('/contract-details', { state: { contract } });
        } catch (error) {
            console.error('Error submitting contract:', error);
        }
    };

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
                    <h1 className='mb-5'>Please fill in the details below:</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="firstName">First Name:</label>
                            <input type="text" placeholder="John" id='firstName' className="input input-bordered w-full max-w-xs" name='firstName' value={contract.firstName} onChange={handleChange} />
                        </div>
                        <div className='mt-4'>
                            <label htmlFor="lastName">Last Name:</label>
                            <input type="text" placeholder="Swift" className="input input-bordered w-full max-w-xs" id="lastName" name="lastName" value={contract.lastName} onChange={handleChange} />
                        </div>
                        <div className='mt-4'>
                            <label htmlFor="email">Email:</label>
                            <input type="email" placeholder="john@email.com" className="input input-bordered w-full max-w-xs" id="email" name="email" value={contract.email} onChange={handleChange} />
                        </div>
                        <button type="submit" className='mt-5 btn btn-primary'>Submit</button>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Contract;