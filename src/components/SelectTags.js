import { Select } from 'antd';

export function SelectTags({ onTagsUpdate, tags }) {
    const formattedTags = tags.map((tag) => ({
        label: tag,
        value: tag,
    }));

    return (
        <Select
            mode="tags"
            placeholder="Tags"
            options={formattedTags}
            maxTagCount="responsive"
            onChange={onTagsUpdate}
        />
    );
}
