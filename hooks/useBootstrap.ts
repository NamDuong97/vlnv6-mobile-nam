// src/hooks/useBootstrap.ts
import { useCityStore } from '@/store/cityStore';
import { useClassifiedStore } from '@/store/classifiedStore';
import { useBootstrapStore } from '@/store/indexStore';
import { useOrgStore } from '@/store/orgStore';
import { usePageMetaStore } from '@/store/pageMetaStore';
import { useEffect } from 'react';

export const useBootstrap = () => {
    const setReady = useBootstrapStore(s => s.setReady)
    const cityHydrate = useCityStore(state => state.cityHydrate)
    const cityRefresh = useCityStore(state => state.cityRefresh)
    const orgHydrate = useOrgStore(state => state.orgHydrate)
    const orgRefresh = useOrgStore(state => state.orgRefresh)
    const classifiedHydrate = useClassifiedStore(state => state.classifiedHydrate)
    const classifiedRefresh = useClassifiedStore(state => state.classifiedRefresh)
    const pageMetaHydrate = usePageMetaStore(state => state.pageMetaHydrate)
    const pageMetaRefresh = usePageMetaStore(state => state.pageMetaRefresh)

    useEffect(() => {
        const init = async () => {
            await Promise.all([
                cityHydrate(),
                orgHydrate(),
                classifiedHydrate(),
                pageMetaHydrate(),
                // categoryHydrate()
            ])

            setReady()

            Promise.all([
                cityRefresh(),
                orgRefresh(),
                classifiedRefresh(),
                pageMetaRefresh()
                // categoryRefresh()
            ])
        }

        init()
    }, [])
}
