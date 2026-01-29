// CompanyList.tsx
import { OrganizationItem } from '@/types/org';
import React from 'react';
import { View } from 'react-native';
import { CompanyCard } from './CompanyCard';

interface Props {
    companies: OrganizationItem[];
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
