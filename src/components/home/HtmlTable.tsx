import React from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';

export const renderHtmlTable = (htmlString: string) => {
    try {
        const { headers, rows } = parseTableData(htmlString);

        return () => (
            <View className="mb-2 p-2">
                <View className="min-w-[100px] w-auto border-2 border-blue-600 rounded-lg overflow-hidden">
                    {/* Header */}
                    <View className="flex-row bg-blue-600">
                        {headers.map((header, index) => (
                            <View
                                key={`header-${index}`}
                                className={`flex-1 p-4 ${index < headers.length - 1 ? 'border-r border-blue-500' : ''}`}
                            >
                                <Text className="text-white font-bold text-center text-sm">
                                    {header}
                                </Text>
                            </View>
                        ))}
                    </View>

                    {/* Body */}
                    <View className="bg-white">
                        {rows.map((row, rowIndex) => (
                            <View
                                key={`row-${rowIndex}`}
                                className={`flex-row ${rowIndex < rows.length - 1 ? 'border-b border-gray-200' : ''}`}
                            >
                                {row.map((cell: any, cellIndex: number) => (
                                    <View
                                        key={`cell-${rowIndex}-${cellIndex}`}
                                        className={`flex-1 p-3 ${cellIndex < row.length - 1 ? 'border-r border-gray-200' : ''}`}
                                    >
                                        {renderCell(cell)}
                                    </View>
                                ))}
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        );

    } catch (error) {
        console.error('Lỗi parse HTML:', error);
        return () => <Text className="p-4 text-red-500">Không thể hiển thị table</Text>;
    }
};

const parseTableData = (html: string) => {
    const headers = [];
    const rows = [] as any[];

    // Extract headers
    const headerMatches = html.match(/<th[^>]*>([\s\S]*?)<\/th>/gi) || [];
    headers.push(...headerMatches.map(h =>
        h.replace(/<[^>]*>/g, '').trim()
    ));

    // Extract rows
    const tbodyMatch = html.match(/<tbody>([\s\S]*?)<\/tbody>/i);
    const tbodyContent = tbodyMatch ? tbodyMatch[1] : html;

    const rowMatches = tbodyContent.match(/<tr[^>]*>([\s\S]*?)<\/tr>/gi) || [];

    rowMatches.forEach(rowHtml => {
        const cellMatches = rowHtml.match(/<td[^>]*>([\s\S]*?)<\/td>/gi) || [];
        const row = [] as any[];

        cellMatches.forEach(cellHtml => {
            const linkMatches = cellHtml.match(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi) || [];

            if (linkMatches.length > 0) {
                const links = linkMatches.map(link => {
                    const hrefMatch = link.match(/href="([^"]*)"/);
                    const textMatch = link.match(/>([\s\S]*?)</);
                    return {
                        href: hrefMatch ? hrefMatch[1] : '#',
                        text: textMatch ? textMatch[1].replace(/<[^>]*>/g, '').trim() : 'Link'
                    };
                });
                row.push({ type: 'links', data: links });
            } else {
                const text = cellHtml.replace(/<[^>]*>/g, '').trim();
                row.push({ type: 'text', data: text });
            }
        });

        if (row.length > 0) {
            rows.push(row);
        }
    });

    return { headers, rows };
};

const renderCell = (cell: any) => {
    if (cell.type === 'links') {
        return (
            <View className="items-center">
                {cell.data.map((link: any, index: number) => (
                    <TouchableOpacity
                        key={index}
                        className="py-1.5"
                        onPress={() => Linking.openURL(link.href)}
                    >
                        <Text className="text-blue-600 text-sm text-center">
                            {link.text}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
    }

    return (
        <Text className="text-gray-800 text-sm text-center">
            {cell.data}
        </Text>
    );
};

export const HtmlTable = ({ html }: { html: string }) => {
    const TableComponent = renderHtmlTable(html);
    return <TableComponent />;
};

export const extractTable = (html: string) => {
    const tableRegex = /<table[\s\S]*?<\/table>/i;
    const tableMatch = html.match(tableRegex);

    if (!tableMatch) return { text: html, table: null };

    const text = html.replace(tableRegex, '').trim();

    return {
        text,
        table: tableMatch[0]
    };
};
