import React from 'react';
import { useLocation } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { SIGN_CONTRACT } from '../graphql/operations';
import { useNavigate } from 'react-router-dom';

const ContractDetails: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Get the location object from React Router
    const contract = location.state?.contract; // Get the contract details from location state
    const id = location.state?.id; // Get the contract id from location state
    const [signContract] = useMutation(SIGN_CONTRACT);

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
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a maximus est. Phasellus blandit blandit rhoncus. Nulla ac suscipit orci. Nunc quis sodales eros. Curabitur venenatis eget lorem ut scelerisque. Vestibulum vitae tincidunt ante. Aenean vel ipsum libero. Maecenas pulvinar purus nunc, in congue mauris tempor sed. Cras at sem non arcu volutpat semper. Duis rutrum eget sem ac scelerisque. Sed a ante magna.

                        Quisque congue dictum nulla, vel ultrices magna condimentum vel. Duis posuere magna a purus ultricies sagittis. Vivamus vestibulum volutpat sapien vitae elementum. Suspendisse suscipit diam auctor leo feugiat sollicitudin. Donec volutpat pellentesque volutpat. Pellentesque condimentum elit non metus congue dictum. Nullam in condimentum lacus, sagittis varius felis. Nam libero odio, consectetur sit amet vestibulum at, consectetur vulputate mauris. Proin eu euismod urna. Ut quis mollis tortor. Morbi vitae augue nec tellus varius sagittis ac id purus. Phasellus gravida nisl mi, id feugiat felis tincidunt vitae. Curabitur a nisi sit amet ex semper semper ac nec ex.

                        Nam posuere venenatis lobortis. Integer sed tincidunt nulla. Aliquam a quam eu erat feugiat tincidunt. Pellentesque at nisl magna. Nullam scelerisque vitae est non tempus. Donec eu finibus dolor. Donec mi nunc, vehicula ac enim sit amet, vehicula posuere dolor. Integer feugiat et purus ut pharetra. Donec non bibendum ligula. Phasellus sem elit, ullamcorper et pellentesque a, lobortis vel enim. Nullam pharetra nisl vel mauris pulvinar lacinia.

                        Duis pharetra tempor quam, sed vehicula quam varius id. Phasellus dictum elementum sollicitudin. Sed ac lectus ullamcorper, fringilla ligula sed, sodales mauris. Vivamus a felis quis neque lobortis tincidunt sed eget dui. Morbi sagittis nunc vitae venenatis malesuada. Vestibulum finibus est in neque placerat dapibus. Cras auctor sem id est porttitor, eu eleifend neque aliquam. Mauris vitae nisi mi. Cras mauris eros, ullamcorper sit amet lobortis eu, vulputate eu massa. Vestibulum cursus arcu ut nibh pretium varius. Nam dapibus ante semper risus posuere, eu commodo ex aliquet. Duis ultrices molestie neque nec fringilla. Etiam id dapibus metus.

                        Nulla facilisi. In consectetur lacus nunc, dictum porta turpis hendrerit semper. Proin molestie rhoncus ligula vitae volutpat. Maecenas rhoncus, purus eu pellentesque faucibus, ipsum urna eleifend mi, in lobortis tellus nulla quis nibh. Aliquam eu sapien vestibulum, rutrum lectus et, sagittis justo. Morbi egestas eleifend vulputate. In hac habitasse platea dictumst.</p>
                    <button className="btn btn-primary mt-5" onClick={handleSignNow}>Sign Contract Now</button>
                </div>
            </div>
        </div>
    );
};

export default ContractDetails;