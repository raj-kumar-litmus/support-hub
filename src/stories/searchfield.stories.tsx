import type { Meta, StoryObj } from '@storybook/react';
import SearchField from '../components/common/searchfield';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

const meta = {
    title: 'Stories/search-mobile',
    component: SearchField,
    parameters: {
        viewport: {
            viewports: INITIAL_VIEWPORTS,
            defaultViewport: 'iphone6',
        },
    }
} satisfies Meta<typeof SearchField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        searchValue: '',
    },
};

export const OnChange: Story = {
    args: {
        searchValue: '#60577546279',
    },
};
