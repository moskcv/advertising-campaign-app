const getDefaultItemAttrs = (options) => {
    return {
        ...options,
        touched: false,
    }
};

export const buildCampaignFormData = (campaign = {}) => {
    return {
        name: getDefaultItemAttrs({
            value: campaign.name || '',
            label: 'Name',
            required: true,
            valid: !!campaign['name'] || false,
            validation: {
                required: true,
            }
        }),
        date_from: getDefaultItemAttrs({
            value: campaign['date_from'] || '',
            label: 'Date from',
            type: 'date',
            required: true,
            valid: !!campaign['date_from'] || false,
            validation: {
                required: true,
                date: true,
            }
        }),
        date_to: getDefaultItemAttrs({
            value: campaign['date_to'] || '',
            label: 'Date to',
            type: 'date',
            required: true,
            valid: !!campaign['date_to'] || false,
            validation: {
                required: true,
                date: true,
            }
        }),
        total_budget: getDefaultItemAttrs({
            value: campaign['total_budget'] || '',
            type: 'number',
            step: '.01',
            label: 'Total budget',
            required: true,
            valid: !!campaign['total_budget'] || false,
            validation: {
                required: true,
                float: true,
            }
        }),
        daily_budget: getDefaultItemAttrs({
            value: campaign['daily_budget'] || '',
            type: 'number',
            step: '.01',
            label: 'Daily budget',
            required: true,
            valid: !!campaign['daily_budget'] || false,
            validation: {
                required: true,
                float: true,
            }
        }),
        creatives: getDefaultItemAttrs({
            value:  '',
            files: [],
            uploaded: campaign['creatives'] || [],
            type: 'file',
            required: false,
            valid: true,
            multiple: true,
            className: 'form-control-file',
            accept: 'image/*'
        })
    };
};

export const buildCampaignDataTable = () => {
    return [
        {
            header: 'ID',
            key: 'id'
        },
        {
            header: 'Name',
            key: 'name'
        },
        {
            header: 'Date from',
            key: 'date_from'
        },
        {
            header: 'Date to',
            key: 'date_to'
        },
        {
            header: 'Total budget',
            key: 'total_budget'
        },
        {
            header: 'Daily budget',
            key: 'daily_budget'
        },
        {
            header: 'Actions',
            key: 'actions'
        },

    ];
};
