import classes from './LoadingSpinner.module.scss';

const LoadingSpinner = () => {
    return (
        <div className={classes.spinnerContainer}>
            <div className={classes.spinner} />
        </div>
    );
};

export default LoadingSpinner; 