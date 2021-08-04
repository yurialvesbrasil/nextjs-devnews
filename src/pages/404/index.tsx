import styles from './styles.module.scss';

export default function NotFound(){
    return (
        <div className={styles.main}>
            <div className={styles.message}>
                <h1>Page not found</h1>
            </div>
        </div>
    )
}