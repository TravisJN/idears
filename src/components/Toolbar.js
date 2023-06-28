import { useCallback, useState } from 'react';
import { Button, Popconfirm } from 'antd';
import {
    DeleteOutlined,
    EditOutlined,
    SettingOutlined,
} from '@ant-design/icons';

export function Toolbar({ isAuthor, onDelete, itemId }) {
    const [isAnimating, setIsAnimating] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const onSettingsClick = useCallback(() => {
        setIsExpanded(!isExpanded);

        if (!isAnimating) {
            setIsAnimating(true);

            const animationTimer = setTimeout(() => {
                setIsAnimating(false);
            }, 250);

            return animationTimer;
        }
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
                    <Button
                        className="delete-button"
                        type="text"
                        onClick={onSettingsClick}
                    >
                        <SettingOutlined
                            twoToneColor="#eb2f96"
                            spin={isAnimating}
                        />
                    </Button>
                </>
            ) : null}
        </div>
    );
}
