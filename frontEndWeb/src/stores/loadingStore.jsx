import { useState } from 'react';

export function useLoading() {
    const [loading, setLoading] = useState(true);

    return {
        loading,
        setLoading,
    };
}

