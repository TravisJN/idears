import { useCallback, useState } from 'react';
import { Button, Popconfirm } from 'antd';
import {
    DeleteOutlined,
    EditOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import './Toolbar.css';

export function Toolbar({ isAuthor, onDelete, itemId }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [rotation, setRotation] = useState(0);

    const rotationClass =
        rotation === 0 ? '' : rotation === 90 ? 'rotate90' : 'rotate180';

    const onSettingsClick = useCallback(() => {
        setIsExpanded(!isExpanded);
        setRotation((prevRotation) => (prevRotation === 0 ? 90 : 0));
    });

    return (
        <div className="right-content-container">
            {isAuthor ? (
                <>
                    {isExpanded ? (
                        <>
                            <Popconfirm
                                title="I don't work yet"
                                okText="OK"
                                icon={null}
                            >
                                <Button className="delete-button" type="text">
                                    <EditOutlined twoToneColor="#eb2f96" />
                                </Button>
                            </Popconfirm>
                            <Popconfirm
                                title="Delete this idea?"
                                onConfirm={() => onDelete(itemId)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button className="delete-button" type="text">
                                    <DeleteOutlined twoToneColor="#eb2f96" />
                                </Button>
                            </Popconfirm>
                        </>
                    ) : null}
                    <Button type="text" onClick={onSettingsClick}>
                        <div className={`button ${rotationClass}`}>
                            <SettingOutlined twoToneColor="#eb2f96" />
                        </div>
                    </Button>
                </>
            ) : null}
        </div>
    );
}
