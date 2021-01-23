import React from 'react';
import { buildCampaignDataTable } from '../../../utils/campaigns';
import ActionsBlock from '../ActionsBlock/ActionsBlock';

const DataTable = props => {
    const renderTableHeader = () => {
        const tableMap = buildCampaignDataTable();

        return tableMap.map(({ header }, index) => {
            return <th key={index}>{header}</th>
        })

    };

    const renderTableBody = () => {
        const tableMap = buildCampaignDataTable();

        return props.data.map((row, index) => {
            return (
                <tr key={index}>
                    {tableMap.map(({ key }, i) => {
                        if (key === 'actions')
                            return (
                                <td key={`${index}-${i}`}>
                                    <ActionsBlock
                                        id={row.id}
                                        onDelete={props.onDelete}
                                        onPreview={props.onPreview}
                                    />
                                </td>
                            );

                        return <td key={`${index}-${i}`}>{row[key]}</td>;
                    })}
                </tr>
            );
        });
    };

    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                    <tr>{renderTableHeader()}</tr>
                </thead>
                <tbody>{renderTableBody()}</tbody>
            </table>
        </div>
    );
};

export default DataTable;
