type Props = {
    onShow: () => void
}

const layoutStyle = 'fixed sm:relative bottom-8 sm:bottom-0 sm:flex sm:justify-center sm:w-full focus:ring-4 focus:outline-none rounded-full sm:rounded-lg p-6 sm:px-5 sm:py-3';
const lightStyle = 'bg-blue-700 hover:bg-blue-800 focus:ring-blue-300';
const darkStyle = 'dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800';

export default function AddItemButton(props: Props) {
    const { onShow } = props;

    const styles = layoutStyle + ' ' + lightStyle + ' ' + darkStyle ;

    return (
        <button className={styles} type={'button'} onClick={onShow}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
        </button>
    );
}
  