// src/hooks/useBootstrap.ts
import { useCityStore } from '@/store/cityStore';
import { useClassifiedStore } from '@/store/classifiedStore';
import { useBootstrapStore } from '@/store/indexStore';
import { useOrgStore } from '@/store/orgStore';
import { useEffect } from 'react';

export const useBootstrap = () => {
    const setReady = useBootstrapStore(s => s.setReady)
    const cityHydrate = useCityStore(state => state.cityHydrate)
    const cityRefresh = useCityStore(state => state.cityRefresh)
    const orgHydrate = useOrgStore(state => state.orgHydrate)
    const orgRefresh = useOrgStore(state => state.orgRefresh)
    const classifiedHydrate = useClassifiedStore(state => state.classifiedHydrate)
    const classifiedRefresh = useClassifiedStore(state => state.classifiedRefresh)

    useEffect(() => {
        const init = async () => {
            await Promise.all([
                cityHydrate(),
                orgHydrate(),
                classifiedHydrate(),
                // categoryHydrate()
            ])

            setReady()

            Promise.all([
                cityRefresh(),
                orgRefresh(),
                classifiedRefresh(),
                // categoryRefresh()
            ])
        }

        init()
    }, [])
}
