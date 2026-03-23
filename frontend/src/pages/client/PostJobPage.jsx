import PostJobForm from '../../components/forms/PostJobForm';
import styles from './PostJobPage.module.css';

function PostJobPage() {
    return (
        <div className={styles.postJobSection}>
            <h1 className='pageTitle'>Post job page</h1>
            <div className={styles.postJobFormSection}>
                <PostJobForm />
            </div>
        </div>
    )
}

export default PostJobPage;