export const convertToThaiTimeZone = (input) => {
    const originalDate = new Date(input);
    const options = {
        timeZone: 'Asia/Bangkok',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    };
    const thaiDate = new Date(originalDate.toLocaleString('en-US', options));
    const formattedDate = `${thaiDate.getFullYear()}/${String(thaiDate.getMonth() + 1).padStart(2, '0')}/${String(thaiDate.getDate()).padStart(2, '0')} ${String(thaiDate.getHours()).padStart(2, '0')}:${String(thaiDate.getMinutes()).padStart(2, '0')}`;
    return formattedDate;
}

export const getFetch = async (url) => {
    const res = await fetch(url)
    const data = await res.json()
    return data;
}

export const VITE_APP_NAME = import.meta.env.VITE_APP_NAME
export const VITE_APP = import.meta.env.VITE_APP