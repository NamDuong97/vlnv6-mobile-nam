// CompanyList.tsx
import { Company } from '@/types';
import React from 'react';
import { View } from 'react-native';
import { CompanyCard } from './CompanyCard';

interface Props {
    companies: Company[];
}

const CompanyList: React.FC<Props> = ({ companies }) => {
    return (
        <View className="space-y-3">
            {companies.map((company) => (
                <CompanyCard key={company.id} company={company} />
            ))}
        </View>
    );
};

export default React.memo(CompanyList);
