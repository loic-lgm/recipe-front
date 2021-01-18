import { useCallback, useState } from 'react';

export function useToggle(init = false) {
    const [state, setState] = useState(init)

    return [state, useCallback(() => setState(state => !state), [])]
}