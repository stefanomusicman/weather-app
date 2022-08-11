import styles from './ErrorPopup.module.css';

const ErrorPopup:React.FC<{ return: any }> = (props) => {
    return(
        <div className={styles.backdrop}>
            <div className={styles.errorContainer}>
                <header>
                    <h2>Error</h2>
                </header>
                <div className={styles.messageContainer}>
                    <h3>Please enter a valid location</h3>
                    <button onClick={props.return}>OK</button>
                </div>
            </div>
        </div>
    )
}

export default ErrorPopup;