import React, {useState, useEffect} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux';


const withErrorHandler = (WrappedComponent, axios) => {
    const NewComponent = (props) => {
        
        const [ready, setReady] = useState(false);
        const [error, setError] = useState(null);
        
        useEffect(() => {
            const req = axios.interceptors.request.use((config) => {
                return config;
            });
            
            const res = axios.interceptors.response.use(null, (error) => {
                setError(error);
                return Promise.reject(error);
            });

            setReady(true);

            //componentWillUnmount
            return () => {
                axios.interceptors.request.eject(req);
                axios.interceptors.response.eject(res);
            };
        }, []);

        if (!ready) return null;

        const errorConfirmHandler = () => {
            setError(null)
        }

        return (
            <Aux>
                {error ? (
                <Modal show={error} modalClose={errorConfirmHandler}> {error.message}</Modal>
                ) : null}
                <WrappedComponent {...props} />
            </Aux>
        );
    };
    return NewComponent;
};

export default withErrorHandler;