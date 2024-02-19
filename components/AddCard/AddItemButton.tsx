import PlusSvg from "@/svg/Plus";

type Props = {
    onShow: () => void
}

const layoutStyle = 'z-10 fixed sm:relative bottom-8 sm:bottom-0 sm:flex sm:justify-center sm:w-full focus:ring-4 focus:outline-none rounded-full sm:rounded-lg p-6 sm:px-5 sm:py-3';
const lightStyle = 'bg-blue-700 hover:bg-blue-800 focus:ring-blue-300';
const darkStyle = 'dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800';

export default function AddItemButton(props: Props) {
    const { onShow } = props;

    const styles = layoutStyle + ' ' + lightStyle + ' ' + darkStyle ;

    return (
        <button onClick={onShow} className={styles}>
            <PlusSvg />
        </button>
    );
}
  